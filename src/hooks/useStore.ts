import { useEffect, useMemo, useCallback } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

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

export function useTeams() {
  const rawTeams = useQuery(api.teams.list) ?? [];
  const seedTeams = useMutation(api.teams.seed);

  useEffect(() => {
    if (rawTeams.length === 0) {
      seedTeams();
    }
  }, [rawTeams, seedTeams]);

  const teams = useMemo(() => {
    return rawTeams.map((t: any) => ({
      id: t.id,
      name: t.name,
      colorHex: t.colorHex,
    }));
  }, [rawTeams]);

  return { teams, refresh: () => {} };
}

export function useEvents() {
  const rawEvents = useQuery(api.events.list) ?? [];
  const mutateAdd = useMutation(api.events.add);
  const mutateUpdate = useMutation(api.events.update);
  const mutateRemove = useMutation(api.events.remove);

  const events = useMemo(() => {
    return rawEvents.map((e: any) => ({
      id: e._id,
      name: e.name,
      category: e.category,
      day: e.day,
      date: e.date,
      time: e.time,
      venue: e.venue,
    }));
  }, [rawEvents]);

  const add = useCallback((ev: Omit<Event, 'id'>) => {
    mutateAdd(ev);
  }, [mutateAdd]);

  const update = useCallback((id: string, patch: Partial<Event>) => {
    const { id: _, ...rest } = patch;
    mutateUpdate({ id: id as any, ...rest });
  }, [mutateUpdate]);

  const remove = useCallback((id: string) => {
    mutateRemove({ id: id as any });
  }, [mutateRemove]);

  return { events, refresh: () => {}, add, update, remove };
}

export function useScores() {
  const rawScores = useQuery(api.scores.list) ?? [];
  const mutateUpsert = useMutation(api.scores.upsert);
  const mutateClear = useMutation(api.scores.clearEventScores);

  const scores = useMemo(() => {
    return rawScores.map((s: any) => ({
      id: s._id,
      eventId: s.eventId,
      teamId: s.teamId,
      points: s.points,
    }));
  }, [rawScores]);

  const upsert = useCallback((eventId: string, teamId: string, points: number) => {
    mutateUpsert({ eventId, teamId, points });
  }, [mutateUpsert]);

  const clear = useCallback((eventId: string) => {
    mutateClear({ eventId });
  }, [mutateClear]);

  const totalByTeam = useCallback(() => {
    const totals: Record<string, number> = {};
    for (const score of scores) {
      totals[score.teamId] = (totals[score.teamId] || 0) + score.points;
    }
    return totals;
  }, [scores]);

  return { scores, refresh: () => {}, upsert, clear, totalByTeam };
}

export function useWinners() {
  const rawWinners = useQuery(api.winners.list) ?? [];
  const mutateUpsert = useMutation(api.winners.upsert);
  const mutateDelete = useMutation(api.winners.deleteWinner);

  const winners = useMemo(() => {
    return rawWinners.map((w: any) => ({
      id: w._id,
      eventId: w.eventId,
      firstPlace: w.firstPlace,
      secondPlace: w.secondPlace,
      thirdPlace: w.thirdPlace,
    }));
  }, [rawWinners]);

  const upsert = useCallback((eventId: string, patch: { firstPlace?: string; secondPlace?: string; thirdPlace?: string }) => {
    mutateUpsert({ eventId, ...patch });
  }, [mutateUpsert]);

  const remove = useCallback((eventId: string) => {
    mutateDelete({ eventId });
  }, [mutateDelete]);

  return { winners, refresh: () => {}, upsert, remove };
}

export function useAchievers() {
  const rawAchievers = useQuery(api.achievers.list) ?? [];
  const mutateUpsert = useMutation(api.achievers.upsert);
  const mutateRemove = useMutation(api.achievers.remove);

  const achievers = useMemo(() => {
    return rawAchievers.map((a: any) => ({
      id: a._id,
      title: a.title,
      name: a.name,
      points: a.points,
      photoUrl: a.photoUrl,
    }));
  }, [rawAchievers]);

  const upsert = useCallback((a: Omit<Achiever, 'id'> & { id?: string }) => {
    const { id, ...data } = a;
    mutateUpsert({ id: id as any, ...data });
  }, [mutateUpsert]);

  const remove = useCallback((id: string) => {
    mutateRemove({ id: id as any });
  }, [mutateRemove]);

  return { achievers, refresh: () => {}, upsert, remove };
}
