/* GA4 analytics wrapper — replace GA_MEASUREMENT_ID and enable the script tag in index.html */

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID ?? '';

function gtag(...args) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag(...args);
  }
}

export const analytics = {
  pageView(path) {
    if (!GA_ID) return;
    gtag('config', GA_ID, { page_path: path });
  },

  event(action, params = {}) {
    if (!GA_ID) return;
    gtag('event', action, params);
  },

  // Convenience wrappers
  trackSignUp(method = 'email') {
    this.event('sign_up', { method });
  },

  trackPurchase(plan, value) {
    this.event('purchase', {
      currency: 'USD',
      value,
      items: [{ item_name: plan }],
    });
  },

  trackProjectView(slug) {
    this.event('view_item', { item_name: slug });
  },
};
