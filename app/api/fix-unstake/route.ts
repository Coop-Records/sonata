import { stack } from "@/lib/stack/client";
import { forEachRecord, retrieveRecords } from "./lib";

export async function GET() {
  try {
    const data = await retrieveRecords();

    let changesCount = 0;
    await forEachRecord(data, async (stake, event, userAddress) => {
      const metadata = { fixUnstake: true };
      const { channelAddress, fid, channelId, amount } = stake;

      const results = await Promise.all([
        // unstaking in deprecated event
        stack.track(`channel_stake_from_${channelAddress}`, { account: channelAddress, points: -amount, metadata }),
        stack.track(`channel_stake_to_${fid}`, { account: userAddress, points: amount, metadata }),
        // restake in new events
        stack.track(`channel_stake_${channelId}_${fid}`, { account: userAddress, points: -amount, metadata }),
        stack.track(`channel_stake_${channelId}`, { account: channelAddress, points: amount, metadata })
      ]);

      if (results.some(res => !res.success)) {
        console.error('Error:', `staking failed for user ${fid}, record id ${stake.id}`);
        return;
      }
      changesCount++;
    });

    return Response.json({
      changesCount,
      countInSupabase: data.data.length,
      uniqueFids: data.uniqueFids
    });
  } catch (error) {
    return Response.json(error, { status: 500 })
  }
}

export const dynamic = 'force-dynamic';