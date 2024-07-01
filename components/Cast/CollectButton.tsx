import { Button } from '@/components/ui/button';

const CollectButton = ({ collectUrl }: { collectUrl: string }) => (
  <div>
    <Button
      onClick={() => window.open(collectUrl, '_blank')}
      className="flex items-center gap-2 rounded-full bg-[#333536] px-4 py-1.5 text-white"
    >
      Collect
    </Button>
  </div>
);

export default CollectButton;
