const extractSoundArtistAndTrack = (soundUrl: string) => {
  const parts = soundUrl.split('/').filter((part) => part !== '');
  let artist = parts[3];
  let track = parts[4]?.split('?')[0];

  if (!track) {
    artist = parts[2];
    track = parts[3];
  }
  track = track?.split?.('?')?.[0];

  return { artist, trackName: track };
};

export default extractSoundArtistAndTrack;
