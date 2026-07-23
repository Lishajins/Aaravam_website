// src/pages/Winners.tsx
import { useMemo } from 'react';
import { useEvents, useWinners } from '../hooks/useStore';
import PageHeader from '../components/layout/PageHeader';
import Footer from '../components/layout/Footer';
import { Trophy } from 'lucide-react';

const PLACE = {
  firstPlace:  { label: '1st', color: '#FDE68A', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.25)' },
  secondPlace: { label: '2nd', color: '#CBD5E1', bg: 'rgba(148,163,184,0.1)', border: 'rgba(148,163,184,0.25)' },
  thirdPlace:  { label: '3rd', color: '#FDBA74', bg: 'rgba(180,83,9,0.1)',    border: 'rgba(180,83,9,0.25)' },
};

export default function Winners() {
  const { events } = useEvents();
  const { winners } = useWinners();

  const winnerMap = useMemo(() => {
    const map: Record<string, typeof winners[0]> = {};
    for (const w of winners) map[w.eventId] = w;
    return map;
  }, [winners]);

  const onStage = useMemo(() => events.filter(e => e.category === 'on_stage').sort((a, b) => a.day - b.day), [events]);
  const offStage = useMemo(() => events.filter(e => e.category === 'off_stage').sort((a, b) => a.day - b.day), [events]);

  function groupByDay(evList: typeof events) {
    const g: Record<number, typeof events> = {};
    for (const ev of evList) { if (!g[ev.day]) g[ev.day] = []; g[ev.day].push(ev); }
    return g;
  }

  function EventGroup({ evList, catLabel }: { evList: typeof events; catLabel: string }) {
    if (evList.length === 0) return null;
    const grouped = groupByDay(evList);
    return (
      <div style={{ marginBottom: 56 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(201,162,39,0.1)' }} />
          <span style={{
            padding: '4px 14px', fontFamily: "'Cinzel', serif", fontSize: 10,
            letterSpacing: '0.3em', textTransform: 'uppercase' as const,
            color: '#F2601E', background: 'rgba(199,57,26,0.1)', border: '1px solid rgba(199,57,26,0.3)',
            borderRadius: 999,
          }}>{catLabel}</span>
          <div style={{ flex: 1, height: 1, background: 'rgba(201,162,39,0.1)' }} />
        </div>

        {Object.entries(grouped).map(([day, dayEvents]) => (
          <div key={day} style={{ marginBottom: 32 }}>
            <h3 style={{
              fontFamily: "'Cinzel', serif", fontSize: 11,
              letterSpacing: '0.35em', textTransform: 'uppercase',
              color: '#C9A227', marginBottom: 12,
            }}>Day {day} — {dayEvents[0].date}</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {dayEvents.map(ev => {
                const w = winnerMap[ev.id];
                const hasWinners = w && (w.firstPlace || w.secondPlace || w.thirdPlace);
                return (
                  <div key={ev.id} style={{
                    padding: '16px 20px', borderRadius: 4,
                    background: 'rgba(31,22,13,0.6)',
                    border: '1px solid rgba(201,162,39,0.1)',
                    display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16,
                    transition: 'border-color 0.2s',
                  }}>
                    <div style={{ flex: '1 1 200px', minWidth: 180 }}>
                      <p style={{ fontFamily: "'Cinzel', serif", fontSize: 13, color: '#F5EFE0', margin: '0 0 4px' }}>{ev.name}</p>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#7A6E58', margin: 0 }}>{ev.time}{ev.venue ? ` · ${ev.venue}` : ''}</p>
                    </div>
                    {hasWinners ? (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {(['firstPlace', 'secondPlace', 'thirdPlace'] as const).map(place => {
                          const name = w?.[place]; if (!name) return null;
                          const cfg = PLACE[place];
                          return (
                            <div key={place} style={{
                              display: 'flex', alignItems: 'center', gap: 6,
                              padding: '6px 12px', borderRadius: 4,
                              background: cfg.bg, border: `1px solid ${cfg.border}`,
                            }}>
                              <span style={{ fontFamily: "'Cinzel', serif", fontSize: 10, fontWeight: 700, color: cfg.color, letterSpacing: '0.2em', textTransform: 'uppercase' }}>{cfg.label}</span>
                              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#B8A98A' }}>{name}</span>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#7A6E58', fontStyle: 'italic' }}>Winners not announced</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A0704' }}>
      <PageHeader title="Winners" subtitle="Prize winners for all Aaravam 2025–26 events" />
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 16px' }}>
        {events.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 24px', border: '1px solid rgba(201,162,39,0.1)', borderRadius: 4 }}>
            <Trophy size={36} color="rgba(199,57,26,0.3)" style={{ margin: '0 auto 16px', display: 'block' }} />
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: 13, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#7A6E58' }}>No events yet</p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#7A6E58', marginTop: 8 }}>Winners will appear here once events are added</p>
          </div>
        ) : (
          <>
            <EventGroup evList={onStage} catLabel="On Stage" />
            <EventGroup evList={offStage} catLabel="Off Stage" />
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
