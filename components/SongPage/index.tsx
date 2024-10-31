import useCopyToClipboard from '@/hooks/useCopyToClipboard';
import { useSongPageProvider } from '@/providers/SongPageProvider';
import { ShareIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SongPostsFeed from './SongPostsFeed';
import TotalNotes from './TotalNotes';
import { usePlayer } from '@/providers/audio/PlayerProvider';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { FaPause, FaPlay } from 'react-icons/fa';
import { PLATFORM_ICONS } from '@/lib/consts';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

export default function SongPage() {
  const { metadata, firstPost } = useSongPageProvider();
  const { copy } = useCopyToClipboard();
  const handleShare = () => copy(window.location.href);
  const [player, dispatch] = usePlayer();

  const handleToggle = () => {
    if (!metadata?.feedId) return;
    if (player.playing) dispatch({ type: 'PAUSE', payload: { id: metadata.id } });
    else if (player.metadata?.id === metadata.id)
      dispatch({ type: 'RESUME', payload: { id: metadata.id } });
    else dispatch({ type: 'PLAY', payload: { metadata, feedId: metadata.feedId } });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-8">
        <div className="relative size-36 overflow-hidden rounded-lg">
          {metadata?.artworkUrl ? (
            <Image src={metadata.artworkUrl} alt="" fill style={{ objectFit: 'cover' }} />
          ) : (
            <Skeleton className="size-full" />
          )}
        </div>

        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <p className="max-w-40 truncate font-clashDisplay font-semibold">
              {metadata?.trackName}
            </p>
            <p className="text-sm font-light text-muted-foreground">{metadata?.artistName}</p>
          </div>

          <div className="space-y-2 text-sm font-light">
            <p className="text-muted-foreground">First shared by</p>
            {firstPost ? (
              <div className="flex items-center gap-1">
                <Avatar className="size-4">
                  <AvatarImage src={firstPost.author.pfp_url} />
                </Avatar>
                <span>{firstPost.author.username}</span>
              </div>
            ) : (
              <Skeleton className="h-4 w-20 rounded-sm" />
            )}
          </div>

          <div className="flex justify-between">
            <button
              className="rounded-full bg-secondary p-2"
              onClick={handleToggle}
              title={player.playing ? 'Pause' : 'Play'}
            >
              {player.playing ? <FaPause className="size-3" /> : <FaPlay className="size-3" />}
            </button>

            <div className="relative size-6 overflow-hidden rounded-full">
              {metadata?.type ? (
                <Image
                  alt=""
                  fill
                  src={PLATFORM_ICONS[metadata.type]}
                  style={{ objectFit: 'cover' }}
                />
              ) : (
                <Skeleton className="size-full" />
              )}
            </div>

            <Button
              className="h-auto w-9 p-0 text-muted-foreground outline-none hover:bg-transparent"
              onClick={handleShare}
              variant="ghost"
              title="share"
            >
              <ShareIcon />
            </Button>
          </div>
        </div>
      </div>

      <TotalNotes />

      <SongPostsFeed />
    </div>
  );
}
