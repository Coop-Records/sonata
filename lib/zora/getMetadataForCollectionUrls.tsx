import getZoraMetadata from './getZoraMetadata';
import groupCollectionsByChainId from './groupCollectionsByChainId';

const getMetadataForCollections = async (collections: any[]) => {
  // Group collections by chainId
  const groupedByChainId = groupCollectionsByChainId(collections);

  // Array to store all metadata promises
  let metadataPromises = [];

  // Generate metadata promises for each group
  for (const chainId in groupedByChainId) {
    const group = groupedByChainId[chainId];
    const promise = getZoraMetadata({
      chainId: chainId,
      // Assuming getZoraMetadata can accept an array of { contractAddress, tokenId } objects for the same chainId
      data: group.map(({ contractAddress, tokenId }) => ({ contractAddress, tokenId })),
    }).then((metadataArray) =>
      // Assuming metadataArray returns an array of metadata corresponding to the data array
      // Map over the metadataArray to include the original embed data
      metadataArray.map((metadata, index) => ({
        ...metadata,
        ...group[index],
      })),
    );

    metadataPromises.push(promise);
  }

  // Wait for all promises to resolve and flatten the results
  const metadataResponses = await Promise.all(metadataPromises).then((results) => results.flat());

  return metadataResponses;
};

export default getMetadataForCollections;
