function normalizeEmbedUrl(url: string): string {
  const lowercaseUrl = url.toLowerCase();
  if (lowercaseUrl.includes('spotify.com')) {
    return lowercaseUrl.split('?')[0];
  } else if (lowercaseUrl.includes('youtube.com') || lowercaseUrl.includes('youtu.be')) {
    return lowercaseUrl;
  } else {
    // For other platforms, you might want to decide on a case-by-case basis
    return lowercaseUrl;
  }
}

export default normalizeEmbedUrl;
