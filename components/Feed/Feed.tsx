import React from 'react';
import Cast from '../Cast';

const Feed = ({ feed }: any) => (
  <div>
    {feed.map((cast: Cast, index: number) => (
      <Cast key={index} cast={cast} />
    ))}
  </div>
);

export default Feed;
