import executeDegenTip from '@/lib/degen/executeDegenTip';
import executeTip from '@/lib/sonata/executeTip';
import getCurrentNotes from '@/lib/sonata/getCurrentNotes';
import { TipResponse } from '@/types/TipResponse';
import { isEmpty, isNil } from 'lodash';
import { createContext, useContext, useEffect, useState } from 'react';
import { Address } from 'viem';
import { useNeynarProvider } from './NeynarProvider';
import { useSupabaseProvider } from './SupabaseProvider';
import { useToast } from '@/components/ui/use-toast';

const TipContext = createContext<any>(null);

const TipProvider = ({ children }: any) => {
  const { toast } = useToast();
  const [balance, setBalance] = useState<bigint | undefined>(undefined);
  const [dailyTipAllowance, setDailyTipAllowance] = useState<bigint | undefined>(undefined);
  const { user, signer } = useNeynarProvider();
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
    const currentBalance = await getCurrentNotes(user.verifications[0] as Address);
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
    toast({ description: message });

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
      isNil(signer) ||
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

    setRemainingTipAllocation(BigInt(tipRemaining));
    toast({ description: message });

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
