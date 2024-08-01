import { stack } from '@/lib/stack/client';
import { supabaseClient } from '@/lib/supabase/client';

interface StackEvent { event: string; address: string; timestamp: string; points: number };

export async function GET() {
  // Github merge date:  Jul 22, 2024 7:59pm
  // safe:               2024-07-23 00:00:00.171077+00
  // estimated:          2024-07-22 20:30:00.699942+00
  const DATE_BEFORE_UPDATE = '2024-07-23 00:00:00.171077+00';

  try {
    const { data, error } = await supabaseClient.from('stake_activity_log').select('*').lt('created_at', DATE_BEFORE_UPDATE).order('created_at');
    if (error) throw error;
    if (!data.length) throw Error('No records found in supabase');

    const uniqueFids = [...new Set(data.map(row => row.fid as number))];

    const events: StackEvent[][] = await Promise.all(uniqueFids.map(fid => stack.getEvents({ event: `channel_stake_from_${fid}`, limit: 100 })));
    if (!Array.isArray(events)) throw Error('Could not get events');

    const changes: any[] = [];
    for (let i = 0; i < uniqueFids.length; i++) {
      const fid = uniqueFids[i];
      const fidEvents = events[i].toReversed();
      const stakes = data.filter(row => row.fid === fid);

      if (stakes.length !== fidEvents.length) {
        console.error('Error:', `user ${fid}, events do match supabase records`);
        continue;
      }

      for (let ii = 0; ii < stakes.length; ii++) {
        const stake = stakes[ii];
        const event = fidEvents[ii];

        if (event.points > 0 || -event.points !== stake.amount) {
          console.error('Error:', `user ${fid},stack(${event.points}) !== supabase(${stake.amount})`);
          break;
        }

        changes.push({
          fid,
          channnelId: stake.channelId,
          supabaseAmount: stake.amount,
          legacyAmount: -event.points,
          supabase: stake,
          event,
        });
      }
    }

    return Response.json({
      changesCount: changes.length,
      countInSupabase: data.length,
      events,
      changes,
      uniqueFids
    });
  } catch (error) {
    return Response.json(error, { status: 500 })
  }
}

export const dynamic = 'force-dynamic';