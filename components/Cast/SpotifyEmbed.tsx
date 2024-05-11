import { useEffect, useRef, useState } from 'react';
import MediaPlayer from '@/components/MediaPlayer';
import { OEmbedData } from '@/types/OEmbedData';
import { usePlayer } from '@/providers/PlayerProvider';
import { SupabasePost } from '@/types/SupabasePost';

export default function SpotifyEmbed({ trackUrl, cast }: { trackUrl: string; cast: SupabasePost }) {
  const [iframeSrc, setIframeSrc] = useState();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [embedData, setEmbedData] = useState<OEmbedData>();
  const [player] = usePlayer();
  const metadata = player?.metadata;
  const isTrackSelected = metadata?.id === trackUrl;

  const togglePlay = () => {
    console.log('SWEETS TRYING TO PLAY SPOTIFY');
    if (!iframeRef?.current) return;
    console.log('SWEETS IFRAME EXISTS');
    const spotifyEmbedWindow = iframeRef.current.contentWindow as any;
    console.log('SWEETS spotifyEmbedWindow', spotifyEmbedWindow);
    const response = spotifyEmbedWindow.postMessage({ command: 'toggle' }, '*');
    console.log('SWEETS TOGGLE POSTED', response);
  };

  useEffect(() => {
    const init = async () => {
      try {
        const oEmbedUrl = `https://open.spotify.com/oembed?url=${encodeURIComponent(trackUrl)}`;
        const response = await fetch(oEmbedUrl);
        const data = await response.json();
        const srcRegex = /src="([^"]+)"/;
        const match = data.html.match(srcRegex);
        const src = match ? match[1] : null;
        setIframeSrc(src);
        setEmbedData(data);
        // eslint-disable-next-line no-empty
      } catch (error) {}
    };
    init();
  }, [trackUrl]);

  useEffect(() => {
    const handleMessage = (event: any) => {
      if (
        event.origin === 'https://open.spotify.com' &&
        iframeRef.current &&
        event.source === iframeRef.current.contentWindow
      ) {
        const { type } = event.data;
        if (type === 'ready') {
          togglePlay();
        }
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [iframeRef]);

  if (!embedData) return <></>;

  return (
    <div className="relative z-0 w-full">
      <MediaPlayer
        metadata={
          embedData && {
            id: trackUrl,
            type: 'spotify',
            artistName: '',
            trackName: embedData.title,
            artworkUrl: embedData.thumbnail_url,
            duration: 0,
          }
        }
        controls={{
          play: togglePlay,
          pause: togglePlay,
          seek: () => {},
        }}
        position={0}
        cast={cast}
      />
      {isTrackSelected && (
        <iframe
          className="hidden"
          width="100%"
          height="166"
          allow="autoplay"
          src={iframeSrc}
          ref={iframeRef}
          id={trackUrl}
        />
      )}
    </div>
  );
}
