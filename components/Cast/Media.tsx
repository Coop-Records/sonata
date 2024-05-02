import extractSoundArtistAndTrack from '@/lib/sound/extractSoundArtistAndTrack';
import getReleaseInfo from '@/lib/sound/getReleaseInfo';
import getSpotifyTrack from '@/lib/spotify/getSpotifyTrack';
import getSpotifyTrackId from '@/lib/spotify/getSpotifyTrackId';
import { formatDuration } from '@/lib/utils';
import { usePlayer } from '@/providers/PlayerProvider';
import { useSoundcloudApi } from '@/providers/SoundcloudApiProvider';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { MdPauseCircle, MdPlayCircle } from 'react-icons/md';

export default function Media({ trackUrl }: { trackUrl: string }) {
  const [player, dispatch] = usePlayer();
  const [metadata, setMetadata] = useState(null) as any;
  const { position } = player;
  const isSpotify = trackUrl?.includes('spotify');
  const isSoundCloud = trackUrl?.includes('soundcloud');
  const isSoundXyz = trackUrl?.includes('sound.xyz');
  const [iframeSrc, setIframeSrc] = useState();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const SC = useSoundcloudApi();
  const [duration, setDuration] = useState(0);
  const currentTrack = player?.metadata?.id === metadata?.id;

  const handlePlay = () => {
    dispatch({
      type: 'PAUSE',
    });
    dispatch({
      type: 'LOAD_METADATA',
      payload: {
        metadata,
      },
    });
  };

  const handlePause = () => {
    dispatch({ type: 'PAUSE' });
  };

  useEffect(() => {
    const initSoundCloud = async () => {
      const oEmbedUrl = `https://soundcloud.com/oembed?format=json&url=${encodeURIComponent(trackUrl)}`;
      const response = await fetch(oEmbedUrl);
      const data = await response.json();
      const srcRegex = /src="([^"]+)"/;
      const match = data.html.match(srcRegex);
      const src = match ? match[1] : null;
      setIframeSrc(src);
      setMetadata({
        id: trackUrl,
        type: 'soundcloud',
        artistName: data.author_name || '',
        trackName: data.title.split(' - ')[0].split(' by ')[0],
        artworkUrl: data.thumbnail_url,
        url: trackUrl,
      });
    };

    const initSpotify = async () => {
      const trackId = getSpotifyTrackId(trackUrl) as any;
      const response = await getSpotifyTrack(trackId);
      if (response?.error) return;
      setMetadata({
        id: response.uri,
        type: 'spotify',
        artistName: response.artists.map((artist: any) => artist.name).join(', '),
        trackName: response.name,
        artworkUrl: response.album.images[0].url,
        duration: response.duration_ms,
        url: trackUrl,
      });
    };

    const initSoundXyz = async () => {
      if (!trackUrl) return;
      const { artist, trackName } = extractSoundArtistAndTrack(trackUrl);
      const { mintedRelease } = await getReleaseInfo(artist, trackName);
      if (!mintedRelease) return;
      setMetadata({
        id: mintedRelease.id,
        type: 'soundxyz',
        artistName: mintedRelease.artist.name,
        trackName: mintedRelease.title,
        artworkUrl: mintedRelease.coverImage.url,
        duration: mintedRelease.track.duration * 1000,
        url: trackUrl,
      });
    };

    if (isSpotify) initSpotify();
    if (isSoundCloud) initSoundCloud();
    if (isSoundXyz) initSoundXyz();
  }, [isSpotify, isSoundXyz, isSoundCloud]);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!(iframeSrc && SC)) return;
    const widget = SC.Widget(iframe);

    widget.bind(SC.Widget.Events.READY, function () {
      widget.getDuration((duration: number) => {
        setDuration(duration);
      });
    });

    return () => {
      try {
        widget.unbind(SC.Widget.Events.PLAY);
        widget.unbind(SC.Widget.Events.PAUSE);
        widget.unbind(SC.Widget.Events.PLAY_PROGRESS);
      } catch (e) {
        console.error(e);
      }
    };
  }, [iframeSrc, SC]);

  if (!metadata) return <></>;

  return (
    <>
      <div
        data-type={metadata.type}
        className="sticky bottom-0 left-0 flex w-full flex-col gap-4 p-2 rounded-lg border"
      >
        <div className="flex gap-4">
          <div className="relative my-auto aspect-square w-16 shrink-0 shadow-md">
            <Image
              src={metadata.artworkUrl}
              alt=""
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              className="rounded-lg"
              unoptimized
            />
          </div>

          <div className="flex grow flex-col gap-1 pt-2 text-left">
            <div className="line-clamp-2 font-inter text-sm font-bold text-black">
              {metadata.trackName}
            </div>
            <div className="line-clamp-2 font-inter text-xs font-extralight text-black">
              {metadata.artistName}
            </div>
          </div>
          <div className="my-auto">
            {currentTrack && player.playing ? (
              <button onClick={handlePause}>
                <MdPauseCircle className="text-4xl text-black" />
              </button>
            ) : (
              <button onClick={handlePlay}>
                <MdPlayCircle className="text-4xl text-black" />
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex justify-between font-inter text-xs font-light text-black">
            <span>{formatDuration(position)}</span>
            <span>{formatDuration(metadata.duration || duration)}</span>
          </div>
          <div className="h-1 w-full overflow-hidden rounded-lg bg-gray-600">
            <div
              className="h-1 rounded-lg bg-white"
              style={{ width: `${(position / metadata.duration) * 100}%` }}
            />
          </div>
        </div>
      </div>
      <iframe
        className="hidden"
        width="100%"
        height="166"
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src={iframeSrc}
        ref={iframeRef}
      />
    </>
  );
}
