import { NextRequest } from "next/server";
import { Address, parseEventLogs } from "viem";
import { EVENT_ZORA_REWARDS } from "@/lib/consts";
import getEvents from "@/lib/stack/getEvents";
import trackEndpoint from "@/lib/stack/trackEndpoint";
import getRewardsDepositLogs from "@/lib/zora/getRewardsDepositLogs";
import getBlock from "@/lib/viem/getBlock";
import formatBigIntValues from "@/lib/formatBigIntValues";
import {  protocolRewardsABI as abi } from '@zoralabs/protocol-deployments';

export async function GET(request: NextRequest) {
  try {
    await trackEndpoint(EVENT_ZORA_REWARDS)
    const address = new URL(request.url).searchParams.get('address') as Address; 
    const events = getEvents(address, EVENT_ZORA_REWARDS);
    const startBlock = await getBlock({ blockTag: 'earliest' });
    const logs = await getRewardsDepositLogs(address, startBlock.number);
    const response = parseEventLogs({ 
      abi, 
      logs,
    })
    return Response.json({ message: 'success', address, events, logs: formatBigIntValues(response) });
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ message: 'failed' }, { status: 400 });
  }
}

export const revalidate = 0;