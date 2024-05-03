import verifySignerUUID from '@/lib/neynar/verifySigner';
import { StackClient } from '@stackso/js-core';
import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const SUPABASE_URL = process.env.SUPABASE_URL as string;
const SUPABASE_KEY = process.env.SUPABASE_KEY as string;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const stack = new StackClient({
  apiKey: process.env.STACK_API_KEY as string,
  pointSystemId: Number(process.env.STACK_SYSTEM_ID),
});

const getResponse = async (req: NextRequest): Promise<NextResponse> => {
  const body = await req.json();
  const { wallet_address, signer_uuid } = body;

  if (!(await verifySignerUUID(signer_uuid))) {
    return NextResponse.json(
      { message: `Invalid Signer UUID`, tipRemaining: 0, totalTipOnPost: 0 },
      { status: 400 },
    );
  }

  const airdropAmount = await callRedeemAirdrop(wallet_address);

  if (airdropAmount > 0) {
    await stack.track(`airdrop`, { account: wallet_address, points: airdropAmount });
  }

  return NextResponse.json(
    {
      message: `Airdropped ${airdropAmount} NOTES`,
    },
    { status: 200 },
  );
};

async function callRedeemAirdrop(walletAddressInput: string) {
  const { data, error } = await supabase.rpc('redeem_airdrop', {
    wallet_address_input: walletAddressInput,
  });

  if (error) {
    console.error('Error calling function:', error);
    return null;
  }

  console.log('Function returned:', data);
  return data;
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
