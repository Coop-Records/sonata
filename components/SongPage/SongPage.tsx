import { useSongPageProvider } from '@/providers/SongPageProvider';
import { Separator } from '@radix-ui/react-separator';
import SongPostsFeed from './SongPostsFeed';
import SongMarketSection from './SongMarketSection/SongMarketSection';
import MediaSection from './MediaSection';

const SongPage = () => {
  const { metadata } = useSongPageProvider();

  return (
    <main className="flex grow items-center justify-center">
      <div className="w-full space-y-2">
        <MediaSection metadata={metadata} />
        <SongMarketSection />
        <p className="text-grey px-6 text-sm">Activity</p>
        <Separator className="h-px bg-border mt-0" />
        <SongPostsFeed />
      </div>
    </main>
  );
};

export default SongPage;
