'use client';
import { HubRestAPIClient } from '@standard-crypto/farcaster-js-hub-rest';
import axios from 'axios';

const farcasterClient = new HubRestAPIClient({
  hubUrl: 'https://hub-api.neynar.com',
  axiosInstance: axios.create({
    headers: { api_key: 'NEYNAR_PRIVY_DEMO' },
  }),
});

export default farcasterClient;
