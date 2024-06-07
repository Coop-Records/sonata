const getSongLinksFromCasts = async (casts: any[]) => {
  try {
    const spotifyLinks = casts
      .map((cast) => {
        const match = cast.text.match(/https:\/\/open\.spotify\.com\/track\/[a-zA-Z0-9?=._-]+/);
        return match ? match[0] : null;
      })
      .filter((link) => link !== null);
    const songLinks = await Promise.all(
      spotifyLinks.map(async (trackUrl) => {
        const response = await fetch(
          `http://localhost:3000/api/songLink/fetchSoundcloudUrl?trackUrl=${encodeURIComponent(trackUrl)}`,
        );
        const data = await response.json();
        return data;
      }),
    );
    return songLinks;
  } catch (error) {
    console.error('Error fetching Soundcloud URLs:', error);
    return [];
  }
};

export default getSongLinksFromCasts;
