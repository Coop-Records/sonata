import { OEmbedData } from '@/types/OEmbedData';
import { useEffect, useRef, useState } from 'react';

const useSpotifyIframe = (trackUrl: string) => {
  const [iframeSrc, setIframeSrc] = useState();
  const [embedData, setEmbedData] = useState<OEmbedData>();
  const [isReady, setIsReady] = useState<boolean>(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [soundcloudUrl, setSoundcloudUrl] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      const response = await fetch(`/api/songLink/fetchSoundcloudUrl?trackUrl=${trackUrl}`);
      const data = await response.json();
      const responseUrl = data?.linksByPlatform?.soundcloud?.url;
      setSoundcloudUrl(responseUrl);
    };
    init();
  }, [trackUrl]);

  const pauseMusic = () => {
    if (!(isReady || iframeRef?.current)) return;
    const spotifyEmbedWindow = iframeRef?.current?.contentWindow as any;
    spotifyEmbedWindow.postMessage({ command: 'pause' }, '*');
  };

  const playMusic = () => {
    if (!(isReady || iframeRef?.current)) return;
    const spotifyEmbedWindow = iframeRef?.current?.contentWindow as any;
    spotifyEmbedWindow.postMessage({ command: 'resume' }, '*');
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
          setIsReady(true);
          return;
        }
      }
    };
    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [iframeRef]);

  useEffect(() => {
    if (isReady) {
      playMusic();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady]);

  return {
    embedData,
    iframeRef,
    iframeSrc,
    pauseMusic,
    playMusic,
    soundcloudUrl,
  };
};

export default useSpotifyIframe;
