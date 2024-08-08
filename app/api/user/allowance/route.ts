import checkAddressBalances from "@/lib/hypersub/checkAddressBalances";
import getUser from "@/lib/neynar/getNeynarUser";
import getUserByUsername from "@/lib/neynar/getNeynarUserByUsername";
import supabase from "@/lib/supabase/serverClient";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const fid = req.nextUrl.searchParams.get('fid');
  const username = req.nextUrl.searchParams.get('username');

  try {
    let user: any = null;
    if (username) user = await getUserByUsername(username);
    else if (fid) user = await getUser(Number(fid));
    if (!user) throw Error('username or fid required');

    const allBalances = await checkAddressBalances(user.verifications);

    let hyperSub = false;
    for (const balance of allBalances) {
      if (balance.error) throw balance.error;

      hyperSub = !!balance.result;
      if (hyperSub) break;
    }

    const { data } = await supabase.from('tips').select('*').eq('fid', user.fid).single();

    return Response.json({
      mesage: 'success',
      data: {
        fid: user.fid,
        username: user.username,
        hyperSub,
        powerBadge: user.powerBadge ?? false,
        verifications: user.verifications,
        db: data
      }
    });

  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : 'Failed';
    return Response.json({ message }, { status: 400 });
  }
}
