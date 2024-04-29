import { DESCRIPTION, TITLE } from '@/lib/consts';

const LandingPageHeader = () => (
  <div style={{ display: 'flex' }} className="flex flex-col space-y-3 text-center">
    <p className="text-4xl font-bold tracking-tighter sm:text-5xl">{TITLE}.</p>
    <p className="max-w-[600px] font-bold md:text-xl">{DESCRIPTION}.</p>
  </div>
);

export default LandingPageHeader;
