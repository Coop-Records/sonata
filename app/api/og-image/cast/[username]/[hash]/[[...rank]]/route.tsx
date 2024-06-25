import getUserByUsername from '@/lib/neynar/getNeynarUserByUsername';
import {
  getEmbedAndMetadata,
  getChannelData,
  formatPoints,
  replaceSpecialCharacters,
} from '@/lib/utils';
import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(
  req: NextRequest,
  { params }: { params: { username: string; hash: string; rank: string } },
) {
  const { username, hash, rank } = params;

  const encodedUsername = replaceSpecialCharacters(username);

  const userProfile = await getUserByUsername(username);
  const profilePfp = userProfile?.pfp?.url;

  const { cast, metadata } = await getEmbedAndMetadata(hash);
  const channelData = getChannelData(cast?.channelId);

  const channelLabel = channelData?.label || '/sonata';
  const channelIcon = channelData?.icon || 'https://i.imgur.com/Xa4LjYA.jpeg';

  const points = formatPoints(cast?.points);

  const soraSemiBold = fetch(new URL('/public/Sora-SemiBold.ttf', import.meta.url)).then((res) =>
    res.arrayBuffer(),
  );

  const soraNormal = fetch(new URL('/public/Sora-Regular.ttf', import.meta.url)).then((res) =>
    res.arrayBuffer(),
  );

  return new ImageResponse(
    (
      <div
        style={{
          background: '#fff',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '20px',
          border: '1px solid #eaeaea',
        }}
      >
        <div tw="flex flex-col ml-[50px]">
          <div tw="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.0"
              width="32.000000pt"
              height="32.000000pt"
              viewBox="0 0 371.000000 354.000000"
              preserveAspectRatio="xMidYMid meet"
            >
              <g
                transform="translate(0.000000,354.000000) scale(0.100000,-0.100000)"
                fill="#000000"
                stroke="none"
              >
                <path d="M1655 3093 c-167 -21 -348 -81 -499 -164 -133 -74 -206 -128 -312 -235 -212 -213 -340 -474 -385 -783 -18 -125 -6 -359 25 -491 128 -557 556 -950 1131 -1041 118 -19 351 -16 460 5 251 48 467 148 660 306 85 69 135 123 207 221 203 277 290 578 267 919 -17 244 -85 441 -226 655 -175 264 -396 437 -690 539 -159 55 -292 76 -463 74 -80 0 -158 -3 -175 -5z m733 -440 c-3 -156 -5 -172 -29 -223 -73 -155 -225 -224 -579 -264 -102 -12 -105 -13 -102 -36 5 -43 46 -111 120 -198 264 -313 307 -377 337 -504 19 -79 19 -213 1 -300 -23 -105 -61 -175 -140 -254 -114 -113 -244 -165 -417 -165 -148 0 -251 41 -333 131 -64 71 -81 120 -81 235 0 93 2 105 33 167 62 126 200 220 375 254 72 14 100 15 155 7 139 -22 241 -83 302 -180 15 -23 30 -40 34 -36 13 13 5 113 -14 174 -26 86 -70 149 -233 338 -76 88 -153 186 -172 217 l-35 58 1 160 c1 175 8 208 53 256 43 46 76 59 230 91 281 58 385 109 416 204 10 31 15 35 47 35 l35 0 -4 -167z" />
              </g>
            </svg>

            <p tw="text-2xl	m-0 ml-2 text-[#333536]" style={{ fontWeight: 600 }}>
              Sonata
            </p>
          </div>
          <div tw="flex m-0 items-center mt-10">
            <img
              src={channelIcon}
              alt="channel Icon"
              width="40"
              height="40"
              loading="lazy"
              tw="rounded-full  w-14 h-14 "
              style={{ imageRendering: 'pixelated' }}
            />
            <p tw="m-0 text-2xl ml-2 text-[#333536]" style={{ fontWeight: 600 }}>
              {channelLabel}
            </p>
          </div>

          <div tw="flex items-center relative mt-3 ml-1">
            <img
              src={metadata?.artworkUrl}
              alt=""
              width={120}
              height={120}
              loading="lazy"
              tw="rounded-2xl"
            />
            <div tw="flex flex-col ml-6">
              <p
                style={{
                  maxWidth: '220px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  fontWeight: 600,
                }}
                tw="text-3xl m-0 text-[#333536]  "
              >
                {metadata?.trackName}
              </p>
              <p tw="text-xl m-0 text-[#949494]">
                {replaceSpecialCharacters(metadata?.artistName)}
              </p>
            </div>
            <div tw="flex flex-col m-0 bg-[#F6F6F6] rounded-2xl w-[240px] h-[145px] items-center justify-center ml-[40px] absolute left-1/3 top-5 ">
              <div tw="flex items-center m-0 w-[68%]">
                <p tw="m-0 text-4xl text-[#333536]" style={{ fontWeight: 600 }}>
                  {points}
                </p>
                <img
                  src="https://i.imgur.com/Xa4LjYA.jpeg"
                  alt=""
                  width={100}
                  height={100}
                  loading="lazy"
                  tw="rounded-full ml-2 w-16 h-16"
                  style={{ imageRendering: 'pixelated' }}
                />
              </div>
              <p tw="m-0 text-xl text-[#949494]" style={{ fontWeight: 400 }}>
                Notes Collected
              </p>
            </div>
          </div>
          <div tw="flex flex-col mt-10 ml-1 ">
            <p tw="text-[#949494] text-xl" style={{ fontWeight: 400 }}>
              Posted By
            </p>
            <div tw="flex">
              <div tw="flex items-center rounded-full">
                <img
                  tw="rounded-full"
                  src={profilePfp}
                  alt="warpcast"
                  width={50}
                  height={50}
                  loading="lazy"
                />
              </div>
              {rank && (
                <div tw="flex items-center justify-center bg-[#F6F6F6] rounded-full w-[100px] ml-5">
                  <p tw="text-xl ml-2 m-0 text-[#333536] " style={{ fontWeight: 600 }}>
                    #{rank}
                  </p>
                </div>
              )}
              <div tw="flex items-center justify-center bg-[#EEE4FE] rounded-full max-w-[220px] w-fit px-5 h-12 ml-5">
                <img
                  src="https://i.imgur.com/JXN6jYv.png"
                  alt="warpcast"
                  width={28}
                  height={24}
                  loading="lazy"
                />
                <p tw="text-[#8b49f7] text-xl ml-2" style={{ fontWeight: 600 }}>
                  {encodedUsername}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div tw="flex absolute bottom-4 left-[47%] justify-center">
          <p tw="text-[12px]" style={{ fontWeight: 400 }}>
            sonata.tips
          </p>
        </div>
      </div>
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
    },
  );
}
