import useStack from '@/hooks/useStack';
import executeDegenTip from '@/lib/degen/executeDegenTip';
import getDegenTipsData from '@/lib/degen/getDegenTipsData';
import executeTip from '@/lib/sonata/executeTip';
import { TipResponse } from '@/types/TipResponse';
import { isEmpty, isNil } from 'lodash';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useFeedProvider } from './FeedProvider';
import { useNeynarProvider } from './NeynarProvider';
import { useSupabaseProvider } from './SupabaseProvider';

const TipContext = createContext<any>(null);

const TipProvider = ({ children }: any) => {
  const [balance, setBalance] = useState<bigint | undefined>(undefined);
  const [dailyTipAllowance, setDailyTipAllowance] = useState<bigint | undefined>(undefined);
  const { stackClient } = useStack();
  const { user, signer } = useNeynarProvider();
  const { supabaseClient } = useSupabaseProvider();
  const { fetchAndUpdatePoints } = useFeedProvider();

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
    if (isNil(stackClient) || isNil(user) || user.verifications.length === 0) return;
    const currentBalance = await stackClient?.getPoints(user.verifications[0]);
    setBalance(BigInt(currentBalance));
  };

  const tipDegen = async (amount: bigint, postHash: string) => {
    if (isNil(user) || isEmpty(user.verifications) || isNil(signer?.signer_uuid)) {
      return;
    }

    const data = await executeDegenTip(
      user.verifications[0],
      signer?.signer_uuid,
      amount,
      postHash,
    );
    console.log(data);
    const message = data.message;
    toast(message);

    return data;
  };

  const tip = async (
    amount: bigint,
    postHash: string,
    authorWalletAddresses: string[],
  ): Promise<TipResponse | undefined> => {
    if (
      isNil(user) ||
      isNil(remainingTipAllocation) ||
      isEmpty(user.verifications) ||
      isNil(authorWalletAddresses) ||
      isEmpty(authorWalletAddresses) ||
      isNil(signer?.signer_uuid)
    ) {
      return;
    }

    const data = await executeTip(
      signer?.signer_uuid,
      user.verifications[0],
      amount,
      postHash,
      authorWalletAddresses[0],
    );

    const message = data.message;
    const tipRemaining = data.tipRemaining;

    await fetchAndUpdatePoints(postHash);

    setRemainingTipAllocation(BigInt(tipRemaining));
    toast(message);

    return data;
  };

  return (
    <TipContext.Provider
      value={{ balance, tip, tipDegen, remainingTipAllocation, dailyTipAllowance }}
    >
      {children}
    </TipContext.Provider>
  );
};

export const useTipProvider = () => {
  const context = useContext(TipContext);
  if (!context) {
    throw new Error('useTipProvider must be used within a FeedProvider');
  }
  return context;
};

export default TipProvider;
