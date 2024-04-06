'use client';

import FeedProvider from '@/providers/FeedProvider';
import LandingPageContent from './LandingPageContent';

const LandingPage = () => (
  <FeedProvider>
    <div className="flex font-helvetica flex-col items-center justify-center min-h-screen py-12 sm:py-24 lg:py-36 bg-blend-color-burn">
      <LandingPageContent />
    </div>
  </FeedProvider>
);

export default LandingPage;
