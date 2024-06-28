export const endpoints = [
  { apiType: 'GET', route: '/api/feed' },
  { apiType: 'GET', route: '/api/feed?feedType=Recent' },
  { apiType: 'GET', route: '/api/feed?feedType=Trending' },
  { apiType: 'GET', route: '/api/feed?feedType=Following&viewerFid=<Farcaster ID>' },
  { apiType: 'GET', route: '/api/feed?viewerFid=<Farcaster ID>' },
  { apiType: 'GET', route: '/api/feed?channelId=<Farcaster Channel ID>' },
  { apiType: 'GET', route: '/api/channel/stats' },
  { apiType: 'GET', route: '/api/tips' },
];
