import trackEndpoint from '@/lib/stack/trackEndpoint';
import getLeaderboardData from './getLeaderboardData';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export async function GET() {
  try {
    await trackEndpoint('stack+leaderboard');
    const data = await getLeaderboardData();
    return new Response(
      JSON.stringify({
        message: 'success',
        data,
      }),
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, max-age=0, must-revalidate',
        },
      },
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ message: 'failed' }), {
      status: 400,
      headers: {
        'Cache-Control': 'no-store, max-age=0, must-revalidate',
      },
    });
  }
}
