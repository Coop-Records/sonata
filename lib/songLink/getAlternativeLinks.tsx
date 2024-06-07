const getAlternativeLinks = (rawSongLinkData: any[]) => {
  return rawSongLinkData.map((songLinkData) =>
    Object.values(songLinkData.linksByPlatform).map((platform: any) => platform.url),
  );
};

export default getAlternativeLinks;
