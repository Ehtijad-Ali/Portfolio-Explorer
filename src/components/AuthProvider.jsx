import { useState, useEffect } from 'react';
import { AuthContext, TIERS } from '../hooks/useAuth';

const STORAGE_KEY = 'pe-user';

function loadUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadUser);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    else localStorage.removeItem(STORAGE_KEY);
  }, [user]);

  async function signIn(email, password) {
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    // Mock: any login succeeds; email determines tier
    const tier = email.includes('agency')
      ? TIERS.AGENCY
      : email.includes('pro')
      ? TIERS.PRO
      : TIERS.FREE;
    setUser({ id: crypto.randomUUID(), email, name: email.split('@')[0], tier, avatar: null });
    setLoading(false);
  }

  async function signUp(email, password, name) {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setUser({ id: crypto.randomUUID(), email, name, tier: TIERS.FREE, avatar: null });
    setLoading(false);
  }

  function signOut() {
    setUser(null);
  }

  function upgradeTier(tier) {
    setUser(u => ({ ...u, tier }));
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, upgradeTier }}>
      {children}
    </AuthContext.Provider>
  );
}
