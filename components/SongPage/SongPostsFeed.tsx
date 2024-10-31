import { useSongPageProvider } from '@/providers/SongPageProvider';
import Loader from '@/components/Loader';
import { Separator } from '@/components/ui/separator';
import { timeFromNow } from '@/lib/utils';
import { Avatar, AvatarImage } from '../ui/avatar';

export default function SongPostsFeed() {
  const { posts, postsLoading } = useSongPageProvider();

  console.log({ posts, postsLoading });

  return postsLoading ? (
    <Loader />
  ) : (
    <div className="space-y-2">
      <p className="font-clashDisplay text-sm font-light">Activity</p>
      <Separator />
      <div className="space-y-6">
        {posts.map((cast) => (
          <div key={cast.post_hash} className="flex justify-between">
            <div className="flex items-center gap-1">
              <Avatar className="size-6">
                <AvatarImage src={cast.author.pfp_url} />
              </Avatar>
              <p className="text-sm font-light">{cast.author.username}</p>
              <p className="text-sm font-light text-muted-foreground">posted</p>
            </div>
            <p className="text-sm font-light text-muted-foreground">
              {timeFromNow(cast.created_at)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
