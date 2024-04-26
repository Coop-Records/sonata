import { useEffect, useMemo, useRef, useState } from 'react';
import { useSpotifyApi } from '@/providers/SpotifyApiProvider';
import { SpotifyPlaybackUpdateEvent } from '@/types/SpotifyPlaybackUpdateEvent';
import getSpotifyTrackId from '@/lib/spotify/getSpotifyTrackId';
import getSpotifyTrack from '@/lib/spotify/getSpotifyTrack';
import { SpotifyTrack } from '@/types/SpotifyTrack';
import MediaPlayer from '@/components/MediaPlayer';

export default function SpotifyEmbed({ trackUrl }: { trackUrl: string }) {
  const trackId = useMemo(() => getSpotifyTrackId(trackUrl), [trackUrl]);
  const [position, setPosition] = useState(0);
  const [track, setTrack] = useState<SpotifyTrack>();
  const [embedController, setEmbedController] = useState({} as any);
  const elementRef = useRef<HTMLIFrameElement>(null);
  const iframeApi = useSpotifyApi();

  useEffect(() => {
    const init = async () => {
      if (!trackId) return;
      const track = await getSpotifyTrack(trackId);
      setTrack(track);
    };

    init();
  }, [trackId]);

  useEffect(() => {
    if (!(track?.uri && iframeApi)) return;

    const options = {
      height: '10',
      width: '10',
      uri: track.uri,
    };
    iframeApi.createController(elementRef.current, options, (embedController: any) => {
      embedController.addListener('ready', () => {
        setEmbedController(embedController);
      });
      embedController.addListener('playback_update', (e: SpotifyPlaybackUpdateEvent) => {
        const data = e.data;
        setPosition(data.position);
      });
    });
  }, [track?.uri, iframeApi]);

  if (!track) return <></>;

  if (track.error) {
    console.error(track.error);
    return <></>;
  }

  return (
    <div className="w-full relative z-0">
      <MediaPlayer
        metadata={{
          id: track.uri,
          type: 'spotify',
          artistName: track.artists.map((artist: any) => artist.name).join(', '),
          trackName: track.name,
          artworkUrl: track.album.images[0].url,
          duration: track.duration_ms,
        }}
        controls={{
          play: () => embedController.play(),
          pause: () => embedController.pause(),
          seek: (time) => embedController.seek(time),
        }}
        position={position}
      />
      <div className="absolute top-0 left-0 opacity-0 -z-10">
        <div ref={elementRef} />
      </div>
    </div>
  );
}
