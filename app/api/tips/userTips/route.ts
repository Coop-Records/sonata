import supabase from '@/lib/supabase/serverClient';

export async function GET() {
  const { data, error } = await supabase
    .rpc('get_user_tipping_stats')
    .select('total_users, total_tippers')
    .single();

  if (error) return Response.json(error, { status: 500 });

  const tipAdoptionBps = (data.total_tippers / data.total_users) * 10000;

  return Response.json({
    tipAdoptionBps,
    numberOfUniqueTippers: data.total_tippers,
    numberOfTotalUniqueUsers: data.total_users,
  });
}
