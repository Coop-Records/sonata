import { client } from './client';

const lookupUserByFid = async () => {
  console.log('SWEETS lookupUserByFid');
  // fetch info about a Farcaster user
  const fid = 3;
  const user = await client.fetchBulkUsers([fid]);
  console.log(user); // logs information about the user
};

export default lookupUserByFid;
