import SpotifyEmbed from './SpotifyEmbed';
import SoundCloudEmbed from './SoundCloudEmbed';
import SoundXyzEmbed from './SoundXyzEmbed';

const PlayButton = ({ embed }: { embed: string }) => {
  const isSpotify = embed?.includes?.('spotify');
  const isSoundcloud = embed?.includes?.('soundcloud');
  const isSoundxyz = embed?.includes?.('sound.xyz');

  return (
    <div className="flex flex-col w-full justify-center items-center">
      {isSpotify && <SpotifyEmbed trackUrl={embed} />}
      {isSoundcloud && <SoundCloudEmbed trackUrl={embed} />}
      {isSoundxyz && <SoundXyzEmbed url={embed} />}
    </div>
  );
};

export default PlayButton;
