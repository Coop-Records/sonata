import dayjs from 'dayjs';
import serverClient from '@/lib/supabase/serverClient';

async function getStakerScores(channelId: string) {
  const DAILY_APR = 0.05 / 365;
  const today = new Date();

  const { data: recentStakes, error: recentStakesError } = await serverClient
    .from('stake_activity_log')
    .select('*')
    .eq('channelId', channelId)
    .gt('created_at', dayjs().subtract(7, 'day').toISOString())
    .order('created_at', { ascending: true });

  if (recentStakesError) throw recentStakesError;

  const stakesByUser: { [key: string]: { totalStaked: number; stakes: typeof recentStakes } } = {};
  recentStakes.forEach((stake) => {
    if (!stakesByUser[stake.fid]) {
      stakesByUser[stake.fid] = { totalStaked: 0, stakes: [] };
    }
    stakesByUser[stake.fid].totalStaked += stake.amount;
    stakesByUser[stake.fid].stakes.push(stake);
  });

  const stakerScores = Object.entries(stakesByUser).map(([fid, { stakes, totalStaked }]) => {
    if (totalStaked <= 0) return;

    let score = stakes.reduce((score, event) => {
      const days = dayjs(today).diff(event.created_at, 'days');
      score += event.amount * (1 + DAILY_APR) ** days;
      return score;
    }, 0);

    score = Math.round(Math.max(score, 0));
    return { fid: Number(fid), score };
  });

  const filteredStakerScores = stakerScores.filter((score) => score !== undefined);
  return filteredStakerScores;
}

export default getStakerScores;
