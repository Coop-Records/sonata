import getBulkUsersByFid from "@/lib/neynar/getBulkUsersByFid";
import getStackPoints from "@/lib/sonata/getStackPoints";
import { supabaseClient as supabase } from "@/lib/supabase/client";
import { User } from "@neynar/nodejs-sdk/build/neynar-api/v2";

export async function retrieveRecords() {
  const DATE_BEFORE_UPDATE = '2024-07-23 00:00:00.171077+00';

  const { data, error } = await supabase.from('stake_activity_log').select('*').lt('created_at', DATE_BEFORE_UPDATE).order('created_at');
  if (error) throw error;
  if (!data.length) throw Error('No records found in supabase');

  const uniqueChannels = new Map<string, { id: string; address: string }>();

  data.forEach(row => uniqueChannels.set(row.channelId, { id: row.channelId, address: row.channelAddress }));

  const users: User[] | null = await getBulkUsersByFid([...new Set(data.map(row => row.fid as number))]);
  if (!Array.isArray(users)) throw Error('could not get users');

  return { channels: [...uniqueChannels.values()], users };
}

export async function GET() {
  try {
    const { users, channels } = await retrieveRecords();

    const results = await Promise.all(
      users.map((user) => {
        return channels.map(async (channel) => {
          const points = await getStackPoints(user.verifications, `channel_stake_${channel.id}_${user.fid}`);

          const { data } = await supabase.rpc('get_user_channel_staked_amount', {
            p_fid: user.fid,
            p_channelId: channel.id
          });

          return {
            fid: user.fid,
            channelId: channel.id,
            stackPoints: -points,
            supabasePoints: data,
          };
        });
      }).flat()
    );

    return Response.json({ results });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed';
    return Response.json({ message }, { status: 400 });
  }
}
