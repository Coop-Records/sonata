import { useEffect, useRef, useState } from 'react';
import MediaPlayer from '@/components/MediaPlayer';
import { OEmbedData } from '@/types/OEmbedData';
import { usePlayer } from '@/providers/PlayerProvider';
import { SupabasePost } from '@/types/SupabasePost';
import { useFeedProvider } from '@/providers/FeedProvider';

export default function SpotifyEmbed({ trackUrl, cast }: { trackUrl: string; cast: SupabasePost }) {
  const [iframeSrc, setIframeSrc] = useState();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [embedData, setEmbedData] = useState<OEmbedData>();
  const [player] = usePlayer();
  const metadata = player?.metadata;
  const { setActiveFeed } = useFeedProvider();

  const togglePlay = () => {
    if (!iframeRef?.current) return;
    const spotifyEmbedWindow = iframeRef.current.contentWindow as any;
    spotifyEmbedWindow.postMessage({ command: 'toggle' }, '*');
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
    if (!iframeRef.current || !iframeSrc) return;
    iframeRef.current.addEventListener('load', () => {
      setActiveFeed(cast);
      togglePlay();
    });
  }, [iframeRef?.current, iframeSrc]);

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
      {metadata?.id === trackUrl && (
        <iframe
          className="hidden"
          width="100%"
          height="166"
          scrolling="no"
          frameBorder="no"
          allow="autoplay"
          src={iframeSrc}
          ref={iframeRef}
          id={trackUrl}
        />
      )}
    </div>
  );
}
