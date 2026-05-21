import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function timeAgo(iso: string): string {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const sec = Math.floor((now - then) / 1000);
  if (sec < 60) return `${sec}s ago`;
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.floor(hr / 24);
  if (day < 30) return `${day}d ago`;
  const mo = Math.floor(day / 30);
  if (mo < 12) return `${mo}mo ago`;
  return `${Math.floor(mo / 12)}y ago`;
}

export function sentimentForRating(r: number): 'positive' | 'neutral' | 'negative' {
  if (r >= 4) return 'positive';
  if (r === 3) return 'neutral';
  return 'negative';
}

export function sourceLabel(s: string): string {
  return { google: 'Google', yelp: 'Yelp', g2: 'G2', trustpilot: 'Trustpilot' }[s] ?? s;
}
