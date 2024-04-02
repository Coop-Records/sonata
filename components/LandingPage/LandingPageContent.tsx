import { useProvider } from '@/providers/Provider';
import GenerateButton from '../GenerateButton';
import MadeBySweets from '../MadeBySweets';
import Output from '../Output';
import LandingPageHeader from './LandingPageHeader';
import SaleStrategyInput from './SaleStrategyInput';
import FundsRecipientInput from './FundsRecipientInput';

const LandingPageContent = () => {
  const { setupActions } = useProvider();

  return (
    <div className="container flex flex-col items-center justify-center gap-4 px-4 text-center sm:gap-8 md:px-6">
      <LandingPageHeader />
      <FundsRecipientInput />
      <SaleStrategyInput />
      {setupActions.length > 0 && <Output />}
      <GenerateButton />
      <MadeBySweets />
    </div>
  );
};

export default LandingPageContent;
