import normalizeEmbedUrl from '../sonata/song/normalizeEmbedUrl';

const filterStackSongLinks = (songLinks: string[]) => {
  const allowedDomains = ['spotify.com', 'soundcloud.com', 'youtube.com', 'zora.co', 'sound.xyz'];

  return songLinks
    .filter((link) => allowedDomains.some((domain) => link.includes(domain)))
    .map((link) => normalizeEmbedUrl(link));
};

export default filterStackSongLinks;
