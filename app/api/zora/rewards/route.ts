import { NextRequest } from "next/server";
import { Address } from "viem";
import { EVENT_ZORA_REWARDS } from "@/lib/consts";
import getEvents from "@/lib/stack/getEvents";
import trackEndpoint from "@/lib/stack/trackEndpoint";

export async function GET(request: NextRequest) {
  try {
    await trackEndpoint(EVENT_ZORA_REWARDS)
    const address = new URL(request.url).searchParams.get('address') as Address; 
    const events = getEvents(address, EVENT_ZORA_REWARDS);
    return Response.json({ message: 'success', address, events });
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ message: 'failed' }, { status: 400 });
  }
}
