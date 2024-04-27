import useStack from '@/hooks/useStack';
import { isNil } from 'lodash';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useNeynarProvider } from './NeynarProvider';

const StackContext = createContext<any>(null);

const StackProvider = ({ children }: any) => {
  const [setupActions, setSetupActions] = useState<string[]>([]);
  const [copied, setCopied] = useState<boolean>(false);
  const [balance, setBalance] = useState<bigint | undefined>(undefined);
  const [dailyTipAllowance, setDailyTipAllowance] = useState<bigint | undefined>(undefined);
  const [allowanceRemaining, setAllowanceRemaining] = useState<bigint | undefined>(undefined);
  const { stackClient } = useStack();
  const { user } = useNeynarProvider();

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

  return <StackContext.Provider value={{ balance, tip }}>{children}</StackContext.Provider>;
};

export const useStackProvider = () => {
  const context = useContext(StackContext);
  if (!context) {
    throw new Error('useStackProvider must be used within a FeedProvider');
  }
  return context;
};

export default StackProvider;
