import { useProvider } from '@/providers/Provider';
import Input from '../Input';

const SaleStrategyInput = () => {
  const { setSaleStrategy } = useProvider();

  const handleChange = (e: any) => {
    setSaleStrategy(e.target.value);
  };

  return (
    <div className="flex flex-col text-left">
      <Input onChange={handleChange} placeholder="fixed price sale strategy" />
      <a
        href="https://github.com/ourzora/zora-protocol/tree/main/packages/1155-deployments/addresses"
        target="_blank"
      >
        find a sale strategies for your chain
      </a>
    </div>
  );
};

export default SaleStrategyInput;
