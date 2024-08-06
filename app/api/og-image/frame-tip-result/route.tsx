import FrameTipResponse from '@/components/Og/FrameTipResponse';
import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const sender = req.nextUrl.searchParams.get('sender');
  const receiver = req.nextUrl.searchParams.get('receiver');
  const tipAmount = req.nextUrl.searchParams.get('tipAmount');
  const daily = req.nextUrl.searchParams.get('dailyAllowance');
  const remaining = req.nextUrl.searchParams.get('remainingAllowance');

  if (
    !sender ||
    !receiver ||
    !tipAmount ||
    !daily ||
    !remaining
  ) return Response.json({ message: 'missing required fields' }, { status: 400 });

  return new ImageResponse(
    (
      <FrameTipResponse
        tipAmount={tipAmount}
        daily={daily}
        remaining={remaining}
        receiver={receiver}
        sender={sender}
      />
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
