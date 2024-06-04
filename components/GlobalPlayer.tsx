'use client';
import { usePlayer } from '@/providers/audio/PlayerProvider';
import Image from 'next/image';
import { MdPauseCircle, MdPlayCircle } from 'react-icons/md';
import { Button } from '@/components/ui/button';
import Scrubber from '@/components/Scrubber';
import { useFeedProvider } from '@/providers/FeedProvider';
import fetchMetadata from '@/lib/fetchMetadata';
import findValidEmbed from '@/lib/findValidEmbed';
import { useEffect } from 'react';

export default function GlobalPlayer() {
  const [player, dispatch] = usePlayer();
  const { feed } = useFeedProvider();
  const { metadata } = player;

  useEffect(() => {
    if (player.position !== 0 && player.position > player.duration - 1000) {
      handleNext();
    }
  }, [player.position]);

  if (!metadata) return <></>;

  const handlePlay = () => {
    dispatch({ type: 'RESUME', payload: { id: metadata.id } });
  };

  const handlePause = () => {
    dispatch({ type: 'PAUSE', payload: { id: metadata.id } });
  };

  const handleNext = async () => {
    if (player.currentPlayingIndex + 1 < feed.length) {
      const embed = findValidEmbed(feed[player.currentPlayingIndex + 1]);
      const url = embed?.url;
      if (url) {
        const metadata = await fetchMetadata(url);
        dispatch({
          type: 'PLAY',
          payload: { metadata, currentPlayingIndex: player.currentPlayingIndex + 1 },
        });
      }
    }
  };

  const handlePrev = async () => {
    if (player.currentPlayingIndex && player.currentPlayingIndex > 0) {
      const embed = findValidEmbed(feed[player.currentPlayingIndex - 1]);
      const url = embed?.url;
      if (url) {
        const metadata = await fetchMetadata(url);
        dispatch({
          type: 'PLAY',
          payload: { metadata, currentPlayingIndex: player.currentPlayingIndex - 1 },
        });
      }
    }
  };

  return (
    <div
      data-type={metadata.type}
      className="sticky bottom-0 left-0 mt-auto w-screen space-y-6 bg-white py-3 shadow-2xl shadow-black"
    >
      <div className=" container relative flex items-center gap-3">
        <div className="relative my-auto size-16 overflow-hidden rounded-lg shadow-md">
          <Image
            src={metadata.artworkUrl}
            alt=""
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            unoptimized
          />
        </div>

        <div className=" max-w-[33%] space-y-0.5 self-center">
          <div className="line-clamp-2 text-sm font-bold">{metadata.trackName}</div>
          <div className="line-clamp-2 text-xs font-extralight text-muted-foreground">
            {metadata.artistName}
          </div>
        </div>
        <div className="absolute left-1/4 w-full">
          <div className="ml-6 flex max-w-2xl grow flex-col items-center gap-1">
            <div className="flex items-center">
              <Button onClick={handlePrev} className="bg-white">
                <Image src="/images/skip-back.png" width={22} height={22} alt="" />
              </Button>

              <Button
                onClick={player.playing ? handlePause : handlePlay}
                variant="ghost"
                className="rounded-full p-0"
              >
                {player.playing ? (
                  <MdPauseCircle className="text-4xl" />
                ) : (
                  <MdPlayCircle className="text-4xl" />
                )}
              </Button>
              <Button onClick={handleNext} className="bg-white">
                <Image src="/images/skip-forward.png" width={22} height={22} alt="" />
              </Button>
            </div>
            <Scrubber className="w-full max-md:hidden" />
          </div>
        </div>
      </div>

      <Scrubber className="container md:hidden" />
    </div>
  );
}
