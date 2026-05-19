import { clsx } from 'clsx';

export function cn(...inputs) {
  return clsx(inputs);
}

export function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function formatPrice(cents) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(cents / 100);
}

export function truncate(str, n) {
  return str.length > n ? str.slice(0, n - 1) + '…' : str;
}

export function getInitials(name) {
  return name
    .split(' ')
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase();
}

const COLORS = [
  '#6c47ff','#00c9a7','#f59e0b','#ef4444',
  '#3b82f6','#ec4899','#10b981','#8b5cf6',
];
export function hashColor(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = str.charCodeAt(i) + ((h << 5) - h);
  return COLORS[Math.abs(h) % COLORS.length];
}
