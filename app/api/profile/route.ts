import { EVENT_ZORA_PROFILE } from '@/lib/consts';
import getConnectedZoraProfile from '@/lib/getConnectedZoraProfile';
import trackEndpoint from '@/lib/stack/trackEndpoint';
import verifySubscription from '@/lib/verifySubscription';
import getZoraProfile from '@/lib/zora/getZoraProfile';
import { NextRequest } from 'next/server';
import { Address, isAddress, zeroAddress } from 'viem';

export async function GET(req: NextRequest) {
  try {
    await trackEndpoint(EVENT_ZORA_PROFILE);

    const address = req.nextUrl.searchParams.get('address');
    if (!address) throw Error('address is required');

    const zoraProfile = await getZoraProfile(address);
    const isPro = await verifySubscription(isAddress(address) ? (address as Address) : zeroAddress);
    const connectedZoraProfile = await getConnectedZoraProfile(zoraProfile.address);
    return Response.json({
      message: 'success',
      zoraProfile,
      isPro,
      connectedZoraProfile,
    });
  } catch (e) {
    const message = (e as { message?: string })?.message ?? 'failed';
    return Response.json({ message }, { status: 400 });
  }
}

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;
