import { SetupNewTokenEvent } from '../sonata/song/findMatchingEvent';

function setupNewTokenEventMatchesSong(event: SetupNewTokenEvent, songLinks: string[]): boolean {
  return (
    event.metadata?.songLinks &&
    Array.isArray(event.metadata.songLinks) &&
    event.metadata.songLinks.some((link: string) =>
      songLinks.some((sl: string) => link.includes(sl.split('?')[0])),
    )
  );
}

export default setupNewTokenEventMatchesSong;
