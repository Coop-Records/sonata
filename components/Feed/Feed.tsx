import Cast from '@/components/Cast';
import { SupabasePost } from '@/types/SupabasePost';

export default function Feed({ feed }: { feed: SupabasePost[] }) {
  return (
    <div className="max-w-full grow space-y-6">
      {feed.map((cast: SupabasePost, index: number) => (
        <Cast key={cast.post_hash} cast={cast} currentPlayingIndex={index} />
      ))}
    </div>
  );
}
