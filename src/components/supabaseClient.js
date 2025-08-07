import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://bbzwmzdukgmorngtxusw.supabase.co',     // from Supabase dashboard (API settings)
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJiendtemR1a2dtb3JuZ3R4dXN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0MTA5ODUsImV4cCI6MjA2OTk4Njk4NX0.BCKALZ0iPz2XSNBoI2n6taFFouX63ApYLjQZcgtZNbg'         // always use the anon/public key in the frontend
);
