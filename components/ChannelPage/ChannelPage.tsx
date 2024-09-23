'use client';

import Feeds from '@/app/(feeds)/feeds';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { tabs } from '@/lib/consts';
import { FeedType } from '@/types/Feed';
import { useStakeProvider } from '@/providers/StakeProvider';
import ChannelHeader from '../Header/ChannelHeader';
import useFeedScrollPosition from '@/hooks/useFeedScrollPosition';
import DataPoints from '../ChannelDetails/DataPoints';
import formatNumber from '@/lib/formatNumber';
import StakeDialog from '../ChannelDetails/StakeDialog';
import Skeleton from '../ChannelDetails/Skeleton';
import Tabs from '../Tabs';
import { Separator } from '../ui/separator';

const ChannelPage = () => {
  const { scrollPosition } = useFeedScrollPosition();
  const [showLess, setShowLess] = useState(false);
  const stickyRef = useRef<HTMLDivElement>(null);
  const { username } = useParams();
  const { loading, channelDetails: channel, userStakedAmount } = useStakeProvider();
  const filteredTabs = tabs.filter(
    (tab) => tab.value === FeedType.Trending || tab.value === FeedType.Recent,
  );

  useEffect(() => {
    const stickyHeight = stickyRef.current?.offsetHeight ?? 0;

    if (!stickyHeight) return;

    if (scrollPosition > stickyHeight + 10) setShowLess(true);
    else setShowLess(false);
  }, [scrollPosition, stickyRef]);

  return (
    <div className="size-full overflow-y-hidden">
      <ChannelHeader />
      <div id="channel-sticky" className="size-full overflow-y-auto">
        <div ref={stickyRef}>
          {loading ? <Skeleton /> : <DataPoints channel={channel} />}
          <StakeDialog balance={userStakedAmount} />
          <p className="mt-2 text-sm font-clashdisplay_medium text-white text-center mb-6">
            <span className="text-sm font-clashdisplay">Staked: </span>
            {formatNumber(userStakedAmount)} NOTES
          </p>
        </div>
        <Tabs
          tabs={filteredTabs}
          className={!username ? 'justify-start' : ''}
          isSticky={showLess}
        />
        <Separator className="-mt-px bg-border mb-4" />
        <Feeds />
      </div>
    </div>
  );
};

export default ChannelPage;
