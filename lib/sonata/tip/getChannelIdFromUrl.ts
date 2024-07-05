function getChannelIdFromUrl(url: string) {
  const match = url.match(/^(\w+):\/\/([^/]+)\/channel\/(\w+)$/);
  if (match) return match[3];
  return null;
}

export default getChannelIdFromUrl;
