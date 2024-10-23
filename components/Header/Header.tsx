'use client';
import Tabs from '@/components/Tabs';
import { tabs } from '@/lib/consts';
import { useProfileProvider } from '@/providers/ProfileProvider';
import { FeedType } from '@/types/Feed';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import Profile from '../Profile';
import { Separator } from '../ui/separator';
import HeaderButtonsGroup from './HeaderButtonsGroup';
import { usePrivy } from '@privy-io/react-auth';
import { cn } from '@/lib/utils';

const Header = ({ className = '' }) => {
  const { authenticated } = usePrivy();
  const { username } = useParams();
  const { profile } = useProfileProvider();

  const filteredTabs = useMemo(() => {
    return tabs.filter((tab) => {
      const userTabs = tab.value === FeedType.Posts || tab.value === 'stakes';
      if (username) return userTabs;

      const isDisabled = (tab.value === FeedType.Following && !authenticated) || userTabs;
      return !isDisabled;
    });
  }, [username, authenticated]);

  return (
    <header className={cn('mt-6 md:mt-12', className)}>
      <HeaderButtonsGroup />
      <div className="container">
        {profile && <Profile />}
        <Tabs tabs={filteredTabs} className={cn('mt-4', !username && 'justify-start')} />
        <Separator className="-mt-px bg-grey-light" />
      </div>
    </header>
  );
};

export default Header;
