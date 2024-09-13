import { getLatestTips } from '@/lib/getLatestTips';

export async function GET() {
  try {
    const tips = await getLatestTips();
    return Response.json({ message: 'Latest tips retrieved successfully', tips });
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
}

export const revalidate = 0;
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
