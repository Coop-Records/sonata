'use server';

import { SpotifyTrack } from '@/types/SpotifyTrack';
import getSpotifyAccessToken from './getSpotifyAccessToken';

export default async function getSpotifyTrack(trackId: string) {
  const accessToken = await getSpotifyAccessToken();
  const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
  });
  if (!response.ok) {
    return { error: response.statusText };
  }
  const track = await response.json();
  return track as SpotifyTrack;
}
