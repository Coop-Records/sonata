import { useSongPageProvider } from '@/providers/SongPageProvider';
import Loader from '../Loader';
import Cast from './Cast';
import { FEEDS_MOCK } from '@/lib/consts';

export default function SongPostsFeed() {
  const { posts, postsLoading } = useSongPageProvider();

  return postsLoading ? (
    <Loader className="!mt-10" />
  ) : (
    <div className="max-w-full !mt-4 space-y-6 px-6">
      {[...(FEEDS_MOCK as any), ...posts].map((cast) => (
        <Cast key={cast.post_hash} cast={cast} />
      ))}
    </div>
  );
}
