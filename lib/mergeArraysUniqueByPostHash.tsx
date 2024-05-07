const mergeArraysUniqueByPostHash = (prev: any, posts: any) => {
  const map = new Map();
  const addItems = (items: any) => {
    for (const item of items) {
      if (!map.has(item.post_hash)) {
        map.set(item.post_hash, item);
      }
    }
  };
  addItems(prev);
  addItems(posts);
  return Array.from(map.values());
};

export default mergeArraysUniqueByPostHash;
