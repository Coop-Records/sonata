import { useSongPageProvider } from '@/providers/SongPageProvider';
import { Separator } from '@radix-ui/react-separator';
import MediaPlayer from '../MediaPlayer';
import SongAlternatives from './Alternatives';
import SongPostsFeed from './SongPostsFeed';
import SongMarketSection from './SongMarketSection';

const SongPage = () => {
  const { metadata } = useSongPageProvider();

  return (
    <main className="flex grow items-center justify-center">
      <div className="w-full space-y-4">
        <MediaPlayer metadata={metadata} />
        <SongMarketSection />
        <Separator className="h-px bg-muted" />
        <SongAlternatives />
        <SongPostsFeed />
      </div>
    </main>
  );
};

export default SongPage;
