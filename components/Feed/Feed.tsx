import React from 'react';
import Cast from '../Cast';
import { Cast as CastType } from '@neynar/nodejs-sdk/build/neynar-api/v2';

const Feed = ({ feed }: any) => (
  <div className="max-w-[333px] md:max-w-[444px]">
    {feed.map((cast: CastType) => (
      <Cast key={cast.hash} cast={cast} />
    ))}
  </div>
);

export default Feed;
