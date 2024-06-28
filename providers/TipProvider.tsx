import executeDegenTip from '@/lib/degen/executeDegenTip';
import executeTip from '@/lib/sonata/executeTip';
import getCurrentNotes from '@/lib/sonata/getCurrentNotes';
import { TipResponse } from '@/types/TipResponse';
import { isEmpty, isNil } from 'lodash';
import { createContext, useContext, useEffect, useState } from 'react';
import { Address } from 'viem';
import { useNeynarProvider } from './NeynarProvider';
import { useToast } from '@/components/ui/use-toast';
import claimAirdrop from '@/lib/sonata/claimAirdrop';
import { supabaseClient } from '@/lib/supabase/client';

const TipContext = createContext<any>(null);

const TipProvider = ({ children }: any) => {
  const { toast } = useToast();
  const [airdropBalance, setAirdropBalance] = useState<bigint | undefined>(undefined);
  const [balance, setBalance] = useState<bigint | undefined>(undefined);
  const [dailyTipAllowance, setDailyTipAllowance] = useState<bigint | undefined>(undefined);
  const { user, signer } = useNeynarProvider();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]); // Refetch if fid changes

  useEffect(() => {
    if (isNil(user)) return;
    syncPoints();
    getAirdropBalance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const syncPoints = async () => {
    if (isNil(user) || user.verifications.length === 0) return;

    let totalBalance = BigInt(0);

    for (const verification of user.verifications) {
      const currentBalance = await getCurrentNotes(verification as Address);
      totalBalance += BigInt(currentBalance);
    }

    setBalance(totalBalance);
  };

  const getAirdropBalance = async () => {
    if (isNil(user) || user.verifications.length === 0) return;

    const { data } = await supabaseClient
      .from('airdrop')
      .select('notes')
      .ilike('wallet_address', user.verifications[0])
      .single();

    const currentBalance = data?.notes;
    setAirdropBalance(currentBalance);
  };

  const tipDegen = async (amount: bigint, postHash: string) => {
    if (isNil(user) || isEmpty(user.verifications) || isNil(signer?.signer_uuid)) {
      toast({
        title: 'Unable to Tip',
        description: 'Something went wrong',
        variant: 'destructive',
      });
      return;
    }

    const data = await executeDegenTip(
      user.verifications[0],
      signer?.signer_uuid,
      amount,
      postHash,
    );
    const message = data.message;
    toast({ description: message });

    return data;
  };

  const tip = async (
    amount: bigint,
    postHash: string,
    recipientFid: number,
  ): Promise<TipResponse | undefined> => {
    if (
      isNil(user) ||
      isNil(remainingTipAllocation) ||
      isEmpty(user.verifications) ||
      isNil(signer) ||
      isNil(signer?.signer_uuid)
    ) {
      toast({
        title: 'Unable to Tip',
        description: 'Something went wrong',
        variant: 'destructive',
      });
      return;
    }

    const data = await executeTip(signer?.signer_uuid, amount, postHash, recipientFid);
    const message = data.message;
    const tipRemaining = data.tipRemaining;

    setRemainingTipAllocation(BigInt(tipRemaining));
    toast({ description: message });

    return data;
  };

  const refreshBalances = async () => {
    getAirdropBalance();
    syncPoints();
  };

  const handlePost = async () => {
    if (user?.verifications.length === 0) {
      toast({ description: 'Please verify an address on warpcast and try again' });
    } else if (user?.verifications) {
      const response = await claimAirdrop(signer?.signer_uuid, user?.verifications[0]);
      toast({ description: `${response.message}` });
      await refreshBalances();
    }
  };

  return (
    <TipContext.Provider
      value={{
        balance,
        tip,
        tipDegen,
        remainingTipAllocation,
        dailyTipAllowance,
        airdropBalance,
        handlePost,
      }}
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
