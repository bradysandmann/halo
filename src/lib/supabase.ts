import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!url || !anonKey) {
  console.warn('[halo] Supabase env vars missing. Auth + persistence disabled.');
}

export const supabase = createClient(url ?? '', anonKey ?? '', {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
  },
  db: { schema: 'halo' },
});

export type Business = {
  id: string;
  user_id: string;
  name: string;
  brand_voice: string | null;
  category: string | null;
  created_at: string;
};

export type Review = {
  id: string;
  business_id: string;
  source: 'google' | 'yelp' | 'g2' | 'trustpilot';
  rating: number;
  author: string | null;
  body: string | null;
  posted_at: string;
  status: 'new' | 'replied' | 'skipped';
};

export type Draft = {
  id: string;
  review_id: string;
  draft_text: string | null;
  status: 'pending' | 'approved' | 'skipped';
  created_at: string;
};
