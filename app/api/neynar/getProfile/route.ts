import getUserByUsername from '@/lib/neynar/getNeynarUserByUsername';
import { NextRequest, NextResponse } from 'next/server';

const getResponse = async (req: NextRequest): Promise<NextResponse> => {
  const url = req.nextUrl; 
  const username = url.searchParams.get('username');
  
  if (!username) return NextResponse.json({message: "invalid param."}, { status: 500 });

  try {
    const profile = await getUserByUsername(username)
    return NextResponse.json(profile, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ errors: 'Something went wrong' }, { status: 400 });
  }
};

export async function GET(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
