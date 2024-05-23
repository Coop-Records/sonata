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
import { Badge } from './ui/badge';
import { Input } from './ui/input';

const defualtTips = {
  DEGEN: [10, 50, 100],
  NOTES: [100, 1000, 10000],
};

const logos = {
  DEGEN: '/images/degenchain.png',
  NOTES: '/images/notes.png',
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
          <Image src={logos[currency]} width={iconSize} height={iconSize} alt="" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-48 flex-col gap-2">
        <h3 className="mb-2 text-xs font-semibold">Tip</h3>

        <ul className="flex flex-wrap gap-2">
          {defualtTips[currency].map((amount) => (
            <li key={amount}>
              <Badge
                variant="secondary"
                className="flex cursor-pointer gap-1"
                onClick={() => handleTip(amount)}
              >
                {amount} <Image src={logos[currency]} width={14} height={14} alt="" />
              </Badge>
            </li>
          ))}
        </ul>

        <div className="flex items-center rounded-2xl bg-muted px-4 py-2">
          <Input
            type="number"
            min={0}
            value={customTip}
            onChange={(e) => setCustomTip(e.target.value)}
            placeholder="Custom Amount"
            className="h-auto grow border-none bg-transparent p-0 text-xs outline-none [appearance:textfield] focus-visible:ring-0 focus-visible:ring-offset-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          <Button variant="ghost" onClick={handleCustomTip} className="h-auto p-0">
            <Image src={logos[currency]} width={16} height={16} alt="" />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
