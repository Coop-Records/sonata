import {
  DEMO_ADDRESS,
  EVENT_ZORA_PROFILE,
  EVENT_ZORA_REWARDS,
  EVENT_ZORA_SCORE,
  EVENT_ZORA_TOKENS,
} from './consts';

export const endpoints = [
  {
    apiType: 'GET',
    route: '/api/profile?address={ADDRESS}',
    stack: EVENT_ZORA_PROFILE,
    demo: `/api/profile?address=${DEMO_ADDRESS}`,
  },
  {
    apiType: 'GET',
    route: '/api/zora/tokens?creatorAddress={ADDRESS}',
    stack: EVENT_ZORA_TOKENS,
    demo: `/api/zora/tokens?creatorAddress=${DEMO_ADDRESS}`,
  },
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
  {
    apiType: 'GET',
    route: '/api/zora/score?address={ADDRESS}',
    stack: EVENT_ZORA_SCORE,
    demo: `/api/zora/score?address=${DEMO_ADDRESS}`,
  },
];
