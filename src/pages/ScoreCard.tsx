// src/pages/ScoreCard.tsx
import { useMemo } from 'react';
import { useTeams, useEvents, useScores } from '../hooks/useStore';
import PageHeader from '../components/layout/PageHeader';
import Footer from '../components/layout/Footer';
import { Table2 } from 'lucide-react';

const S = {
  page: { minHeight: '100vh', background: '#0A0704' } as React.CSSProperties,
  container: { maxWidth: 1100, margin: '0 auto', padding: '48px 16px' } as React.CSSProperties,
  catBadge: {
    display: 'inline-flex', alignItems: 'center', padding: '4px 14px',
    fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase' as const,
    color: '#F2601E', background: 'rgba(199,57,26,0.1)', border: '1px solid rgba(199,57,26,0.3)',
    borderRadius: 999,
  },
  tableWrap: { overflowX: 'auto' as const, borderRadius: 4, border: '1px solid rgba(201,162,39,0.12)' },
  table: { width: '100%', minWidth: 640, borderCollapse: 'collapse' as const },
  thead: { background: 'rgba(31,22,13,0.9)' },
  th: {
    padding: '12px 16px',
    fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: '0.3em',
    textTransform: 'uppercase' as const, color: '#7A6E58',
    borderBottom: '1px solid rgba(201,162,39,0.2)', textAlign: 'center' as const,
  },
  thLeft: {
    padding: '12px 16px',
    fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: '0.3em',
    textTransform: 'uppercase' as const, color: '#7A6E58',
    borderBottom: '1px solid rgba(201,162,39,0.2)', textAlign: 'left' as const,
  },
  td: {
    padding: '14px 16px', fontFamily: "'Inter', sans-serif", fontSize: 13,
    color: '#B8A98A', borderBottom: '1px solid rgba(255,255,255,0.04)',
    textAlign: 'center' as const,
  },
  tdLeft: {
    padding: '14px 16px', fontFamily: "'Inter', sans-serif", fontSize: 13,
    color: '#B8A98A', borderBottom: '1px solid rgba(255,255,255,0.04)',
    textAlign: 'left' as const,
  },
};

export default function ScoreCard() {
  const { teams } = useTeams();
  const { events } = useEvents();
  const { scores } = useScores();

  const onStage = useMemo(() => events.filter(e => e.category === 'on_stage').sort((a, b) => a.day - b.day), [events]);
  const offStage = useMemo(() => events.filter(e => e.category === 'off_stage').sort((a, b) => a.day - b.day), [events]);

  const scoreMap = useMemo(() => {
    const map: Record<string, Record<string, number>> = {};
    for (const s of scores) {
      if (!map[s.eventId]) map[s.eventId] = {};
      map[s.eventId][s.teamId] = s.points;
    }
    return map;
  }, [scores]);

  const teamTotals = useMemo(() => {
    const totals: Record<string, number> = {};
    for (const s of scores) totals[s.teamId] = (totals[s.teamId] ?? 0) + s.points;
    return totals;
  }, [scores]);

  function EventTable({ evList, title }: { evList: typeof onStage; title: string }) {
    if (evList.length === 0) return null;
    return (
      <div style={{ marginBottom: 48 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(201,162,39,0.1)' }} />
          <span style={S.catBadge}>{title}</span>
          <div style={{ flex: 1, height: 1, background: 'rgba(201,162,39,0.1)' }} />
        </div>
        <div style={S.tableWrap}>
          <table style={S.table}>
            <thead style={S.thead}>
              <tr>
                <th style={S.thLeft}>Event</th>
                {teams.map(t => <th key={t.id} style={S.th}>{t.name}</th>)}
              </tr>
            </thead>
            <tbody>
              {evList.map((ev, idx) => (
                <tr key={ev.id} style={{ background: idx % 2 === 0 ? 'rgba(31,22,13,0.5)' : 'rgba(22,16,9,0.4)' }}>
                  <td style={S.tdLeft}>
                    <p style={{ fontWeight: 600, color: '#F5EFE0', margin: '0 0 2px', fontSize: 13 }}>{ev.name}</p>
                    <p style={{ fontSize: 11, color: '#7A6E58', margin: 0 }}>Day {ev.day} · {ev.date} · {ev.time}{ev.venue ? ` · ${ev.venue}` : ''}</p>
                  </td>
                  {teams.map(t => {
                    const pts = scoreMap[ev.id]?.[t.id];
                    const maxPts = Math.max(...teams.map(tt => scoreMap[ev.id]?.[tt.id] ?? 0));
                    const isTop = pts !== undefined && pts === maxPts && pts > 0;
                    return (
                      <td key={t.id} style={S.td}>
                        {pts !== undefined
                          ? <span style={{
                              fontFamily: "'Cinzel', serif", fontWeight: 600, fontSize: 15,
                              color: isTop ? '#FDE68A' : '#B8A98A',
                              textShadow: isTop ? '0 0 12px rgba(201,162,39,0.6)' : 'none',
                            }}>{pts}</span>
                          : <span style={{ color: '#7A6E58' }}>—</span>
                        }
                      </td>
                    );
                  })}
                </tr>
              ))}
              {/* Totals */}
              <tr style={{ background: 'rgba(22,16,9,0.95)', borderTop: '1px solid rgba(201,162,39,0.2)' }}>
                <td style={{ ...S.tdLeft, fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A227', borderBottom: 'none' }}>Total</td>
                {teams.map(t => (
                  <td key={t.id} style={{ ...S.td, borderBottom: 'none' }}>
                    <span style={{ fontFamily: "'Cinzel', serif", fontWeight: 700, fontSize: 17, color: '#C9A227', textShadow: '0 0 10px rgba(201,162,39,0.5)' }}>
                      {teamTotals[t.id] ?? 0}
                    </span>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div style={S.page}>
      <PageHeader title="Score Card" subtitle="Event-wise points breakdown across all batches" />
      <div style={S.container}>
        {events.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 24px', border: '1px solid rgba(201,162,39,0.1)', borderRadius: 4 }}>
            <Table2 size={36} color="rgba(199,57,26,0.3)" style={{ margin: '0 auto 16px', display: 'block' }} />
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: 13, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#7A6E58' }}>No events added yet</p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#7A6E58', marginTop: 8 }}>Check back after the admin adds events</p>
          </div>
        ) : (
          <>
            <EventTable evList={onStage} title="On Stage Events" />
            <EventTable evList={offStage} title="Off Stage Events" />
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
