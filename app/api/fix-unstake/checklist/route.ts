import { forEachRecord, retrieveRecords } from "../lib";

export async function GET() {
  try {
    const data = await retrieveRecords();

    const changes: any[] = [];
    await forEachRecord(data, async (stake, event) => {
      changes.push({
        id: stake.id,
        fid: stake.fid,
        eventName: event.event,
        channnelId: stake.channelId,
        supabaseAmount: stake.amount,
        legacyAmount: -event.points,
        supabaseTimestamp: stake.created_at,
        eventTimestamp: event.timestamp,
      });
    });

    return Response.json({
      changesCount: changes.length,
      countInSupabase: data.data.length,
      eventsCount: data.events.flat().length,
      changes,
      uniqueFids: data.uniqueFids
    });
  } catch (error) {
    return Response.json(error, { status: 500 })
  }
}

export const dynamic = 'force-dynamic';