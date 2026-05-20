import { useState, useEffect } from 'react';
export const useMediaQuery = q => {
  const [m, setM] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(q).matches : false
  );
  useEffect(() => {
    const mql = window.matchMedia(q);
    const h = e => setM(e.matches);
    mql.addEventListener('change', h);
    return () => mql.removeEventListener('change', h);
  }, [q]);
  return m;
};
export const useIsMobile = () => useMediaQuery('(max-width: 768px)');