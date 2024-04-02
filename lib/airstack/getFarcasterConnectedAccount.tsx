import { AIRSTACK_API_URL } from '../consts';

export const getFarcasterConnectedAccount = async (fid: string) => {
  const query = ` query MyQuery($fid: String!){
    Socials(
      input: {filter: {userId: {_eq: $fid}, dappName: {_eq: farcaster}}, blockchain: ethereum}
    ) {
      Social {
        dappName
        userId
        userAddress
        connectedAddresses {
          address
          blockchain
        }
      }
    }
        }`;
  const variables = {
    fid,
  };
  const res = await fetch(AIRSTACK_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${process.env.NEXT_PUBLIC_AIRSTACK_API_KEY}`,
    },
    body: JSON.stringify({ query, variables }),
  });
  const data = await res.json();
  return data;
};
