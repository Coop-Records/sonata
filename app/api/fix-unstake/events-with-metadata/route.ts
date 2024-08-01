import { stack } from '@/lib/stack/client';
import { NextRequest } from 'next/server';

interface StackEvent { event: string; address: string; timestamp: string; points: number; metadata: any };

export async function GET(req: NextRequest) {
  const event = req.nextUrl.searchParams.get('event') ?? 'testing_metadata';
  try {
    // await stack.track('testing_metadata', { account: '0xcfbf34d385ea2d5eb947063b67ea226dcda3dc38', points: 0, metadata: { fixUnstake: true } });
    // await stack.track('testing_metadata', { account: '0xcfbf34d385ea2d5eb947063b67ea226dcda3dc38', points: 0, metadata: { fixUnstake: true } });
    // await stack.track('testing_metadata', { account: '0xcfbf34d385ea2d5eb947063b67ea226dcda3dc38', points: 0 });

    const events: StackEvent[] = await stack.eventClient.getEvents({ event, limit: 100 });

    return Response.json({ eventsCount: events.length, filteredEvents: events.filter(event => event.metadata?.fixUnstake) });
  } catch (error) {
    return Response.json(error, { status: 500 })
  }
}

export const dynamic = 'force-dynamic';

// 0xcfbf34d385ea2d5eb947063b67ea226dcda3dc38