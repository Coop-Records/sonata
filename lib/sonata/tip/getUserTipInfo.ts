import { createClient } from "@supabase/supabase-js";
import verifySignerUUID from "../../neynar/verifySigner";
import getChannelTipInfo from "./getChannelTipInfo";
import supabase from '@/lib/supabase/serverClient';

async function getUserTipInfo(signer_uuid = '', tipAmount = 0, referer = '') {
  const { status, fid: tipperFid } = await verifySignerUUID(signer_uuid);
  if (!status) throw Error('Invalid Signer UUID');

  const tip = await supabase
    .from('tips')
    .select('remaining_tip_allocation, daily_tip_allocation')
    .eq('fid', tipperFid)
    .single();
  if (tip.error) throw tip.error;

  const amount = Math.min(
    tipAmount,
    tip.data.daily_tip_allocation,
    tip.data.remaining_tip_allocation,
  );
  if (amount <= 0) throw Error('Already reached max NOTES');

  const tipInfo = await getChannelTipInfo(referer, tipAmount);

  return {
    tipperFid,
    channelTip: tipInfo,
    allowableAmount: amount,
    tip: tip.data,
  };
}

export default getUserTipInfo;
