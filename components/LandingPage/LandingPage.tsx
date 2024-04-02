'use client';

import Provider from '@/providers/Provider';
import LandingPageContent from './LandingPageContent';

const LandingPage = () => (
  <Provider>
    <div className="flex font-helvetica flex-col items-center justify-center min-h-screen py-12 sm:py-24 lg:py-36 bg-blend-color-burn">
      <LandingPageContent />
    </div>
  </Provider>
);

export default LandingPage;
