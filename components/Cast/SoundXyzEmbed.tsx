import extractSoundArtistAndTrack from '@/lib/sound/extractSoundArtistAndTrack';
import getReleaseInfo from '@/lib/sound/getReleaseInfo';
import { useEffect, useState } from 'react';
import MediaPlayer from '@/components/MediaPlayer';

const SoundXyzEmbed = ({ trackUrl }: { trackUrl: string }) => {
  const [releaseInfo, setReleaseInfo] = useState<any>({});
  const [audio, setAudio] = useState<HTMLAudioElement>();
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const init = async () => {
      if (!trackUrl) return;
      const { artist, trackName } = extractSoundArtistAndTrack(trackUrl);
      const { mintedRelease } = await getReleaseInfo(artist, trackName);
      if (!mintedRelease) return;
      setReleaseInfo(mintedRelease);
    };
    init();
  }, [trackUrl]);

  useEffect(() => {
    if (!releaseInfo?.id) return;

    const src = releaseInfo.track.audio.audioOriginal.url;
    const audio = new Audio(src);
    audio.preload = 'none';
    audio.ontimeupdate = () => setPosition(audio.currentTime * 1000);
    setAudio(audio);
  }, [releaseInfo?.id]);

  if (!(releaseInfo && audio)) return <></>;

  return (
    <MediaPlayer
      metadata={{
        id: releaseInfo.id,
        type: 'soundxyz',
        artistName: releaseInfo.artist.name,
        trackName: releaseInfo.title,
        artworkUrl: releaseInfo.coverImage.url,
        duration: releaseInfo.track.duration * 1000,
      }}
      controls={{
        play: () => audio.play(),
        pause: () => audio.pause(),
        seek: (time: number) => {
          audio.currentTime = time / 1000;
        },
      }}
      position={position}
    />
  );
};

export default SoundXyzEmbed;
