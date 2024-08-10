import { NextRequest } from "next/server";
import { Address } from "viem";
import trackEndpoint from "@/lib/trackEndpoint";
import { EVENT_ZORA_REWARDS } from "@/lib/consts";

export async function GET(request: NextRequest) {
  try {
    await trackEndpoint(EVENT_ZORA_REWARDS)
    const address = new URL(request.url).searchParams.get('address') as Address; 
    return Response.json({ message: 'success', address });
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ message: 'failed' }, { status: 400 });
  }
}
