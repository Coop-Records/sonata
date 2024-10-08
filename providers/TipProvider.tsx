import executeDegenTip from '@/lib/degen/executeDegenTip';
import executeTip from '@/lib/sonata/executeTip';
import getCurrentNotes from '@/lib/sonata/getCurrentNotes';
import { isEmpty, isNil } from 'lodash';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Address } from 'viem';
import { useToast } from '@/components/ui/use-toast';
import claimAirdrop from '@/lib/sonata/claimAirdrop';
import { supabaseClient } from '@/lib/supabase/client';
import { usePrivy } from '@privy-io/react-auth';
import getVerifications from '@/lib/farcaster/getVerifications';
import useSigner from '@/hooks/farcaster/useSigner';
import farcasterClient from '@/lib/farcaster/client';

const TipContext = createContext<any>(null);

const TipProvider = ({ children }: any) => {
  const { toast } = useToast();
  const [airdropBalance, setAirdropBalance] = useState<bigint | undefined>(undefined);
  const [balance, setBalance] = useState<bigint | undefined>(undefined);
  const [dailyTipAllowance, setDailyTipAllowance] = useState<bigint | undefined>(undefined);
  const [accessToken, setAccessToken] = useState<string>();
  const [verifications, setVerifications] = useState<string[]>([]);
  const { getSigner } = useSigner();
  const { user, getAccessToken } = usePrivy();

  const userFid = user?.farcaster?.fid;
  const [remainingTipAllocation, setRemainingTipAllocation] = useState<bigint | undefined>(
    undefined,
  );

  useEffect(() => {
    if (isNil(userFid)) return;
    const fetchTipAllocation = async () => {
      const { data, error } = await supabaseClient
        .from('tips')
        .select('remaining_tip_allocation,daily_tip_allocation')
        .eq('fid', userFid)
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
  }, [userFid]);

  useEffect(() => {
    const fetchAccessToken = async () => {
      const accessToken = await getAccessToken();
      if (accessToken) {
        setAccessToken(accessToken);
      }
    };

    fetchAccessToken();
  }, [getAccessToken]);

  useEffect(() => {
    const fetchVerifications = async () => {
      if (isNil(userFid)) return;
      const verifications = await getVerifications(userFid);
      if (verifications) {
        setVerifications(verifications);
      }
    };

    fetchVerifications();
  }, [userFid]);

  const syncPoints = useCallback(async () => {
    if (isNil(userFid) || verifications.length === 0) return;

    let totalBalance = BigInt(0);

    for (const verification of verifications) {
      const currentBalance = await getCurrentNotes(verification as Address);
      totalBalance += BigInt(currentBalance);
    }

    setBalance(totalBalance);
  }, [userFid, verifications]);

  const getAirdropBalance = useCallback(async () => {
    if (isNil(user) || verifications.length === 0) return;

    const { data } = await supabaseClient
      .from('airdrop')
      .select('notes')
      .ilike('wallet_address', verifications[0])
      .single();

    const currentBalance = data?.notes;
    setAirdropBalance(currentBalance);
  }, [user, verifications]);

  useEffect(() => {
    if (isNil(userFid)) return;
    syncPoints();
    getAirdropBalance();
  }, [userFid, syncPoints, getAirdropBalance]);

  const tipDegen = async (amount: bigint, postHash: string) => {
    try {
      const signer = await getSigner();

      if (isNil(userFid) || isEmpty(verifications) || isNil(accessToken) || isNil(signer)) {
        throw new Error();
      }

      const data = await executeDegenTip(accessToken, amount, postHash);
      farcasterClient.submitCast({ text: `${data.usedTip} $DEGEN` }, userFid, signer);
      toast({ description: `Tipped ${data.usedTip} DEGEN` });

      return data;
    } catch (error) {
      toast({ description: 'Unable to Tip!', variant: 'destructive' });
      return;
    }
  };

  const tip = async (amount: number, postHash: string) => {
    try {
      if (
        isNil(user) ||
        isNil(remainingTipAllocation) ||
        isEmpty(verifications) ||
        isNil(accessToken)
      ) {
        throw new Error();
      }
      const data = await executeTip({ accessToken, amount, postHash });
      setRemainingTipAllocation(BigInt(data.tipRemaining));
      setBalance((balance ?? BigInt(0)) + BigInt(data.tipperAmount));
      toast({ description: `Tipped ${amount} NOTES` });
      return data;
    } catch (error) {
      toast({ description: 'Unable to Tip!', variant: 'destructive' });
      return;
    }
  };

  const refreshBalances = async () => {
    getAirdropBalance();
    syncPoints();
  };

  const handlePost = async () => {
    if (verifications.length === 0) {
      toast({ description: 'Please verify an address on warpcast and try again' });
    } else if (verifications) {
      const response = await claimAirdrop(accessToken, verifications[0]);
      toast({ description: `${response.message}` });
      await refreshBalances();
    }
  };

  return (
    <TipContext.Provider
      value={{
        balance,
        setBalance,
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
