import { useState, useCallback, useEffect } from 'react';
import { useLenis }          from './hooks/useLenis';
import { useScrollProgress } from './hooks/useScrollProgress';

import Loader        from './components/Loader/Loader';
import Hero          from './components/Hero/Hero';
import Crew          from './components/Crew/Crew';
import Timeline      from './components/Timeline/Timeline';
import Waterfall     from './components/Waterfall/Waterfall';
import CampLife      from './components/CampLife/CampLife';      /* ← NEW */
import ExpeditionMap from './components/Map/ExpeditionMap';
import Gallery       from './components/Gallery/Gallery';
import Pokhara       from './components/Pokhara/Pokhara';
import Ending        from './components/Ending/Ending';
import HUD           from './components/UI/HUD';
import NavDots       from './components/UI/NavDots';

import './App.css';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [hudOn,  setHudOn]  = useState(false);

  useLenis();
  const { progress, section } = useScrollProgress();

  useEffect(() => {
    let last = 0;
    const handler = e => {
      const now = Date.now();
      if (now - last < 300) e.preventDefault();
      last = now;
    };
    document.addEventListener('touchend', handler, { passive: false });
    return () => document.removeEventListener('touchend', handler);
  }, []);

  const handleLoadDone = useCallback(() => {
    setLoaded(true);
    setTimeout(() => setHudOn(true), 1500);
  }, []);

  return (
    <div className="app">
      {!loaded && <Loader onComplete={handleLoadDone} />}

      <HUD progress={progress} section={section} visible={hudOn && progress > 0.03} />
      <NavDots section={section} visible={loaded && progress > 0.03} />

      <main>
        <Hero />
        <Crew />
        <Timeline />
        <Waterfall />
        <CampLife />          {/* ← NEW — between Waterfall and Map */}
        <ExpeditionMap />
        <Gallery />
        <Pokhara />
        <Ending />
      </main>
    </div>
  );
}