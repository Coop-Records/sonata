import extractSoundArtistAndTrack from '@/lib/sound/extractSoundArtistAndTrack';
import getReleaseInfo from '@/lib/sound/getReleaseInfo';
import getSpotifyTrack from '@/lib/spotify/getSpotifyTrack';
import getSpotifyTrackId from '@/lib/spotify/getSpotifyTrackId';
import { usePlayer } from '@/providers/PlayerProvider';
import { useSoundcloudApi } from '@/providers/SoundcloudApiProvider';
import { useEffect, useRef, useState } from 'react';

const useMedia = ({ trackUrl }: { trackUrl: string }) => {
  const [metadata, setMetadata] = useState(null) as any;
  const isSpotify = trackUrl?.includes('spotify');
  const isSoundCloud = trackUrl?.includes('soundcloud');
  const isSoundXyz = trackUrl?.includes('sound.xyz');
  const [iframeSrc, setIframeSrc] = useState();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const SC = useSoundcloudApi();
  const [duration, setDuration] = useState(0);
  const [_, dispatch] = usePlayer();

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

  return {
    metadata,
    duration,
    handlePause,
    handlePlay,
    iframeRef,
    iframeSrc,
  };
};

export default useMedia;
