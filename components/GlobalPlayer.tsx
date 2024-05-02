'use client';
import { usePlayer } from '@/providers/PlayerProvider';
import { useMemo } from 'react';
import SpotifyEmbed from './Cast/SpotifyEmbed';
import SoundCloudEmbed from './Cast/SoundCloudEmbed';
import SoundXyzEmbed from './Cast/SoundXyzEmbed';

export default function GlobalPlayer() {
  const [player] = usePlayer();
  const { metadata } = player;
  const url = metadata?.url;

  const EmbedComponent = useMemo(() => {
    if (!url) return null;
    if (url.includes('spotify')) return SpotifyEmbed;
    if (url.includes('soundcloud')) return SoundCloudEmbed;
    if (url.includes('sound.xyz')) return SoundXyzEmbed;
  }, [url]);

  if (!EmbedComponent || !url) return <></>;

  return (
    <EmbedComponent
      trackUrl={url}
      className="fixed bottom-0 left-0 w-[calc(100vw-20px)] bg-black p-2 !rounded-none !border-none !text-white"
    />
  );
}
