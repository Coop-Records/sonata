'use client';
import Tabs from '@/components/Tabs';
import useFeedScrollPosition from '@/hooks/useFeedScrollPosition';
import { tabs } from '@/lib/consts';
import { cn } from '@/lib/utils';
import { useStakeProvider } from '@/providers/StakeProvider';
import { FeedType } from '@/types/Feed';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import ChannelDetails from '../ChannelDetails';
import { Separator } from '../ui/separator';
import HeaderButtonsGroup from './HeaderButtonsGroup';
import { useEffect, useRef, useState } from 'react';
import { useSpring, animated } from 'react-spring';

const ChannelHeader = ({ className = '' }) => {
  const { channelId } = useParams();
  const { channelImage } = useStakeProvider();
  const { scrollPosition } = useFeedScrollPosition();
  const [showLess, setShowLess] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const filteredTabs = tabs.filter(
    ({ value }) => value == FeedType.Recent || value == FeedType.Trending,
  );

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
    <>
      <header className={cn('z-10', className)} ref={headerRef}>
        <div className="grid grid-rows-[172px_60px] max-md:grid-rows-[172px] [&>*]:col-span-full">
          <div
            style={{
              backgroundImage: `url("${channelImage}")`,
              boxShadow: 'inset 0 0 0 1000px #141a1eb2',
            }}
            className="row-[1/2] bg-cover bg-center bg-no-repeat pt-12"
          >
            <HeaderButtonsGroup />
          </div>

          <div className="container row-span-full self-end">
            <Image
              src={channelImage ?? ''}
              height={120}
              width={120}
              className="size-[120px] rounded-full border-[5px] border-white object-cover max-md:hidden"
              alt={channelId as string}
            />
          </div>
        </div>

        <div className="container pt-4">
          <ChannelDetails channelId={channelId as string} />
          <Tabs tabs={filteredTabs} />
          <Separator className="-mt-px bg-grey-light" />
        </div>
      </header>

      {showLess && (
        <animated.div className={cn('sticky top-0 z-10 bg-white', className)} style={animation}>
          <div className="container flex items-center gap-3 py-2 shadow-sm">
            <Image
              src={channelImage}
              height={40}
              width={40}
              className="size-10 rounded-full object-cover"
              alt={channelId as string}
            />
            <h1 className="text-xl font-semibold">/{channelId}</h1>
          </div>
        </animated.div>
      )}
    </>
  );
};

export default ChannelHeader;
