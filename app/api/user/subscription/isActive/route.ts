import checkAddressBalances from "@/lib/hypersub/checkAddressBalances";
import getUser from "@/lib/neynar/getNeynarUser";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const fid = req.nextUrl.searchParams.get('fid');

  try {
    if (!fid) throw Error('fid is required');

    const user = await getUser(Number(fid));
    const allBalances = await checkAddressBalances(user.verifications);

    let isActive = false;
    for (const balance of allBalances) {
      if (balance.error) throw balance.error;

      isActive = !!balance.result;
      if (isActive) break;
    }

    return Response.json({ mesage: 'success', isActive });

  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : 'Failed';
    return Response.json({ message }, { status: 400 });
  }
}