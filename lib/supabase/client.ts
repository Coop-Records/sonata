const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_ANON_KEY as string;

import { createClient } from '@supabase/supabase-js';
export const supabaseClient = createClient(supabaseUrl, supabaseKey);
