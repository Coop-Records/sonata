import getSpotifyTrackId from '@/lib/spotify/getSpotifyTrackId';
import { Cast } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import React from 'react';
import SoundCloudEmbed from './SoundCloudEmbed';

const Feed = ({ feed }: any) => (
  <div>
    {feed.map((cast: Cast, index: number) => (
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
          const isSpotify = embed.url.includes('spotify');
          const isSoundcloud = embed.url.includes('soundcloud');
          const trackId = getSpotifyTrackId(embed.url);
          if (!trackId && !isSoundcloud) return null;
          return (
            <div>
              {isSpotify && (
                <iframe
                  style={{ borderRadius: '12px' }}
                  src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator`}
                  width="100%"
                  height="100%"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              )}
              {isSoundcloud && <SoundCloudEmbed trackUrl={embed.url} />}
            </div>
          );
        })}
      </div>
    ))}
  </div>
);

export default Feed;
