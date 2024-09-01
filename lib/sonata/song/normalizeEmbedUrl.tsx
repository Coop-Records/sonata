function normalizeEmbedUrl(url: string): string {
  const lowercaseUrl = url.toLowerCase();
  if (lowercaseUrl.includes('spotify.com')) {
    return lowercaseUrl.split('?')[0];
  }
  return lowercaseUrl;
}

export default normalizeEmbedUrl;
