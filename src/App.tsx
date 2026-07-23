// src/App.tsx
import { Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { seedIfEmpty } from './data/store';
import LoadingScreen from './components/layout/LoadingScreen';
import TopBar from './components/layout/TopBar';
import Home from './pages/Home';
import ScoreCard from './pages/ScoreCard';
import Winners from './pages/Winners';
import Achievers from './pages/Achievers';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

// Seed teams on first load
seedIfEmpty();

export default function App() {
  const [loading, setLoading] = useState(() => {
    // Only show loading screen once per session
    return !sessionStorage.getItem('aaravam_loaded');
  });
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  function handleLoadComplete() {
    sessionStorage.setItem('aaravam_loaded', '1');
    setLoading(false);
  }

  if (loading) {
    return <LoadingScreen onComplete={handleLoadComplete} />;
  }

  return (
    <div className="min-h-screen bg-bg-base">
      {/* Top bar shown on all non-admin pages */}
      {!isAdmin && <TopBar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scorecard" element={<ScoreCard />} />
        <Route path="/winners" element={<Winners />} />
        <Route path="/achievers" element={<Achievers />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}
