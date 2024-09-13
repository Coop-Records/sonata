import { Button } from '@/components/ui/button';
import { CollectionObject } from '@/lib/sonata/song/createCollectionObject';

const SellButton = ({ collection }: { collection?: CollectionObject }) => {
  const handleSell = () => {
    console.log('sell', collection);
  };

  return (
    <Button onClick={handleSell} className="w-full">
      SELL
    </Button>
  );
};

export default SellButton;
