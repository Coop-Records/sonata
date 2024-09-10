import { useState, useEffect } from 'react';

const useSongMarket = (songLink: string) => {
  const [songMarket, setSongMarket] = useState<any>({});

  useEffect(() => {
    if (!songLink) return;

    const fetchTotalNotes = async () => {
      try {
        const response = await fetch(`/api/song/market?songLink=${encodeURIComponent(songLink)}`);
        if (!response.ok) {
          throw new Error('Failed to fetch total notes');
        }
        const data = await response.json();
        setSongMarket(data);
      } catch (error) {
        console.error('Error fetching total notes:', error);
        setSongMarket({});
      }
    };

    fetchTotalNotes();
  }, [songLink]);

  const { totalNotes, songLinks, collection } = songMarket;
  return { totalNotes, songLinks, collection };
};

export default useSongMarket;
