import MadeBySweets from '../MadeBySweets';
import LandingPageHeader from './LandingPageHeader';
import Feed from '../Feed';
import { useFeedProvider } from '@/providers/FeedProvider';
import Signin from './SignIn';

const LandingPageContent = () => {
  const { feed } = useFeedProvider();

  return (
    <div className="container flex flex-col items-center justify-center gap-4 px-4 text-center sm:gap-8 md:px-6">
      <div style={{ position: 'fixed', top: '12px', right: '12px' }}>
        <Signin />
      </div>
      <LandingPageHeader />
      {feed?.length > 0 && <Feed feed={feed} />}
      <MadeBySweets />
    </div>
  );
};

export default LandingPageContent;
