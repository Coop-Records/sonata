import { useSoundcloudApi } from '@/providers/SoundcloudApiProvider';
import { OEmbedData } from '@/types/OEmbedData';
import { useEffect, useRef, useState } from 'react';

const useSpotifyIframe = (trackUrl: string) => {
  const [iframeSrc, setIframeSrc] = useState();
  const [embedData, setEmbedData] = useState<OEmbedData>();
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [embedController, setEmbedController] = useState<any>(null);
  const [soundcloudUrl, setSoundcloudUrl] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      console.log('SWEETS SONG LINK for trackUrl', trackUrl);
      const response = await fetch(
        `https://api.song.link/v1-alpha.1/links?url=${trackUrl}&userCountry=US&songIfSingle=true`,
      );
      const data = await response.json();
      const responseUrl = data?.linksByPlatform?.soundcloud?.url;
      console.log('SWEETS SONG LINK', responseUrl);
      setSoundcloudUrl(responseUrl);
    };
    init();
  }, [trackUrl]);

  const togglePlay = () => {
    console.log('SWEETS PLAY WITH CONTROLLER', embedController);
    embedController.play();
  };

  const pauseMusic = () => {
    console.log('SWEETS PAUSE WITH CONTROLLER', embedController);

    embedController.pause();
  };

  const playMusic = () => {
    console.log('SWEETS PLAY WITH CONTROLLER', embedController);

    embedController.play();
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
        console.log('Sweets event.data', event.data);

        if (type === 'ready') {
          setIsReady(true);
          console.log('Sweets isREADY!!!+++!!!');

          return;
        }
        if (type === 'playback_update') {
          const { isPaused: response } = event.data.payload;
          console.log('Sweets isPaused?', response);
          setIsPlaying(!response);
        }
      }
    };

    console.log('SWEETS ADDED LISTENER FOR MESSAGES FROM IFRAME');
    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [iframeRef]);

  useEffect(() => {
    // Function to initialize the API
    const initializeSpotifyAPI = () => {
      (window as any).onSpotifyIframeApiReady = (IFrameAPI: any) => {
        if (iframeRef.current) {
          const options = { uri: 'spotify:track:7fzHQizxTqy8wTXwlrgPQQ' };
          const callback = (EmbedController: any) => {
            console.log('SWEETS EmbedController', EmbedController);
            setEmbedController(EmbedController);
          };
          IFrameAPI.createController(iframeRef.current, options, callback);
        }
      };
    };

    // Check if the Spotify script is already loaded
    const existingScript = document.getElementById('spotify-iframe-api');
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'spotify-iframe-api';
      script.src = 'https://sdk.scdn.co/spotify-player.js';
      script.onload = initializeSpotifyAPI; // Initialize API once the script is loaded
      document.body.appendChild(script);
    } else {
      // Initialize immediately if the script is already there
      initializeSpotifyAPI();
    }

    return () => {
      // Optional cleanup if needed
      const scriptToRemove = document.getElementById('spotify-iframe-api');
      if (scriptToRemove) {
        document.body.removeChild(scriptToRemove);
      }
    };
  }, []);

  return {
    embedController,
    embedData,
    iframeRef,
    iframeSrc,
    togglePlay,
    pauseMusic,
    playMusic,
    soundcloudUrl,
  };
};

export default useSpotifyIframe;
