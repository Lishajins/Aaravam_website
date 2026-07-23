// src/data/store.ts
// LocalStorage-backed data store — drop-in replacement for Convex queries/mutations

export type Team = {
  id: string;
  name: string;
  colorHex?: string;
};

export type Event = {
  id: string;
  name: string;
  category: 'on_stage' | 'off_stage';
  day: number;
  date: string;
  time: string;
  venue: string;
};

export type Score = {
  id: string;
  eventId: string;
  teamId: string;
  points: number;
};

export type Winner = {
  id: string;
  eventId: string;
  firstPlace?: string;
  secondPlace?: string;
  thirdPlace?: string;
};

export type Achiever = {
  id: string;
  title: string;
  name: string;
  points: number;
  photoUrl?: string;
};

const TEAMS_KEY = 'aaravam_teams';
const EVENTS_KEY = 'aaravam_events';
const SCORES_KEY = 'aaravam_scores';
const WINNERS_KEY = 'aaravam_winners';
const ACHIEVERS_KEY = 'aaravam_achievers';

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function save<T>(key: string, data: T): void {
  localStorage.setItem(key, JSON.stringify(data));
}

function uuid(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

// ─── SEED ──────────────────────────────────────────────────────────────────
const DEFAULT_TEAMS: Team[] = [
  { id: 'pg-phd', name: "PG-PhD", colorHex: "#A855F7" },
  { id: 'batch-22', name: "'22 Batch", colorHex: "#3B82F6" },
  { id: 'batch-23', name: "'23 Batch", colorHex: "#10B981" },
  { id: 'batch-24', name: "'24 Batch", colorHex: "#F59E0B" },
  { id: 'batch-25', name: "'25 Batch", colorHex: "#EF4444" },
];

export function seedIfEmpty(): void {
  const existing = load<Team[]>(TEAMS_KEY, []);
  if (existing.length === 0) {
    save(TEAMS_KEY, DEFAULT_TEAMS);
  }
}

// ─── TEAMS ─────────────────────────────────────────────────────────────────
export const teamsStore = {
  list(): Team[] {
    return load<Team[]>(TEAMS_KEY, DEFAULT_TEAMS);
  },
  update(id: string, patch: Partial<Team>): void {
    const teams = this.list().map(t => t.id === id ? { ...t, ...patch } : t);
    save(TEAMS_KEY, teams);
  },
};

// ─── EVENTS ────────────────────────────────────────────────────────────────
export const eventsStore = {
  list(): Event[] {
    return load<Event[]>(EVENTS_KEY, []);
  },
  add(ev: Omit<Event, 'id'>): Event {
    const events = this.list();
    const newEv = { ...ev, id: uuid() };
    save(EVENTS_KEY, [...events, newEv]);
    return newEv;
  },
  update(id: string, patch: Partial<Event>): void {
    const events = this.list().map(e => e.id === id ? { ...e, ...patch } : e);
    save(EVENTS_KEY, events);
  },
  delete(id: string): void {
    save(EVENTS_KEY, this.list().filter(e => e.id !== id));
  },
};

// ─── SCORES ────────────────────────────────────────────────────────────────
export const scoresStore = {
  list(): Score[] {
    return load<Score[]>(SCORES_KEY, []);
  },
  upsert(eventId: string, teamId: string, points: number): void {
    const scores = this.list();
    const existing = scores.find(s => s.eventId === eventId && s.teamId === teamId);
    if (existing) {
      save(SCORES_KEY, scores.map(s =>
        s.eventId === eventId && s.teamId === teamId ? { ...s, points } : s
      ));
    } else {
      save(SCORES_KEY, [...scores, { id: uuid(), eventId, teamId, points }]);
    }
  },
  byEvent(eventId: string): Score[] {
    return this.list().filter(s => s.eventId === eventId);
  },
  totalByTeam(): Record<string, number> {
    const totals: Record<string, number> = {};
    for (const score of this.list()) {
      totals[score.teamId] = (totals[score.teamId] || 0) + score.points;
    }
    return totals;
  },
};

// ─── WINNERS ───────────────────────────────────────────────────────────────
export const winnersStore = {
  list(): Winner[] {
    return load<Winner[]>(WINNERS_KEY, []);
  },
  upsert(eventId: string, patch: Omit<Winner, 'id' | 'eventId'>): void {
    const winners = this.list();
    const existing = winners.find(w => w.eventId === eventId);
    if (existing) {
      save(WINNERS_KEY, winners.map(w =>
        w.eventId === eventId ? { ...w, ...patch } : w
      ));
    } else {
      save(WINNERS_KEY, [...winners, { id: uuid(), eventId, ...patch }]);
    }
  },
  byEvent(eventId: string): Winner | undefined {
    return this.list().find(w => w.eventId === eventId);
  },
};

// ─── ACHIEVERS ─────────────────────────────────────────────────────────────
export const achieversStore = {
  list(): Achiever[] {
    return load<Achiever[]>(ACHIEVERS_KEY, []);
  },
  upsert(patch: Omit<Achiever, 'id'> & { id?: string }): Achiever {
    const achievers = this.list();
    if (patch.id) {
      const updated = achievers.map(a => a.id === patch.id ? { ...a, ...patch } as Achiever : a);
      save(ACHIEVERS_KEY, updated);
      return updated.find(a => a.id === patch.id)!;
    }
    const newA: Achiever = { ...patch, id: uuid() };
    save(ACHIEVERS_KEY, [...achievers, newA]);
    return newA;
  },
  delete(id: string): void {
    save(ACHIEVERS_KEY, this.list().filter(a => a.id !== id));
  },
};

// ─── ADMIN AUTH ─────────────────────────────────────────────────────────────
const ADMIN_KEY = 'aaravam_admin_session';
const ADMIN_PASSWORD = 'aaravam@admin2526'; // Change on real deployment

export const authStore = {
  login(password: string): boolean {
    if (password === ADMIN_PASSWORD) {
      const token = uuid() + uuid();
      localStorage.setItem(ADMIN_KEY, JSON.stringify({ token, expires: Date.now() + 8 * 3600 * 1000 }));
      return true;
    }
    return false;
  },
  logout(): void {
    localStorage.removeItem(ADMIN_KEY);
  },
  isAuthenticated(): boolean {
    try {
      const raw = localStorage.getItem(ADMIN_KEY);
      if (!raw) return false;
      const { expires } = JSON.parse(raw);
      return Date.now() < expires;
    } catch {
      return false;
    }
  },
};
