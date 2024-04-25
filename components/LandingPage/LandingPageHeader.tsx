import { DESCRIPTION, TITLE } from '@/lib/consts';

const LandingPageHeader = () => (
  <div style={{ display: 'flex' }} className="space-y-3 flex flex-col text-center">
    <p className="text-4xl font-bold tracking-tighter sm:text-5xl">{TITLE}.</p>
    <p className="max-w-[600px] text-md md:text-xl font-bold">{DESCRIPTION}.</p>
  </div>
);

export default LandingPageHeader;
