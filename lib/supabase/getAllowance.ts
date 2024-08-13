import supabase from './serverClient';

export default async function getAllowance(fid: number) {
  const { data, error } = await supabase
    .from('tips')
    .select('remaining_tip_allocation, daily_tip_allocation')
    .eq('fid', fid)
    .single();
  if (error) throw error;
  return data;
}
