const formatSongLinks = (songLink: string, alternatives: any): string[] => {
  const songLinks = Object.values(alternatives)
    .filter((alt) => typeof alt === 'object' && alt !== null)
    .flatMap((alt) =>
      Object.values(alt as Record<string, any>)
        .filter((platform) => platform && typeof platform === 'object' && 'url' in platform)
        .map((platform) => (platform as { url: string }).url),
    );

  if (!songLinks.includes(songLink)) {
    songLinks.push(songLink);
  }

  return songLinks;
};

export default formatSongLinks;
