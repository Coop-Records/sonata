import isValidUrl from '@/lib/isValidUrl';
import { useEffect, useState } from 'react';

export default function useSongAlternatives(songLink: string) {
  const [alternatives, setAlternative] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (!isValidUrl(songLink)) return;

    (async () => {
      const response = await fetch(
        `/api/songLink/fetchLink?trackUrl=${encodeURIComponent(songLink)}`,
      );
      if (!response.ok) return;
      const data = await response.json();
      if (!data) return;

      setAlternative(() => {
        const platforms: any = {};
        for (const [name, value] of Object.entries<any>(data.linksByPlatform)) {
          if (!['spotify', 'youtube', 'soundcloud'].includes(name)) continue;
          platforms[name] = value.url;
        }

        return platforms;
      });
    })();
  }, [songLink]);

  return { alternatives };
}
