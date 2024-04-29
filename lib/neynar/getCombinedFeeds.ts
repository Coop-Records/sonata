import getFeed from './getFeed';

export default async function getCombinedFeeds() {
  const [response, soundCloud, soundxyz] = await Promise.all([
    getFeed('spotify.com/track'),
    getFeed('soundcloud.com'),
    getFeed('sound.xyz'),
  ]);

  const combinedFeeds = [...response.casts, ...soundCloud.casts, ...soundxyz.casts];
  return combinedFeeds;
}
