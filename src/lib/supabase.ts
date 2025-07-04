import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl) {
  console.error('Missing VITE_SUPABASE_URL environment variable');
  throw new Error('Supabase URL is required');
}

if (!supabaseAnonKey) {
  console.error('Missing VITE_SUPABASE_ANON_KEY environment variable');
  throw new Error('Supabase Anon Key is required');
}

// Log configuration for debugging (remove in production)
console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Anon Key:', supabaseAnonKey.substring(0, 10) + '...');

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
});

// Test the connection
supabase.auth.getSession().then(({ data, error }) => {
  if (error) {
    console.error('Supabase connection error:', error);
  } else {
    console.log('Supabase connection successful');
  }
});