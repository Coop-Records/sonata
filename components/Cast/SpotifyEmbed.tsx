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
  const [duration, setDuration] = useState(0);
  const [track, setTrack] = useState<SpotifyTrack>();
  const [embedController, setEmbedController] = useState({} as any);
  const elementRef = useRef<HTMLIFrameElement>(null);
  const iframeApi = useSpotifyApi();

  useEffect(() => {
    const init = async () => {
      if (!trackId) return;
      const track = await getSpotifyTrack(trackId);
      setTrack(track);
      setDuration(track.duration_ms);
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
        setDuration(data.duration);
      });
    });
  }, [track?.uri, iframeApi]);

  if (track?.error) {
    console.error(track.error);
    return <></>;
  }

  return (
    <div className="relative z-0 w-full">
      <MediaPlayer
        metadata={
          track && {
            id: track.uri,
            type: 'spotify',
            artistName: track.artists.map((artist: any) => artist.name).join(', '),
            trackName: track.name,
            artworkUrl: track.album.images[0].url,
            duration,
          }
        }
        controls={{
          play: () => embedController.togglePlay(),
          pause: () => embedController.pause(),
          seek: (time) => embedController.seek(time),
        }}
        position={position}
      />
      <div className="absolute left-0 top-0 -z-10 opacity-0">
        <div ref={elementRef} />
      </div>
    </div>
  );
}
