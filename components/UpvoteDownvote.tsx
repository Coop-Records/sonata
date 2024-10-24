import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useTipProvider } from '@/providers/TipProvider';
import { SupabasePost } from '@/types/SupabasePost';
import { Popover, PopoverContent } from '@/components/ui/popover';
import { cn, formatBigInt, isValidNumber } from '@/lib/utils';
import { PopoverTrigger } from '@radix-ui/react-popover';
import { useUi } from '@/providers/UiProvider';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { ArrowBigUp } from 'lucide-react';
import { useStakeProvider } from '@/providers/StakeProvider';
import { usePrivy } from '@privy-io/react-auth';

const defaultTips = [100, 1000, 10000];
const logo = '/images/notes.png';

export default function UpvoteDownvote({
  verifications,
  cast = {} as SupabasePost,
  className,
}: {
  verifications: string[];
  cast: SupabasePost;
  className?: string;
}) {
  const { user } = usePrivy();
  const { setChannelDetails } = useStakeProvider();
  const userFid = user?.farcaster?.fid;
  const castAuthorFid = cast.author?.fid;
  const isSelfPost = userFid === castAuthorFid;
  const { tip } = useTipProvider();
  const [showUpvoteDropdown, setShowUpvoteDropdown] = useState(false);
  const [customTip, setCustomTip] = useState('');
  const [total, setTotal] = useState(0);
  const { checkLoggedIn } = useUi();

  useEffect(() => {
    setTotal(cast.points ?? 0);
  }, [cast]);

  const handleUpvoteTip = async (amount: number) => {
    setShowUpvoteDropdown(false);
    if (amount === 0) return;
    const response = await tip(amount, cast.post_hash, cast.author.fid);
    setTotal(response?.totalTipOnPost ?? total);
    setCustomTip('');
    setChannelDetails(({ balance, ...rest }) => ({
      ...rest,
      balance: balance + (response?.channelAmount ?? 0),
    }));
  };

  const handleCustomUpvoteTip = () => {
    isValidNumber(customTip) && handleUpvoteTip(Number(customTip));
  };

  const handleUpvoteClick = () => {
    if (!checkLoggedIn()) return;
    if (isSelfPost) return;
    setShowUpvoteDropdown(!showUpvoteDropdown);
  };

  if (!(verifications && verifications.length > 0)) return <></>;
  return (
    <div className="flex flex-row rounded-full bg-muted px-1">
      <Popover open={showUpvoteDropdown} onOpenChange={setShowUpvoteDropdown}>
        <PopoverTrigger asChild className={cn('rounded-full !bg-grey-light', className)}>
          <Button
            variant="ghost"
            className={cn(
              'rounded-full flex items-center flex-row gap-1 font-semibold py-2 px-4 bg-muted h-auto',
              'flex-row-reverse bg-transparent hover:bg-transparent',
            )}
            onClick={handleUpvoteClick}
          >
            <span>{formatBigInt(BigInt(total))}</span>
            <Image src={logo} width={16} height={16} alt="" />
            <ArrowBigUp className="hover:fill-black" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex w-48 flex-col gap-2">
          <h3 className="mb-2 text-xs font-semibold">Upvote</h3>

          <ul className="flex flex-wrap gap-2">
            {defaultTips.map((amount) => (
              <li key={amount}>
                <Badge
                  variant="secondary"
                  className="flex cursor-pointer gap-1 bg-grey-light px-3 py-2"
                  onClick={() => handleUpvoteTip(amount)}
                >
                  {amount}
                  <Image src={logo} width={14} height={14} alt="" />
                </Badge>
              </li>
            ))}
          </ul>

          <div className="flex items-center rounded-xl bg-grey-light px-4">
            <Input
              type="number"
              min={0}
              value={customTip}
              onChange={(e) => setCustomTip(e.target.value)}
              placeholder="Custom Amount"
              className="h-auto grow border-none bg-transparent px-0 py-3.5 text-xs outline-none [appearance:textfield] focus-visible:ring-0 focus-visible:ring-offset-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
            <Button variant="ghost" onClick={handleCustomUpvoteTip} className="size-4 p-0">
              <Image src={logo} width={16} height={16} alt="" />
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
