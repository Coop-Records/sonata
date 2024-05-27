import { CHANNELS } from '@/lib/consts';
import { Button } from '../ui/button';
import getFeed from '@/lib/neynar/getFeed';
import { Cast } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import { usePlayer } from '@/providers/PlayerProvider';
import { TrackMetadata } from '@/types/Track';

const YouTubeButton = () => {
  const [player, dispatch] = usePlayer();

  const handleClick = async () => {
    console.log('SWEETS QUERY YOUTUBE');
    const response = await getFeed('youtube.com');
    console.log('SWEETS response', response);

    // Extract channel values from CHANNELS
    const channelValues = CHANNELS.map((channel) => channel.value);

    // Filter the response
    const filteredResponse = response.casts.filter((cast: Cast) => {
      if (!cast.parent_url) {
        return false;
      }
      const channel = cast.parent_url.split('/').pop();
      console.log('SWEETS CHANNEL', channel);
      return channelValues.includes(channel as string);
    });

    console.log('SWEETS QUERY response', filteredResponse);
    console.log('SWEETS DISPLAY OPTIONS FROM CHANNELS', CHANNELS);
    const metadata = {
      id: 'ndl9OClJjXo',
      type: 'youtube',
      artistName: '-gaga',
      trackName: 'The Black Keys: Lonely Boy',
      artworkUrl: 'https://i1.sndcdn.com/artworks-000015062997-mfd6sa-t500x500.jpg',
      url: 'https://api.soundcloud.com/tracks/30033218',
    } as TrackMetadata;
    console.log('SWEETS PLAYING metadata', metadata);

    dispatch({
      type: 'PLAY',
      payload: { metadata },
    });
  };

  return <Button onClick={handleClick}>QUERY YOUTUBE</Button>;
};

export default YouTubeButton;
