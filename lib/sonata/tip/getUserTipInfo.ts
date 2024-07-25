import supabase from '@/lib/supabase/serverClient';
import getChannelTipInfo from "./getChannelTipInfo";

async function getUserTipInfo(tipperFid: number, tipAmount = 0, channelId = '') {
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

  const tipInfo = await getChannelTipInfo(channelId, tipAmount);

  return {
    tipperFid,
    channelTip: tipInfo,
    allowableAmount: amount,
    tip: tip.data,
  };
}

export default getUserTipInfo;
