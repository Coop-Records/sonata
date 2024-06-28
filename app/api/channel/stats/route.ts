import getChannelStats from '@/lib/supabase/getChannelStats';

export async function GET() {
  try {
    const channels = await getChannelStats();
    return Response.json({ message: 'success', channels }, { status: 200 });
  } catch (error) {
    return Response.json(error ?? { message: 'failed' }, { status: 200 });
  }
}
