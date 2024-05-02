'use server';

import getSpotifyAccessToken from './getSpotifyAccessToken';

export default async function getSpotifyTrack(trackId: string) {
  try {
    const accessToken = await getSpotifyAccessToken();
    const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    });
    const track = await response.json();
    return track;
  } catch (error) {
    return { error };
  }
}
