import getFeed from './neynar/getFeed';

const getCombinedFeed = async () => {
  const [response, soundCloud, soundxyz] = await Promise.all([
    getFeed('spotify.com/track'),
    getFeed('soundcloud.com'),
    getFeed('sound.xyz'),
  ]);

  const combinedFeeds = [...response.casts, ...soundCloud.casts, ...soundxyz.casts];
  const sortedFeeds = combinedFeeds.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );
  return sortedFeeds;
};

export default getCombinedFeed;
