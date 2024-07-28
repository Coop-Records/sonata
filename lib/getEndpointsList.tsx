export const endpoints = [
  { apiType: 'GET', route: '/api/zora/feeRecipients', stack: 'zora+feerecipients' },
  { apiType: 'GET', route: '/api/zora/collections', stack: 'zora+collections' },
  {
    apiType: 'GET',
    route: '/api/zora/collections?creator={ADDRESS}',
    stack: 'zora+collections',
    demo: '/api/zora/collections?creator=0x33912a0d6bEFf5Fb8e5B70688CE858D5e7E8104E',
  },
  { apiType: 'GET', route: '/api/stack/leaderboard', stack: 'stack+leaderboard' },
];
