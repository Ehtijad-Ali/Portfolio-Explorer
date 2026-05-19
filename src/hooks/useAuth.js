import { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export const TIERS = { FREE: 'free', PRO: 'pro', AGENCY: 'agency' };

const TIER_ORDER = [TIERS.FREE, TIERS.PRO, TIERS.AGENCY];

export function hasAccess(userTier, requiredTier) {
  return TIER_ORDER.indexOf(userTier) >= TIER_ORDER.indexOf(requiredTier);
}
