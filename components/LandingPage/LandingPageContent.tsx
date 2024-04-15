import MadeBySweets from '../MadeBySweets';
import LandingPageHeader from './LandingPageHeader';
import Feed from '../Feed';
import { useFeedProvider } from '@/providers/FeedProvider';
import SignInButton from './SignInButton';

const LandingPageContent = () => {
  const { feed } = useFeedProvider();

  return (
    <div className="container flex flex-col items-center justify-center gap-4 px-4 text-center sm:gap-8 md:px-6">
      <div style={{ position: 'fixed', top: '12px', right: '12px' }}>
        <SignInButton />
      </div>
      <LandingPageHeader />
      {feed?.length > 0 && <Feed feed={feed} />}
      <MadeBySweets />
    </div>
  );
};

export default LandingPageContent;
