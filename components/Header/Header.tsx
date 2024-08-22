'use client';
import Tabs from '@/components/Tabs';
import { tabs } from '@/lib/consts';
import { useNeynarProvider } from '@/providers/NeynarProvider';
import { useProfileProvider } from '@/providers/ProfileProvider';
import { FeedType } from '@/types/Feed';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import Profile from '../Profile';
import { Separator } from '../ui/separator';
import HeaderButtonsGroup from './HeaderButtonsGroup';

const Header = ({ className = '' }) => {
  const { user } = useNeynarProvider();
  const { username } = useParams();
  const { profile } = useProfileProvider();

  const filteredTabs = useMemo(() => {
    return tabs.filter(tab => {
      const userTabs = tab.value === FeedType.Posts || tab.value === 'stakes';
      if (username) return userTabs;

      const isDisabled = (tab.value === FeedType.Following && !user) || userTabs;
      return !isDisabled;
    })
  }, [username, user]);

  return (
    <header className={className}>
      <div className='mb-1 pt-2 md:pt-6'>
        <HeaderButtonsGroup />
      </div>
      <div className="container">
        {profile && <Profile />}
        <Tabs tabs={filteredTabs} className={!username ? 'justify-center' : ''} />
        <Separator className="-mt-px bg-grey-light" />
      </div>
    </header>
  );
};

export default Header;
