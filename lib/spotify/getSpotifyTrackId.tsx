const getSpotifyTrackId = (url: string) => {
  // This assumes the URL follows the pattern ".../track/{trackId}?..."
  const match = url.match(/track\/([^?]+)/);
  return match ? match[1] : '';
};

export default getSpotifyTrackId;
