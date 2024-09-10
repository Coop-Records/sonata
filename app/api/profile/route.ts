import { EVENT_ZORA_PROFILE } from "@/lib/consts";
import trackEndpoint from "@/lib/stack/trackEndpoint";
import getZoraProfile from "@/lib/zora/getZoraProfile";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await trackEndpoint(EVENT_ZORA_PROFILE)

    const address = req.nextUrl.searchParams.get('address')
    if (!address) throw Error("address is required")

    const zoraProfile = await getZoraProfile(address)

    return Response.json({ message: 'success', zoraProfile });
  } catch (e) {
    const message = (e as { message?: string })?.message ?? "failed"
    return Response.json({ message }, { status: 400 });
  }
}
