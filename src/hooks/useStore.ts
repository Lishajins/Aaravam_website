// src/hooks/useStore.ts
// React hook for reactive access to the data store

import { useState, useCallback } from 'react';
import {
  teamsStore, eventsStore, scoresStore, winnersStore, achieversStore,
  type Team, type Event, type Score, type Winner, type Achiever,
} from '../data/store';

export function useTeams() {
  const [teams, setTeams] = useState(() => teamsStore.list());
  const refresh = useCallback(() => setTeams(teamsStore.list()), []);
  return { teams, refresh };
}

export function useEvents() {
  const [events, setEvents] = useState(() => eventsStore.list());
  const refresh = useCallback(() => setEvents(eventsStore.list()), []);
  const add = useCallback((ev: Omit<Event, 'id'>) => { eventsStore.add(ev); refresh(); }, [refresh]);
  const update = useCallback((id: string, patch: Partial<Event>) => { eventsStore.update(id, patch); refresh(); }, [refresh]);
  const remove = useCallback((id: string) => { eventsStore.delete(id); refresh(); }, [refresh]);
  return { events, refresh, add, update, remove };
}

export function useScores() {
  const [scores, setScores] = useState(() => scoresStore.list());
  const refresh = useCallback(() => setScores(scoresStore.list()), []);
  const upsert = useCallback((eventId: string, teamId: string, points: number) => {
    scoresStore.upsert(eventId, teamId, points); refresh();
  }, [refresh]);
  const totalByTeam = useCallback(() => scoresStore.totalByTeam(), []);
  return { scores, refresh, upsert, totalByTeam };
}

export function useWinners() {
  const [winners, setWinners] = useState(() => winnersStore.list());
  const refresh = useCallback(() => setWinners(winnersStore.list()), []);
  const upsert = useCallback((eventId: string, patch: { firstPlace?: string; secondPlace?: string; thirdPlace?: string }) => {
    winnersStore.upsert(eventId, patch); refresh();
  }, [refresh]);
  return { winners, refresh, upsert };
}

export function useAchievers() {
  const [achievers, setAchievers] = useState(() => achieversStore.list());
  const refresh = useCallback(() => setAchievers(achieversStore.list()), []);
  const upsert = useCallback((a: Parameters<typeof achieversStore.upsert>[0]) => {
    achieversStore.upsert(a); refresh();
  }, [refresh]);
  const remove = useCallback((id: string) => { achieversStore.delete(id); refresh(); }, [refresh]);
  return { achievers, refresh, upsert, remove };
}
