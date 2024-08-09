import { DEMO_ADDRESS, EVENT_ZORA_REWARDS } from './consts';

export const endpoints = [
  {
    apiType: 'GET',
    route: '/api/zora/collections?creator={ADDRESS}',
    stack: 'zora+collections',
    demo: `/api/zora/collections?creator=${DEMO_ADDRESS}`,
  },
  {
    apiType: 'GET',
    route: '/api/zora/rewards?address={ADDRESS}',
    stack: EVENT_ZORA_REWARDS,
    demo: `/api/zora/rewards?address=${DEMO_ADDRESS}`,
  },
  { apiType: 'GET', route: '/api/zora/feeRecipients', stack: 'zora+feerecipients' },
  { apiType: 'GET', route: '/api/stack/leaderboard', stack: 'stack+leaderboard' },
];
