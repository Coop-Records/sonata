import { SetupNewTokenEvent } from '../sonata/song/findMatchingEvent';
import normalizeEmbedUrl from '../sonata/song/normalizeEmbedUrl';

function setupNewTokenEventMatchesSong(event: SetupNewTokenEvent, songLinks: string[]): boolean {
  if (!event.metadata?.songLinks || !Array.isArray(event.metadata.songLinks)) {
    return false;
  }

  return event.metadata.songLinks.some((link: string) =>
    songLinks.some((sl: string) => {
      const normalizedLink = normalizeEmbedUrl(link);
      const normalizedSl = normalizeEmbedUrl(sl);
      return normalizedLink === normalizedSl;
    }),
  );
}

export default setupNewTokenEventMatchesSong;
