import getSpotifyTrackId from '@/lib/spotify/getSpotifyTrackId';
import SpotifyEmbed from './SpotifyEmbed';
import SoundCloudEmbed from './SoundCloudEmbed';
import SoundXyzEmbed from './SoundXyzEmbed';

const PlayButton = ({ embed }: { embed: string }) => {
  const isSpotify = embed?.includes?.('spotify');
  const isSoundcloud = embed?.includes?.('soundcloud');
  const isSoundxyz = embed?.includes?.('sound.xyz');
  const trackId = getSpotifyTrackId(embed);

  return (
    <div className="flex flex-col w-full justify-center items-center">
      {isSpotify && <SpotifyEmbed trackId={trackId as string} />}
      {isSoundcloud && <SoundCloudEmbed trackUrl={embed} />}
      {isSoundxyz && <SoundXyzEmbed url={embed} />}
    </div>
  );
};

export default PlayButton;
