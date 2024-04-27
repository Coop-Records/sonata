import useStack from '@/hooks/useStack';
import { createClient } from '@supabase/supabase-js';
import { isNil } from 'lodash';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useNeynarProvider } from './NeynarProvider';

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
