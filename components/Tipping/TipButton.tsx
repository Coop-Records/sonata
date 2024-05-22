import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useTipProvider } from '@/providers/TipProvider';
import { SupabasePost } from '@/types/SupabasePost';
import { useNeynarProvider } from '@/providers/NeynarProvider';
import { Popover, PopoverContent } from '@/components/ui/popover';
import { cn, isValidNumber } from '@/lib/utils';
import { PopoverTrigger } from '@radix-ui/react-popover';
import { useUi } from '@/providers/UiProvider';

const defualtTips = {
  DEGEN: [10, 50, 100],
  NOTES: [100, 1000, 10000],
};

export default function TipButton({
  verifications,
  cast = {} as SupabasePost,
  currency,
  className,
}: {
  verifications: string[];
  cast: SupabasePost;
  currency: 'DEGEN' | 'NOTES';
  className?: string;
}) {
  const { user } = useNeynarProvider();
  const userFid = user?.fid;
  const castAuthorFid = cast.author?.fid;
  const isSelfPost = userFid === castAuthorFid;
  const { tip, tipDegen } = useTipProvider();
  const [showDropdown, setShowDropdown] = useState(false);
  const [customTip, setCustomTip] = useState('');
  const [total, setTotal] = useState(0);
  const { checkLoggedIn } = useUi();

  useEffect(() => {
    if (currency === 'NOTES') setTotal(cast.points ?? 0);
    else if (currency === 'DEGEN') setTotal(cast.degen ?? 0);
  }, [cast, currency]);

  const handleTip = async (amount: number) => {
    setShowDropdown(false);
    if (amount === 0) return;
    let response;
    if (currency === 'NOTES') {
      response = await tip(amount, cast.post_hash, cast.author.fid);
    } else if (currency === 'DEGEN') {
      response = await tipDegen(amount, cast.post_hash);
    }
    setTotal(response.totalTipOnPost ?? 0);
    setCustomTip('');
  };

  const handleCustomTip = () => {
    isValidNumber(customTip) && handleTip(Number(customTip));
  };

  const handleClick = () => {
    if (!checkLoggedIn()) return;
    if (isSelfPost) return;
    setShowDropdown(!showDropdown);
  };

  let iconSrc = '';
  if (currency === 'DEGEN') iconSrc = '/images/degenchain.png';
  else if (currency === 'NOTES') iconSrc = '/images/notes.png';

  let iconSize = 14;
  if (currency === 'NOTES') iconSize = 24;

  if (!(verifications && verifications.length > 0)) return <></>;
  return (
    <Popover open={showDropdown} onOpenChange={setShowDropdown}>
      <PopoverTrigger asChild className={cn('rounded-full', className)}>
        <Button
          variant="ghost"
          className={cn(
            'rounded-full flex items-center flex-row gap-1 font-semibold px-4 bg-muted h-auto py-1',
            currency === 'NOTES' && 'flex-row-reverse px-0 bg-transparent hover:bg-transparent',
          )}
          onClick={handleClick}
        >
          <span>{total}</span>
          <Image src={iconSrc} width={iconSize} height={iconSize} alt="" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <ul className="text-gray-700">
          {defualtTips[currency].map((amount) => (
            <li
              key={amount}
              className="cursor-pointer px-4 py-2 hover:bg-gray-100"
              onClick={() => handleTip(amount)}
            >
              Tip {amount} {currency}
            </li>
          ))}
          <li className="flex items-center px-4 py-2">
            <input
              type="number"
              min={0}
              value={customTip}
              onChange={(e) => setCustomTip(e.target.value)}
              placeholder="Custom amount"
              className={`mr-2 w-full rounded border px-2 py-1 text-sm [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
            />
            <Button className="px-4 py-2 hover:bg-gray-100" onClick={handleCustomTip}>
              Tip
            </Button>
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
}
