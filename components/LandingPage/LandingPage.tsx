'use client';

import FeedProvider from '@/providers/FeedProvider';
import LandingPageContent from './LandingPageContent';
import NeynarProvider from '@/providers/NeynarProvider';

const LandingPage = () => (
  <NeynarProvider>
    <FeedProvider>
      <div className="flex font-helvetica flex-col items-center justify-center min-h-screen py-12 sm:py-24 lg:py-36 bg-blend-color-burn">
        <LandingPageContent />
      </div>
    </FeedProvider>
  </NeynarProvider>
);

export default LandingPage;
