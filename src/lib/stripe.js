import { loadStripe } from '@stripe/stripe-js';

// Replace with your real publishable key
const STRIPE_PK = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ?? 'pk_test_placeholder';

let stripePromise;
export function getStripe() {
  if (!stripePromise) stripePromise = loadStripe(STRIPE_PK);
  return stripePromise;
}

export const PRICE_IDS = {
  pro:    import.meta.env.VITE_STRIPE_PRICE_PRO    ?? 'price_pro_placeholder',
  agency: import.meta.env.VITE_STRIPE_PRICE_AGENCY ?? 'price_agency_placeholder',
};

/**
 * Mock Stripe Checkout — replace with real server call:
 * POST /api/create-checkout-session { priceId, userId }
 * → { url } then window.location.href = url
 */
export async function createCheckoutSession(plan, userId) {
  console.info('[Stripe] createCheckoutSession', { plan, userId });
  await new Promise(r => setTimeout(r, 1200));
  // In production: redirect to Stripe Checkout URL
  // For demo: return a mock success URL
  return { url: `/checkout/success?plan=${plan}` };
}

export async function createPortalSession(customerId) {
  console.info('[Stripe] createPortalSession', { customerId });
  await new Promise(r => setTimeout(r, 800));
  return { url: '/dashboard?portal=1' };
}
