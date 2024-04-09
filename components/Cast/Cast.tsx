import getSpotifyTrackId from '@/lib/spotify/getSpotifyTrackId';
import { Cast as CastType } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import SpotifyEmbed from './SpotifyEmbed';
import SoundCloudEmbed from './SoundCloudEmbed';
import SoundXyzEmbed from './SoundXyzEmbed';
import AuthorDetails from './AuthorDetails';

const Cast = ({ cast = {} as CastType }: { cast: CastType }) => {
  const embed = (cast?.embeds?.[0] as any)?.url;
  const isSpotify = embed?.includes?.('spotify');
  const isSoundcloud = embed?.includes?.('soundcloud');
  const isSoundxyz = embed?.includes?.('sound.xyz');
  const trackId = getSpotifyTrackId(embed);

  return (
    <div className="flex flex-col gap-3 mb-[20px] border border-500-[#ddd] p-[10px]">
      <AuthorDetails pfpUrl={cast.author.pfp_url} displayName={cast.author.display_name} />
      <div className="flex flex-col justify-center items-center">
        {isSpotify && <SpotifyEmbed trackId={trackId as string} />}
        {isSoundcloud && <SoundCloudEmbed trackUrl={embed} />}
        {isSoundxyz && <SoundXyzEmbed url={embed} />}
      </div>
    </div>
  );
};

export default Cast;
