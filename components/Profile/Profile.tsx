import BaseInfo from './BaseInfo';
import Notes from './Notes';
import Songs from './Songs';
import TopSong from './TopSong';
import Followers from './Followers';
import { useFeedProvider } from '@/providers/FeedProvider';
import { FeedType } from '@/types/Feed';
import { cn } from '@/lib/utils';

const Profile = () => {
  const { feedType } = useFeedProvider();
  return (
    <section className={cn("container mx-auto mb-4 mt-8 space-y-4", { "max-w-3xl": feedType !== FeedType.Stakes })}>
      <BaseInfo />
      <div className="flex gap-4">
        <Songs />
        <Notes />
        <TopSong />
      </div>
      <Followers />
    </section>
  );
};

export default Profile;
