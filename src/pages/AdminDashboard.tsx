// src/pages/AdminDashboard.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authStore, eventsStore, scoresStore, winnersStore } from '../data/store';
import { useTeams, useEvents, useScores, useWinners, useAchievers } from '../hooks/useStore';
import { LogOut, Plus, Trash2, Save, Calendar, Table2, Trophy, Star } from 'lucide-react';
import agastyaLogo from '../assets/logo-agastya.jpg';
import type { Event, Achiever } from '../data/store';

type Tab = 'events' | 'scores' | 'winners' | 'achievers';

const INPUT: React.CSSProperties = {
  width: '100%', padding: '10px 14px', boxSizing: 'border-box',
  fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#F5EFE0',
  background: '#0A0704', border: '1px solid rgba(201,162,39,0.2)',
  borderRadius: 4, outline: 'none',
};

const CARD: React.CSSProperties = {
  padding: '20px 24px', borderRadius: 4,
  background: 'rgba(31,22,13,0.8)',
  border: '1px solid rgba(201,162,39,0.1)',
};

const LABEL: React.CSSProperties = {
  display: 'block', fontFamily: "'Cinzel', serif", fontSize: 10,
  letterSpacing: '0.3em', textTransform: 'uppercase', color: '#7A6E58', marginBottom: 6,
};

