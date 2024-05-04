import { useEffect, useRef, useState } from 'react';
import { SpotifyPlaybackUpdateEvent } from '@/types/SpotifyPlaybackUpdateEvent';
import MediaPlayer from '@/components/MediaPlayer';
import { useSpotifyApi } from '@/providers/SpotifyApiProvider';

export default function SpotifyEmbed({ trackUrl }: { trackUrl: string }) {
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [iframeSrc, setIframeSrc] = useState('');
  const elementRef = useRef<HTMLIFrameElement>(null);
  const [embedController, setEmbedController] = useState({} as any);
  const iframeApi = useSpotifyApi(); // Assumed to provide an API similar to the Soundcloud API's Widget

  useEffect(() => {
    const fetchOEmbedData = async () => {
      const oEmbedUrl = `https://open.spotify.com/oembed?format=json&url=${encodeURIComponent(trackUrl)}`;
      const response = await fetch(oEmbedUrl);
      const data = await response.json();
      const srcRegex = /src="([^"]+)"/;
      const match = data.html.match(srcRegex);
      setIframeSrc(match ? match[1] : '');
    };

    fetchOEmbedData();
  }, [trackUrl]);

  useEffect(() => {
    if (!(iframeSrc && iframeApi)) return;
    // console.log('SWEETS iframeSrc', iframeSrc);
    // console.log('SWEETS iframeApi', iframeApi);

    const options = {
      height: '10',
      width: '10',
      uri: trackUrl,
    };

    const controller = iframeApi.createController(
      elementRef.current,
      options,
      (controller: any) => {
        controller.addListener('ready', () => {
          console.log('SWEETS controller', controller);
          setEmbedController(controller);
        });
        controller.addListener('playback_update', (e: SpotifyPlaybackUpdateEvent) => {
          setPosition(e.data.position);
          setDuration(e.data.duration);
        });
      },
    );

    setEmbedController(controller);
  }, [iframeSrc, iframeApi]);

  const fullLoadedEmbed =
    typeof embedController.togglePlay === 'function' &&
    typeof embedController.pause === 'function' &&
    typeof embedController.seek === 'function';

  return (
    <div className="relative z-0 w-full">
      <MediaPlayer
        metadata={{
          id: trackUrl,
          type: 'spotify',
          artistName: 'Unknown', // Placeholder, update accordingly
          trackName: 'Unknown', // Placeholder, update accordingly
          artworkUrl: '', // Placeholder, update accordingly
          duration,
        }}
        controls={
          fullLoadedEmbed
            ? {
                play: () => embedController.togglePlay(),
                pause: () => embedController.pause(),
                seek: (time) => embedController.seek(time),
              }
            : null
        }
        position={position}
      />
      <iframe
        className="absolute left-0 top-0 -z-10 opacity-0"
        ref={elementRef}
        src={iframeSrc}
        allow="autoplay; encrypted-media"
        width="300"
        height="380"
        frameBorder="0"
      ></iframe>
    </div>
  );
}
