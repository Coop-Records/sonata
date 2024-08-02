import getChannelWeeklyAirdropData from "@/lib/sonata/getChannelWeeklyAirdropData";

export async function GET() {
  try {
    const data = await getChannelWeeklyAirdropData();

    return Response.json({ message: 'success', data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed';
    return Response.json({ message }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';