'use client';
import { Cast as CastType } from '@/types/Cast';
import { useFeedProvider } from '@/providers/FeedProvider';
import Cast from '@/components/Cast';

export default function Feed() {
  const { sorted } = useFeedProvider();

  return (
    <div className="max-w-full grow space-y-6">
      {sorted.map((cast: CastType) => (
        <Cast key={cast.hash} cast={cast} />
      ))}
    </div>
  );
}
