import CastImageLayout from '@/components/Og/CastImageLayout';
import { getDataForCastOg } from '@/lib/getDataForCastOg';
import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(
  req: NextRequest,
  { params }: { params: { username: string; hash: string; rank: string } },
) {
  const { username, hash, rank } = params;

  const {
    encodedUsername,
    profilePfp,
    metadata,
    channelLabel,
    channelIcon,
    points,
    soraSemiBold,
    soraNormal,
  }: any = await getDataForCastOg(username, hash);

  return new ImageResponse(
    (
      <CastImageLayout
        encodedUsername={encodedUsername}
        profilePfp={profilePfp}
        metadata={metadata}
        channelLabel={channelLabel}
        channelIcon={channelIcon}
        points={points}
        rank={rank}
      />
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Sora',
          data: await soraNormal,
          weight: 400,
        },
        {
          name: 'Sora',
          data: await soraSemiBold,
          weight: 600,
        },
      ],
      headers: {
        'Cache-Control': 'no-cache, no-store, max-age=0',
        'CDN-Cache-Control': 'max-age=0',
      },
    },
  );
}
