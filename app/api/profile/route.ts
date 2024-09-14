import { EVENT_ZORA_PROFILE } from "@/lib/consts";
import trackEndpoint from "@/lib/stack/trackEndpoint";
import verfiySubscription from "@/lib/verfiySubscription";
import getZoraProfile from "@/lib/zora/getZoraProfile";
import { NextRequest } from "next/server";
import { Address, isAddress, zeroAddress } from "viem";

export async function GET(req: NextRequest) {
  try {
    await trackEndpoint(EVENT_ZORA_PROFILE)

    const address = req.nextUrl.searchParams.get('address')
    if (!address) throw Error("address is required")

    const zoraProfile = await getZoraProfile(address)
    const isPro = await verfiySubscription(isAddress(address) ? address as Address : zeroAddress)

    return Response.json({ message: 'success', zoraProfile, isPro });
  } catch (e) {
    const message = (e as { message?: string })?.message ?? "failed"
    return Response.json({ message }, { status: 400 });
  }
}
