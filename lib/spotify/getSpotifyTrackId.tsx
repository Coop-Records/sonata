const getSpotifyTrackId = (url: string) => {
  if (!url) return;
  // This assumes the URL follows the pattern ".../track/{trackId}?..."
  const match = url.match(/track\/([^?]+)/);
  return match ? match[1] : null;
};

export default getSpotifyTrackId;
