import SpotifyEmbed from './SpotifyEmbed';
import SoundCloudEmbed from './SoundCloudEmbed';
import SoundXyzEmbed from './SoundXyzEmbed';

const PlayButton = ({ url }: { url: string }) => {
  const isSpotify = url?.includes?.('spotify');
  const isSoundcloud = url?.includes?.('soundcloud');
  const isSoundxyz = url?.includes?.('sound.xyz');

  return (
    <div className="flex flex-col w-full justify-center items-center">
      {isSpotify && <SpotifyEmbed trackUrl={url} />}
      {isSoundcloud && <SoundCloudEmbed trackUrl={url} />}
      {isSoundxyz && <SoundXyzEmbed url={url} />}
    </div>
  );
};

export default PlayButton;
