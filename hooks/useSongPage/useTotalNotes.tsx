import { useState, useEffect } from 'react';

const useTotalNotes = (songLink: string) => {
  const [totalNotes, setTotalNotes] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (!songLink) return;

    const fetchTotalNotes = async () => {
      try {
        const response = await fetch(`/api/song/market?songLink=${encodeURIComponent(songLink)}`);
        if (!response.ok) {
          throw new Error('Failed to fetch total notes');
        }
        const data = await response.json();
        setTotalNotes(data.totalNotes);
      } catch (error) {
        console.error('Error fetching total notes:', error);
        setTotalNotes(undefined);
      }
    };

    fetchTotalNotes();
  }, [songLink]);

  return { totalNotes };
};

export default useTotalNotes;
