import getBulkUsersByFid from '@/lib/neynar/getBulkUsersByFid';
import { stack } from '@/lib/stack/client';
import { supabaseClient } from '@/lib/supabase/client';
import { User } from '@neynar/nodejs-sdk/build/neynar-api/v2';

interface StackEvent { event: string; address: string; timestamp: string; points: number };

export async function retrieveRecords() {
  // Github merge date:  Jul 22, 2024 7:59pm
  // safe:               2024-07-23 00:00:00.171077+00
  // estimated:          2024-07-22 20:30:00.699942+00
  const DATE_BEFORE_UPDATE = '2024-07-23 00:00:00.171077+00';

  const { data, error } = await supabaseClient.from('stake_activity_log').select('*').lt('created_at', DATE_BEFORE_UPDATE).order('created_at');
  if (error) throw error;
  if (!data.length) throw Error('No records found in supabase');

  const uniqueFids = [...new Set(data.map(row => row.fid as number))];

  const events: StackEvent[][] = await Promise.all(uniqueFids.map(fid => stack.getEvents({ event: `channel_stake_from_${fid}`, limit: 100 })));
  if (!Array.isArray(events)) throw Error('Could not get events');

  const users: User[] | null = await getBulkUsersByFid(uniqueFids);
  if (!Array.isArray(users) || users.length !== uniqueFids.length) throw Error('could not get users');

  return { events, data, uniqueFids, users };
}

export async function forEachRecord(
  input: Awaited<ReturnType<typeof retrieveRecords>>,
  callback: (stake: any, event: StackEvent, userAddress: string) => Promise<void>
) {
  const { uniqueFids, events, users, data } = input;

  for (let i = 0; i < uniqueFids.length; i++) {
    const fid = uniqueFids[i];
    const fidEvents = events[i].toReversed();
    const stakes = data.filter((row: any) => row.fid === fid);

    // if (stakes.length !== fidEvents.length) {
    //   console.error('Error:', `user ${fid}, events do match supabase records`);
    //   continue;
    // }

    const user = users.find(user => user.fid === fid)!;
    const userAddress = user.verifications[0];

    for (let ii = 0; ii < stakes.length; ii++) {
      const stake = stakes[ii];
      const event = fidEvents[ii];

      if (event.points > 0 || -event.points !== stake.amount) {
        console.error('Error:', `user ${fid},stack(${event.points}) !== supabase(${stake.amount})`);
        break;
      }

      await callback(stake, event, userAddress);
    }
  }
}