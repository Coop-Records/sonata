import trackEndpoint from "@/lib/trackEndpoint";
import getLeaderboardData from "./getLeaderboardData";

export async function GET() {
  try {
    await trackEndpoint("stack+leaderboard");
    const data = await getLeaderboardData()
    return new Response(JSON.stringify({
      message: 'success',
      data
    }), { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ message: 'failed' }), { status: 400 });
  }
}