const BTN: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px',
  fontFamily: "'Cinzel', serif", fontSize: 11,
  letterSpacing: '0.3em', textTransform: 'uppercase', color: '#F5EFE0',
  background: '#C7391A', border: '1px solid rgba(199,57,26,0.5)',
  borderRadius: 4, cursor: 'pointer', transition: 'background 0.2s',
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>('events');

  useEffect(() => {
    if (!authStore.isAuthenticated()) navigate('/admin');
  }, [navigate]);

  const { teams } = useTeams();
  const { events, add: addEvent, remove: removeEvent, refresh: refreshEvents } = useEvents();
  const { upsert: upsertScore, refresh: refreshScores } = useScores();
  const { upsert: upsertWinner } = useWinners();
  const { achievers, upsert: upsertAchiever, remove: removeAchiever } = useAchievers();

  function logout() { authStore.logout(); navigate('/admin'); }

  // ── Events
  const [newEvent, setNewEvent] = useState<Omit<Event, 'id'>>({ name: '', category: 'on_stage', day: 1, date: '', time: '', venue: '' });
  const [evMsg, setEvMsg] = useState('');
  function handleAddEvent(e: React.FormEvent) {
    e.preventDefault();
    if (!newEvent.name) return;
    addEvent(newEvent);
    setNewEvent({ name: '', category: 'on_stage', day: 1, date: '', time: '', venue: '' });
    setEvMsg('✓ Event added'); setTimeout(() => setEvMsg(''), 2500);
  }

  // ── Scores
  const [selEvent, setSelEvent] = useState('');
  const [ptsMap, setPtsMap] = useState<Record<string, string>>({});
  const [scMsg, setScMsg] = useState('');
  function loadScores(evId: string) {
    setSelEvent(evId);
    const m: Record<string, string> = {};
    for (const s of scoresStore.byEvent(evId)) m[s.teamId] = String(s.points);
    setPtsMap(m);
  }
  function saveScores() {
    for (const [tid, p] of Object.entries(ptsMap)) {
      const n = parseInt(p, 10);
      if (!isNaN(n) && n >= 0) upsertScore(selEvent, tid, n);
    }
    refreshScores(); setScMsg('✓ Scores saved'); setTimeout(() => setScMsg(''), 2500);
  }

  // ── Winners
  const [winEv, setWinEv] = useState('');
  const [winData, setWinData] = useState({ firstPlace: '', secondPlace: '', thirdPlace: '' });
  const [winMsg, setWinMsg] = useState('');
  function loadWinner(evId: string) {
    setWinEv(evId);
    const w = winnersStore.byEvent(evId);
    setWinData({ firstPlace: w?.firstPlace ?? '', secondPlace: w?.secondPlace ?? '', thirdPlace: w?.thirdPlace ?? '' });
  }
  function saveWinner() {
    if (!winEv) return;
    upsertWinner(winEv, winData); setWinMsg('✓ Winners saved'); setTimeout(() => setWinMsg(''), 2500);
  }

  // ── Achievers
  const [acForm, setAcForm] = useState<Omit<Achiever, 'id'> & { id?: string }>({ title: '', name: '', points: 0, photoUrl: '' });
  const [acMsg, setAcMsg] = useState('');
  const TITLES = ['Kalaprathibha', 'Kalathilakam', 'Kalathilakam (M)', 'Sargaprathibha', 'Chithraprathibha', 'Sahithyaprathibha'];
  function saveAchiever() {
    if (!acForm.title || !acForm.name) return;
    upsertAchiever(acForm); setAcForm({ title: '', name: '', points: 0, photoUrl: '' });
    setAcMsg('✓ Achiever saved'); setTimeout(() => setAcMsg(''), 2500);
  }

  const TABS: { key: Tab; label: string; icon: React.ElementType }[] = [
    { key: 'events', label: 'Events', icon: Calendar },
    { key: 'scores', label: 'Scores', icon: Table2 },
    { key: 'winners', label: 'Winners', icon: Trophy },
    { key: 'achievers', label: 'Achievers', icon: Star },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0A0704', paddingBottom: 60 }}>
      {/* Admin header */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 30,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 24px',
        background: 'rgba(10,7,4,0.97)', borderBottom: '1px solid rgba(201,162,39,0.1)',
        backdropFilter: 'blur(12px)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src={agastyaLogo} alt="Agastya" style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover', objectPosition: 'center' }} />
          <div>
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A227', margin: 0 }}>Admin Dashboard</p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: '#7A6E58', margin: 0 }}>Aaravam 2025–26</p>
          </div>
        </div>
        <button
          onClick={logout}
          style={{
            display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none',
            fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
            color: '#7A6E58', cursor: 'pointer',
          }}
        >
          <LogOut size={14} /> Logout
        </button>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 16px' }}>
        {/* Tab bar */}
        <div style={{ display: 'flex', borderBottom: '1px solid rgba(201,162,39,0.1)', marginBottom: 32, overflowX: 'auto' }}>
          {TABS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              id={`admin-tab-${key}`}
              onClick={() => setTab(key)}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '12px 20px', background: 'none', border: 'none',
                borderBottom: `2px solid ${tab === key ? '#C7391A' : 'transparent'}`,
                marginBottom: -1,
                fontFamily: "'Cinzel', serif", fontSize: 11,
                letterSpacing: '0.2em', textTransform: 'uppercase',
                color: tab === key ? '#F2601E' : '#7A6E58',
                cursor: 'pointer', whiteSpace: 'nowrap', transition: 'color 0.2s',
              }}
            >
              <Icon size={14} />{label}
            </button>
          ))}
        </div>

        {/* ── EVENTS ── */}
        {tab === 'events' && (
          <div>
            <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 16, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#F5EFE0', marginBottom: 24 }}>Manage Events</h2>
            <form onSubmit={handleAddEvent} style={{ ...CARD, marginBottom: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 16 }}>
                {[
                  { label: 'Event Name', el: <input style={INPUT} value={newEvent.name} onChange={e => setNewEvent(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Classical Dance Solo" required /> },
                  { label: 'Category', el: <select style={INPUT} value={newEvent.category} onChange={e => setNewEvent(p => ({ ...p, category: e.target.value as Event['category'] }))}><option value="on_stage">On Stage</option><option value="off_stage">Off Stage</option></select> },
                  { label: 'Day', el: <input type="number" min={1} style={INPUT} value={newEvent.day} onChange={e => setNewEvent(p => ({ ...p, day: parseInt(e.target.value) || 1 }))} /> },
                  { label: 'Date', el: <input style={INPUT} value={newEvent.date} onChange={e => setNewEvent(p => ({ ...p, date: e.target.value }))} placeholder="e.g. July 23" /> },
                  { label: 'Time', el: <input style={INPUT} value={newEvent.time} onChange={e => setNewEvent(p => ({ ...p, time: e.target.value }))} placeholder="e.g. 10:00 AM" /> },
                  { label: 'Venue', el: <input style={INPUT} value={newEvent.venue} onChange={e => setNewEvent(p => ({ ...p, venue: e.target.value }))} placeholder="e.g. Main Stage" /> },
                ].map(({ label, el }) => (
                  <div key={label}><label style={LABEL}>{label}</label>{el}</div>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <button type="submit" style={BTN}><Plus size={14} />Add Event</button>
                {evMsg && <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#4ADE80' }}>{evMsg}</span>}
              </div>
            </form>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {events.length === 0 && <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#7A6E58', textAlign: 'center', padding: '32px 0' }}>No events yet. Add one above.</p>}
              {events.map(ev => (
                <div key={ev.id} style={{ ...CARD, display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: "'Cinzel', serif", fontSize: 13, color: '#F5EFE0', margin: '0 0 2px' }}>{ev.name}</p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#7A6E58', margin: 0 }}>
                      {ev.category === 'on_stage' ? 'On Stage' : 'Off Stage'} · Day {ev.day} · {ev.date} · {ev.time}
                    </p>
                  </div>
                  <button onClick={() => removeEvent(ev.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#7A6E58', display: 'flex', alignItems: 'center' }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── SCORES ── */}
        {tab === 'scores' && (
          <div>
            <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 16, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#F5EFE0', marginBottom: 24 }}>Manage Scores</h2>
            <div style={CARD}>
              <label style={LABEL}>Select Event</label>
              <select style={{ ...INPUT, marginBottom: 24 }} value={selEvent} onChange={e => loadScores(e.target.value)}>
                <option value="">— Choose an event —</option>
                {events.map(ev => <option key={ev.id} value={ev.id}>{ev.name}</option>)}
              </select>
              {selEvent && (<>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 16, marginBottom: 16 }}>
                  {teams.map(t => (
                    <div key={t.id}>
                      <label style={LABEL}>{t.name}</label>
                      <input type="number" min={0} style={INPUT} value={ptsMap[t.id] ?? ''} onChange={e => setPtsMap(p => ({ ...p, [t.id]: e.target.value }))} placeholder="0" />
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <button onClick={saveScores} style={BTN}><Save size={14} />Save Scores</button>
                  {scMsg && <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#4ADE80' }}>{scMsg}</span>}
                </div>
              </>)}
            </div>
          </div>
        )}

        {/* ── WINNERS ── */}
        {tab === 'winners' && (
          <div>
            <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 16, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#F5EFE0', marginBottom: 24 }}>Manage Winners</h2>
            <div style={CARD}>
              <label style={LABEL}>Select Event</label>
              <select style={{ ...INPUT, marginBottom: 24 }} value={winEv} onChange={e => loadWinner(e.target.value)}>
                <option value="">— Choose an event —</option>
                {events.map(ev => <option key={ev.id} value={ev.id}>{ev.name}</option>)}
              </select>
              {winEv && (<>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 16, marginBottom: 16 }}>
                  {(['firstPlace', 'secondPlace', 'thirdPlace'] as const).map(pl => (
                    <div key={pl}>
                      <label style={LABEL}>{pl === 'firstPlace' ? '1st Place' : pl === 'secondPlace' ? '2nd Place' : '3rd Place'}</label>
                      <input style={INPUT} value={winData[pl]} onChange={e => setWinData(p => ({ ...p, [pl]: e.target.value }))} placeholder="Winner name(s)" />
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <button onClick={saveWinner} style={BTN}><Save size={14} />Save Winners</button>
                  {winMsg && <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#4ADE80' }}>{winMsg}</span>}
                </div>
              </>)}
            </div>
          </div>
        )}

        {/* ── ACHIEVERS ── */}
        {tab === 'achievers' && (
          <div>
            <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 16, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#F5EFE0', marginBottom: 24 }}>Manage Individual Achievers</h2>
            <div style={{ ...CARD, marginBottom: 24 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={LABEL}>Title</label>
                  <select style={INPUT} value={acForm.title} onChange={e => setAcForm(p => ({ ...p, title: e.target.value }))}>
                    <option value="">— Select Title —</option>
                    {TITLES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div><label style={LABEL}>Name</label><input style={INPUT} value={acForm.name} onChange={e => setAcForm(p => ({ ...p, name: e.target.value }))} placeholder="Winner's full name" /></div>
                <div><label style={LABEL}>Points</label><input type="number" min={0} style={INPUT} value={acForm.points} onChange={e => setAcForm(p => ({ ...p, points: parseInt(e.target.value) || 0 }))} /></div>
                <div><label style={LABEL}>Photo URL (optional)</label><input style={INPUT} value={acForm.photoUrl ?? ''} onChange={e => setAcForm(p => ({ ...p, photoUrl: e.target.value }))} placeholder="https://..." /></div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <button onClick={saveAchiever} style={BTN}><Save size={14} />Save Achiever</button>
                {acMsg && <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#4ADE80' }}>{acMsg}</span>}
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 12 }}>
              {achievers.map(a => (
                <div key={a.id} style={{ ...CARD, display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: "'Cinzel', serif", fontSize: 12, color: '#C9A227', margin: '0 0 2px' }}>{a.title}</p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#F5EFE0', margin: '0 0 2px' }}>{a.name}</p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#7A6E58', margin: 0 }}>{a.points} pts</p>
                  </div>
                  <button onClick={() => setAcForm({ ...a })} style={{ background: 'none', border: '1px solid rgba(201,162,39,0.2)', borderRadius: 4, padding: '4px 8px', cursor: 'pointer', fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: '0.2em', color: '#C9A227' }}>Edit</button>
                  <button onClick={() => removeAchiever(a.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#7A6E58', display: 'flex', alignItems: 'center' }}><Trash2 size={14} /></button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
