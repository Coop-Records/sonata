import getSpotifyTrackId from '@/lib/spotify/getSpotifyTrackId';
import { Cast } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import React from 'react';

const Feed = ({ feed }: any) => (
  <div>
    {feed.casts.map((cast: Cast, index: number) => (
      <div key={index} style={{ marginBottom: '20px', border: '1px solid #ddd', padding: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <img
            src={cast.author.pfp_url}
            alt="profile"
            style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }}
          />
          <div>
            <div>
              <strong>{cast.author.display_name}</strong>
            </div>
            <div>{new Date(cast.timestamp).toLocaleString()}</div>
          </div>
        </div>
        <div style={{ marginBottom: '10px' }}>{cast.text}</div>
        {cast.embeds.map((embed: any) => {
          const trackId = getSpotifyTrackId(embed.url);
          if (!trackId) return null;
          console.log('SWEETS TRACK ID', trackId);
          return (
            <iframe
              style={{ borderRadius: '12px' }}
              src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator`}
              width="100%"
              height="100%"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          );
        })}
      </div>
    ))}
  </div>
);

export default Feed;
