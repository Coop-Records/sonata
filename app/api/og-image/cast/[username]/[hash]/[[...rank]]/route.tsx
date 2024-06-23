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

            <p tw="text-3xl	m-0">Sonata</p>
          </div>
          <div tw="flex m-0 items-center mt-12">
            <img
              src={channelIcon}
              alt=""
              width={70}
              height={70}
              loading="lazy"
              tw="rounded-full "
            />
            <p tw="m-0 text-2xl ml-4">{channelLabel}</p>
          </div>

          <div tw="flex items-center">
            <img
              src={metadata?.artworkUrl}
              alt=""
              width={110}
              height={110}
              tw="object-cover rounded-2xl"
            />
            <div tw="flex flex-col ml-8 ">
              <p
                style={{
                  maxWidth: '200px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
                tw="text-3xl"
              >
                {metadata?.trackName}
              </p>
              <p tw="text-xl m-0 text-[#949494]">
                {replaceSpecialCharacters(metadata?.artistName)}
              </p>
            </div>
            <div tw="flex flex-col m-0 bg-[#F6F6F6] rounded-2xl w-[220px] h-[140px] items-center justify-center ml-[40px] mt-[60px] ">
              <div tw="flex items-center m-0 w-[60%]">
                <p tw="m-0 text-2xl">{points}</p>
                <img
                  src="https://i.imgur.com/Xa4LjYA.jpeg"
                  alt=""
                  width={50}
                  height={50}
                  tw="rounded-full ml-2"
                />
              </div>
              <p tw="m-0 text-lg	text-[#949494]">Notes Collected</p>
            </div>
          </div>
          <div tw="flex flex-col ">
            <p tw="text-[#949494]">Posted By</p>
            <div tw="flex">
              <div tw="flex items-center rounded-full">
                <img tw="rounded-full" src={profilePfp} alt="warpcast" width={38} height={38} />
              </div>
              {rank && (
                <div tw="flex items-center justify-center bg-[#F6F6F6] rounded-full w-[100px] ml-5">
                  <p tw="text-2xl ml-2 m-0 ">#{rank}</p>
                </div>
              )}
              <div tw="flex items-center justify-center bg-[#EEE4FE] rounded-full w-[220px] ml-5">
                <img src="https://i.imgur.com/JXN6jYv.png" alt="warpcast" width={28} height={24} />
                <p tw="text-[#8b49f7] ml-2">{encodedUsername}</p>
              </div>
            </div>
          </div>
        </div>
        <div tw="flex absolute bottom-4 left-[47%] justify-center">
          <p>sonata.tips</p>
        </div>
      </div>
    ),
  );
}
