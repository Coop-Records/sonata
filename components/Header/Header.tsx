'use client';
import Tabs from '@/components/Tabs';
import { tabs } from '@/lib/consts';
import { useNeynarProvider } from '@/providers/NeynarProvider';
import { useProfileProvider } from '@/providers/ProfileProvider';
import { FeedType } from '@/types/Feed';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import Profile from '../Profile';
import { Separator } from '../ui/separator';
import HeaderButtonsGroup from './HeaderButtonsGroup';
import ChannelHeader from './ChannelHeader';
import useFeedScrollPosition from '@/hooks/useFeedScrollPosition';

const Header = ({ className = '' }) => {
  const { user } = useNeynarProvider();
  const { username, channelId } = useParams();
  const { profile } = useProfileProvider();
  const { scrollPosition } = useFeedScrollPosition();
  const [showLess, setShowLess] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  const filteredTabs = useMemo(() => {
    return tabs.filter((tab) => {
      const userTabs = tab.value === FeedType.Posts || tab.value === 'stakes';
      if (username) return userTabs;

      const isDisabled = (tab.value === FeedType.Following && !user) || userTabs;
      return !isDisabled;
    });
  }, [username, user]);

  useEffect(() => {
    const headerHeight = headerRef.current?.offsetHeight ?? 0;

    if (!headerHeight) return;

    if (scrollPosition > headerHeight + 10) setShowLess(true);
    else setShowLess(false);
  }, [scrollPosition, headerRef]);

  console.log("ZIAD", showLess)
  return (
    <header className={className} ref={headerRef}>
      <div className="mb-1 pt-2 md:pt-6">
        <HeaderButtonsGroup />
      </div>
      <div className="pl-6">
        {!channelId && profile && <Profile />}
        {channelId ? (
          <ChannelHeader />
        ) : (
          <p className="font-clashdisplay_semibold text-2xl text-white py-5 font-bold">
            Music on Farcaster
          </p>
        )}
        <Tabs tabs={filteredTabs} className={!username ? 'justify-start' : ''} />
        <Separator className="-mt-px bg-border" />
      </div>
    </header>
  );
};

export default Header;
