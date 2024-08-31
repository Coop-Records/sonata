const formatSongLinks = (songLink: string, alternatives: any): string[] => {
  let songLinks = Object.values(alternatives)
    .filter((alt) => typeof alt === 'object' && alt !== null)
    .flatMap((alt) =>
      Object.values(alt as Record<string, any>)
        .filter((platform) => platform && typeof platform === 'object' && 'url' in platform)
        .map((platform) => (platform as { url: string }).url),
    );
  songLinks.unshift(songLink);
  songLinks = [...new Set(songLinks)];
  return songLinks;
};

export default formatSongLinks;
