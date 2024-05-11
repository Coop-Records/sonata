import { useEffect, useRef, useState } from 'react';

const useSpotifyController = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [embedController, setEmbedController] = useState<any>(null);

  const togglePlay = () => {
    console.log('SWEETS PLAY WITH CONTROLLER');
    embedController.play();
  };

  const pauseMusic = () => {
    console.log('SWEETS PLAY WITH CONTROLLER');
    embedController.pause();
  };

  const playMusic = () => {
    embedController.play();
  };

  useEffect(() => {
    // Function to initialize the API
    const initializeSpotifyAPI = () => {
      (window as any).onSpotifyIframeApiReady = (IFrameAPI: any) => {
        console.log('SWEETS API to CONTROLLER', IFrameAPI);
        if (iframeRef.current) {
          const options = { uri: 'spotify:episode:7makk4oTQel546B0PZlDM5' };
          const callback = (EmbedController: any) => {
            console.log('SWEETS USE EMBED CONTROLLER!!!+++!!!', EmbedController);
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
      script.src = 'https://open.spotify.com/embed/iframe-api/v1';
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
  }, []); // Empty dependency array to ensure it runs once

  return { embedController, iframeRef, togglePlay, pauseMusic, playMusic };
};

export default useSpotifyController;
