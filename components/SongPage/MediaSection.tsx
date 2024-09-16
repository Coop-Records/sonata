import { usePlayer } from '@/providers/audio/PlayerProvider';
import { TrackMetadata } from '@/types/Track';
import Image from 'next/image';
import { MdPauseCircle } from 'react-icons/md';
import { Skeleton } from '@/components/ui/skeleton';
import Icon from '../ui/icon';
import { useUi } from '@/providers/UiProvider';
import { PLATFORM_ICONS } from '@/lib/consts';
import { FiShare } from 'react-icons/fi';
import useCopyToClipboard from '@/hooks/useCopyToClipboard';

type MediaSectionProps = {
  metadata?: TrackMetadata;
};

export default function MediaSection({ metadata }: MediaSectionProps) {
  const [player, dispatch] = usePlayer();
  const { menuItems } = useUi();
  const currentTrack = player?.metadata?.feedId === metadata?.feedId;
  const { copy } = useCopyToClipboard();

  const handlePlay = () => {
    if (!metadata) return;

    if (currentTrack) {
      dispatch({ type: 'RESUME', payload: { id: metadata.id } });
      return;
    }
    dispatch({
      type: 'PLAY',
      payload: { metadata, feedId: metadata.feedId },
    });
  };

  const handlePause = () => {
    if (!metadata) return;
    dispatch({ type: 'PAUSE', payload: { id: metadata.id } });
  };

  const channel = menuItems.filter((item) => item.value === metadata?.channelId);
  const channelLogo = channel.length > 0 && channel[0].icon;

  return (
    <div
      data-type={metadata?.type}
      className={`flex w-full gap-4 py-2 px-6 ${currentTrack && player.loading && 'animate-pulse'}`}
    >
      <div className="relative my-auto aspect-square w-[148px] shrink-0 rounded-lg shadow-md">
        {metadata?.artworkUrl ? (
          <>
            <div className="relative size-full rounded-lg overflow-hidden">
              <Image
                src={metadata.artworkUrl}
                alt=""
                fill
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                unoptimized
              />
            </div>
            <div className="absolute right-[-4px] bottom-[-4px] rounded-full overflow-hidden">
              <Image src={channelLogo || ''} width={16} height={16} unoptimized alt="" />
            </div>
          </>
        ) : (
          <Skeleton className="size-full" />
        )}
      </div>

      <div className="flex grow flex-col justify-between">
        <section className="space-y-1">
          <div className="line-clamp-2 text-md font-clashdisplay_medium leading-none text-white">
            {metadata?.trackName ? (
              <>{metadata.trackName}</>
            ) : (
              <Skeleton className="h-2 w-32 rounded-sm" />
            )}
          </div>
          <div className="line-clamp-2 text-sm font-clashdisplay_medium text-grey">
            {metadata?.artistName ? (
              <>{metadata.artistName}</>
            ) : (
              <Skeleton className="h-2 w-12 rounded-sm" />
            )}
          </div>
        </section>
        <section className="grow flex flex-col justify-center">
          <p className="font-clashdisplay_medium text-sm text-grey">First shared by</p>
          <div className="flex gap-1 items-center">
            <div className="relative w-4 h-4 rounded-full overflow-hidden">
              <Image
                src={metadata?.artworkUrl || ''}
                alt=""
                fill
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                unoptimized
              />
            </div>
            <p className="font-clashdisplay_medium text-sm text-white">Zinger</p>
          </div>
        </section>
        <section className="flex items-center justify-between">
          <button
            type="button"
            onClick={currentTrack && player.playing ? handlePause : handlePlay}
            className="rounded-full !p-0 !m-0 !h-fit"
          >
            {currentTrack && player.playing ? (
              <MdPauseCircle className="text-4xl" />
            ) : (
              <Icon name="play" />
            )}
          </button>
          {metadata && <Image src={PLATFORM_ICONS[metadata.type]} alt="" width={24} height={24} />}
          <button type="button" onClick={() => copy(window.location.href)} className="text-grey">
            <FiShare className="text-xl" />
          </button>
        </section>
      </div>
    </div>
  );
}
