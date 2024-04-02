import { useProvider } from '@/providers/Provider';
import MadeBySweets from '../MadeBySweets';
import LandingPageHeader from './LandingPageHeader';
import Feed from '../Feed';

const LandingPageContent = () => {
  const { feed, setupActions } = useProvider();

  return (
    <div className="container flex flex-col items-center justify-center gap-4 px-4 text-center sm:gap-8 md:px-6">
      <LandingPageHeader />
      {feed?.casts?.length > 0 && <Feed feed={feed} />}
      <MadeBySweets />
    </div>
  );
};

export default LandingPageContent;
