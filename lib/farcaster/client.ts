import { HubRestAPIClient } from '@standard-crypto/farcaster-js-hub-rest';
import axios from 'axios';

const farcasterClient = new HubRestAPIClient({
  hubUrl: 'https://hub-api.neynar.com',
  axiosInstance: axios.create({
    headers: { api_key: process.env.NEYNAR_API_KEY },
  }),
});

export default farcasterClient;
