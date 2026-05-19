import { useCallback, useEffect, useState } from 'react';
import { ALL_PORTFOLIOS } from '../data/allPortfolios';

export function useRandomPortfolio() {
  const [flash, setFlash] = useState(false);

  const openRandom = useCallback((filtered = null) => {
    const pool = filtered ?? ALL_PORTFOLIOS;
    if (!pool.length) return;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    setFlash(true);
    setTimeout(() => setFlash(false), 600);
    window.open(pick.url, '_blank', 'noopener,noreferrer');
  }, []);

  // Global keyboard shortcut: press R anywhere
  useEffect(() => {
    function onKey(e) {
      const tag = e.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.key === 'r' || e.key === 'R') openRandom();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openRandom]);

  return { openRandom, flash };
}
