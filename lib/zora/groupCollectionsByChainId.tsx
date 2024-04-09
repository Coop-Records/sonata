const groupCollectionsByChainId = (collections: any[]) => {
  return collections.reduce((acc, item) => {
    const { chainId } = item;
    if (!acc[chainId]) {
      acc[chainId] = [];
    }
    acc[chainId].push(item);
    return acc;
  }, {});
};

export default groupCollectionsByChainId;
