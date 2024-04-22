import React from 'react';
import Cast from '../Cast';
import { Cast as CastType } from '@/types/Cast';

export default function Feed({ feed }: any) {
  return (
    <div className="max-w-[333px] md:max-w-[444px]">
      {feed && feed.length && feed.map((cast: CastType) => <Cast key={cast.hash} cast={cast} />)}
    </div>
  );
}
