import getSpotifyTrackId from '@/lib/spotify/getSpotifyTrackId';
import { Cast as CastType } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import SpotifyEmbed from './SpotifyEmbed';
import SoundCloudEmbed from './SoundCloudEmbed';
import SoundXyzEmbed from './SoundXyzEmbed';

const Cast = ({ cast = {} as CastType }: { cast: CastType }) => {
  const embed = (cast?.embeds?.[0] as any)?.url;
  const isSpotify = embed?.includes?.('spotify');
  const isSoundcloud = embed?.includes?.('soundcloud');
  const isSoundxyz = embed?.includes?.('sound.xyz');
  const trackId = getSpotifyTrackId(embed);

  return (
    <div style={{ marginBottom: '20px', border: '1px solid #ddd', padding: '10px' }}>
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
        </div>
      </div>
      <div>
        {isSpotify && <SpotifyEmbed trackId={trackId as string} />}
        {isSoundcloud && <SoundCloudEmbed trackUrl={embed} />}
        {isSoundxyz && <SoundXyzEmbed url={embed} />}
      </div>
    </div>
  );
};

export default Cast;
