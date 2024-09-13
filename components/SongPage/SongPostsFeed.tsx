import { useSongPageProvider } from '@/providers/SongPageProvider';
import Cast from '../Cast';
import Loader from '../Loader';

export default function SongPostsFeed() {
  const { posts, postsLoading } = useSongPageProvider();

  return postsLoading ? (
    <Loader className="!mt-10" />
  ) : (
    <div className="max-w-full !mt-10 space-y-6">
      {posts.map((cast) => (
        <Cast key={cast.post_hash} cast={cast} />
      ))}
    </div>
  );
}
