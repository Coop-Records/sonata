'use client';
import useFeedScrollPosition from '@/hooks/useFeedScrollPosition';
import { useStakeProvider } from '@/providers/StakeProvider';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useSpring } from 'react-spring';
import { Avatar } from '../ui/avatar';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import DataPoints from '../ChannelDetails/DataPoints';
import formatNumber from '@/lib/formatNumber';
import StakeDialog from '../ChannelDetails/StakeDialog';
import Skeleton from '../ChannelDetails/Skeleton';

const ChannelHeader = () => {
  const { channelId } = useParams();
  const { scrollPosition } = useFeedScrollPosition();
  const [showLess, setShowLess] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const { loading, channelDetails: channel, userStakedAmount, channelImage } = useStakeProvider();

  useEffect(() => {
    const headerHeight = headerRef.current?.offsetHeight ?? 0;

    if (!headerHeight) return;

    if (scrollPosition > headerHeight + 10) setShowLess(true);
    else setShowLess(false);
  }, [scrollPosition, headerRef]);

  const animation = useSpring({
    transform: showLess ? 'translateY(0)' : 'translateY(-20px)',
    config: { tension: 200, friction: 20, bounce: 0 },
  });

  return (
    <main className="pr-6 mb-4">
      <div className="flex gap-2 my-4 items-center">
        <Image
          src={channelImage ?? ''}
          height={72}
          width={72}
          className="size-[72px] rounded-full object-cover"
          alt={channelId as string}
        />
        <div>
          <p className="text-white font-clashdisplay_medium text-md">{channelId as string}</p>
          <div className="text-grey text-sm font-clashdisplay flex flex-wrap items-center">
            Discussions about all types of music
            <div className="flex items-center">
              Moderated by&nbsp;
              <Avatar className="size-4 cursor-pointer">
                <AvatarImage
                  className="object-cover object-center"
                  src={'https://i.imgur.com/Hf9CCmq.jpg'}
                />
                <AvatarFallback>akhil_bvs</AvatarFallback>
              </Avatar>
              &nbsp;<span className="text-white">@akhil_bvs</span>
            </div>
          </div>
        </div>
      </div>
      {loading ? <Skeleton /> : <DataPoints channel={channel} />}
      <StakeDialog balance={userStakedAmount} />
      <p className="mt-2 text-sm font-clashdisplay_medium text-white text-center">
        <span className="text-sm font-clashdisplay">Staked: </span>
        {formatNumber(userStakedAmount)} NOTES
      </p>
    </main>
  );
};

export default ChannelHeader;
