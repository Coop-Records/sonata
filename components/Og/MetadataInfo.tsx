import { replaceSpecialCharacters } from '@/lib/replaceSpecialCharacters';
import React from 'react';

const MetadataInfo = ({ metadata, points }: any) => (
  <div tw="flex items-center relative mt-3 ml-1">
    <img
      src={metadata?.artworkUrl}
      alt=""
      width={135}
      height={135}
      loading="lazy"
      tw="rounded-3xl"
    />
    <div tw="flex flex-col ml-6">
      <p
        style={{
          maxWidth: '340px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          fontWeight: 600,
        }}
        tw="text-4xl m-0 text-[#333536]"
      >
        {metadata?.trackName}
      </p>
      <p tw="text-[26px] m-0 text-[#949494]">{replaceSpecialCharacters(metadata?.artistName)}</p>
    </div>
    <div tw="flex flex-col m-0 bg-[#F6F6F6] rounded-2xl min-w-[200px] w-auto min-h-[140px] h-auto items-start pl-8 pr-8 pt-8 pb-10 justify-center ml-[40px] absolute left-[58%] top-5">
      <div tw="flex items-center m-0 min-w-[68%] w-auto gap-2">
        <p tw="m-1 text-4xl text-[#333536]  " style={{ fontWeight: 600 }}>
          {points}
        </p>
        <img
          src="https://i.imgur.com/Xa4LjYA.jpeg"
          alt=""
          width={50}
          height={50}
          loading="lazy"
          tw="rounded-full ml-2 w-12 h-12"
          style={{ imageRendering: 'pixelated' }}
        />
      </div>
      <p tw="m-1 text-[26px] text-[#949494]" style={{ fontWeight: 400 }}>
        Notes Collected
      </p>
    </div>
  </div>
);

export default MetadataInfo;
