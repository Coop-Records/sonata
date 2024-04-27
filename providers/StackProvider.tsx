import useStack from '@/hooks/useStack';
import { isNil } from 'lodash';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useNeynarProvider } from './NeynarProvider';
import { useSupabaseProvider } from './SupabaseProvider';

const StackContext = createContext<any>(null);

const StackProvider = ({ children }: any) => {
  const [setupActions, setSetupActions] = useState<string[]>([]);
  const [copied, setCopied] = useState<boolean>(false);
  const [balance, setBalance] = useState<bigint | undefined>(undefined);
  const [dailyTipAllowance, setDailyTipAllowance] = useState<bigint | undefined>(undefined);
  const { stackClient } = useStack();
  const { user } = useNeynarProvider();
  const { supabaseClient } = useSupabaseProvider();

  const [remainingTipAllocation, setRemainingTipAllocation] = useState<bigint | undefined>(
    undefined,
  );

  useEffect(() => {
    if (isNil(user)) return;
    const fetchTipAllocation = async () => {
      // Assuming 'fid' is the primary key, adjust if it's not
      const { data, error } = await supabaseClient
        .from('tips')
        .select('remaining_tip_allocation,daily_tip_allocation')
        .eq('fid', user.fid)
        .single();

      if (error) {
        console.error('Error fetching data:', error);
        return;
      }

      if (data) {
        setRemainingTipAllocation(BigInt(data.remaining_tip_allocation));
        setDailyTipAllowance(BigInt(data.daily_tip_allocation));
      }
    };

    fetchTipAllocation();
  }, [user]); // Refetch if fid changes

  useEffect(() => {
    if (isNil(user)) return;
    syncPoints();
  }, [user]);

  const syncPoints = async () => {
    if (isNil(user) || user.verifications.length === 0) return;

    const currentBalance = (await stackClient?.getPoints(user.verifications))[0].amount;
    setBalance(BigInt(currentBalance));
  };

  const tip = (amount: bigint) => {
    if (isNil(user)) return;
    // TODO: Call supabase and check what allowanceRemaining is
    // TODO: If valid balance then
  };

  return (
    <StackContext.Provider value={{ balance, tip, remainingTipAllocation, dailyTipAllowance }}>
      {children}
    </StackContext.Provider>
  );
};

export const useStackProvider = () => {
  const context = useContext(StackContext);
  if (!context) {
    throw new Error('useStackProvider must be used within a FeedProvider');
  }
  return context;
};

export default StackProvider;
