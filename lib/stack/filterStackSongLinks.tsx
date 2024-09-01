import normalizeEmbedUrl from '../sonata/song/normalizeEmbedUrl';
import { CONTENT_PLATFORMS } from '../consts';

const filterStackSongLinks = (songLinks: string[]) =>
  songLinks
    .filter((link) => CONTENT_PLATFORMS.some((platform) => link.includes(platform.url)))
    .map((link) => normalizeEmbedUrl(link));

export default filterStackSongLinks;
