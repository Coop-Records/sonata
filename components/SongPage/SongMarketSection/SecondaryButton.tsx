import Loader from '@/components/Loader';
import { Button } from '@/components/ui/button';
import useSecondary from '@/hooks/zora/useSecondary';
import { useSongPageProvider } from '@/providers/SongPageProvider';

export default function SecondaryButton({ mode }: { mode: 'buy' | 'sell' }) {
  const { collection } = useSongPageProvider();
  const { price, transact, loading } = useSecondary(mode, collection);

  return (
    <Button onClick={() => transact()} disabled={loading} className="w-full capitalize">
      {mode}
      {loading ? <Loader /> : <span className="px-2">{String(price)} ✧</span>}
    </Button>
  );
}
