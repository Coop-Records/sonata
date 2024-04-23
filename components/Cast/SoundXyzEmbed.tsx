import extractSoundArtistAndTrack from '@/lib/sound/extractSoundArtistAndTrack';
import getReleaseInfo from '@/lib/sound/getReleaseInfo';
import { useEffect, useState } from 'react';
import MediaPlayer from '@/components/MediaPlayer';

const SoundXyzEmbed = ({ url }: { url: string }) => {
  const [releaseInfo, setReleaseInfo] = useState<any>({});
  const [audio, setAudio] = useState<HTMLAudioElement>();
  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const init = async () => {
      if (!url) return;
      const { artist, trackName } = extractSoundArtistAndTrack(url);
      const { mintedRelease } = await getReleaseInfo(artist, trackName);
      if (!mintedRelease) return;
      setReleaseInfo(mintedRelease);
    };
    init();
  }, [url]);

  useEffect(() => {
    if (!releaseInfo?.id) return;
    const src = releaseInfo.track.audio.audioOriginal.url;
    const audio = new Audio(src);
    audio.onplaying = () => setPlaying(true);
    audio.onpause = () => setPlaying(false);
    audio.ontimeupdate = (e) => setPosition(audio.currentTime * 1000);
    setAudio(audio);
  }, [releaseInfo?.id]);

  if (!(releaseInfo && audio)) return <></>;

  return (
    <MediaPlayer
      artistName={releaseInfo.artist.name}
      trackName={releaseInfo.title}
      artworkUrl={releaseInfo.coverImage.url}
      duration={releaseInfo.track.duration * 1000}
      onPlay={() => {
        audio.play();
      }}
      onPause={() => {
        audio.pause();
      }}
      playing={playing}
      position={position}
    />
  );
};

export default SoundXyzEmbed;
