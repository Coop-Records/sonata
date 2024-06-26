import { replaceSpecialCharacters } from '@/lib/replaceSpecialCharacters';
import React from 'react';

const MetadataInfo = ({ metadata, points }: any) => (
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
        tw="text-3xl m-0 text-[#333536]"
      >
        {metadata?.trackName}
      </p>
      <p tw="text-xl m-0 text-[#949494]">{replaceSpecialCharacters(metadata?.artistName)}</p>
    </div>
    <div tw="flex flex-col m-0 bg-[#F6F6F6] rounded-2xl w-[240px] h-[145px] items-center justify-center ml-[40px] absolute left-1/3 top-5">
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
);

export default MetadataInfo;
