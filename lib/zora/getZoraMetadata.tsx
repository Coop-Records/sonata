import { zoraCreator1155ImplABI as abi } from '@zoralabs/protocol-deployments';
import { getPublicClient } from '../clients';
import getIpfsLink from '../getIpfsLink';

const getZoraMetadata = async (chainId: number, data: any) => {
  console.log('SWEETS chainId', chainId);
  console.log('SWEETS data', data);

  const publicClient = getPublicClient(chainId);
  //   UPDATE THIS WITH NEW INFO
  const wagmiContract = {
    abi,
    functionName: 'uri',
  } as const;

  const results = await publicClient.multicall({
    contracts: [
      {
        ...wagmiContract,
        functionName: 'uri',
      },
      {
        ...wagmiContract,
        functionName: 'uri',
        args: [69420n],
      },
      {
        ...wagmiContract,
        functionName: 'uri',
      },
    ],
  });

  //   BEFORE
  //   try {
  //     const publicClient = getPublicClient(chainId);
  //     const uri = await publicClient.readContract({
  //       address: contractAddress,
  //       abi,
  //       functionName: 'uri',
  //       args: [tokenId],
  //     });
  //     const metadataUrl = getIpfsLink(uri);
  //     const fetchResponse = await fetch(metadataUrl);
  //     const metadata = await fetchResponse.json();
  //     return metadata;
  //   } catch (error: any) {
  //     console.error('SWEETS2 chainId', chainId);
  //     console.error('SWEETS2 contractAddress', contractAddress);
  //     console.error('SWEETS2 tokenId', tokenId);
  //     console.error('SWEETS2 ERROR', error);
  //     return {
  //       error: error?.message,
  //       chainId,
  //       contractAddress,
  //       tokenId,
  //     };
  //   }
};

export default getZoraMetadata;
