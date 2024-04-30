import { createClient } from '@supabase/supabase-js';
import { createContext, useContext } from 'react';

const SupabaseContext = createContext<any>(null);

const SupabaseProvider = ({ children }: any) => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const supabaseKey = process.env.NEXT_PUBLIC_ANON_KEY as string;
  const supabaseClient = createClient(supabaseUrl, supabaseKey);

  return <SupabaseContext.Provider value={{ supabaseClient }}>{children}</SupabaseContext.Provider>;
};

export const useSupabaseProvider = () => {
  const context = useContext(SupabaseContext);
  if (!context) {
    throw new Error('useSupabaseProvider must be used within a NeynarProvider');
  }
  return context;
};

export default SupabaseProvider;
