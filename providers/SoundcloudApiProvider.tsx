import Script from 'next/script';
import { createContext, useContext, useState } from 'react';

const soundcloudApiContext = createContext(null);

export function SoundcloudApiProvider({ children }: { children: React.ReactNode }) {
  const [soundcloudApi, setSoundcloudApi] = useState(null);
  return (
    <soundcloudApiContext.Provider value={soundcloudApi}>
      <Script
        src="https://w.soundcloud.com/player/api.js"
        async
        onLoad={() => {
          setSoundcloudApi((window as any).SC);
        }}
      />
      {children}
    </soundcloudApiContext.Provider>
  );
}

export const useSoundcloudApi = () => useContext(soundcloudApiContext) as any;
