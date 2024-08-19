'use client';
import ClaimAirdropButton from '@/components/ClaimAirdropButton/ClaimAirdropButton';
import SignInButton from '@/components/SignInButton';
import Tabs from '@/components/Tabs';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { tabs } from '@/lib/consts';
import { cn } from '@/lib/utils';
import { useNeynarProvider } from '@/providers/NeynarProvider';
import { useTipProvider } from '@/providers/TipProvider';
import { useUi } from '@/providers/UiProvider';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { useParams } from 'next/navigation';
import Profile from '../Profile';
import { Separator } from '../ui/separator';
import HomeButton from './HomeButton';
import UserMenu from './UserMenu';
import ChannelDetails from '../ChannelDetails';
import { useStakeProvider } from '@/providers/StakeProvider';
import { useProfileProvider } from '@/providers/ProfileProvider';
import { FeedType } from '@/types/Feed';
import { useMemo } from 'react';

const Header = () => {
  const { user, loading: userLoading } = useNeynarProvider();
  const { menuOpen, setMenuOpen } = useUi();
  const { airdropBalance } = useTipProvider();
  const { username, channelId } = useParams();
  const { channelImage } = useStakeProvider();
  const { profile } = useProfileProvider();

  const filteredTabs = useMemo(() => {
    return tabs.filter(tab => {
      const userTabs = tab.value === FeedType.Posts || tab.value === 'stakes';
      if (username) return userTabs;

      const isDisabled = (tab.value === FeedType.Following && (!user || channelId)) || userTabs;
      return !isDisabled;
    })
  }, [username, channelId, user]);

  return (
    <header>
      <div
        style={
          channelId
            ? {
              backgroundImage: `url("${channelImage}")`,
              boxShadow: 'inset 0 0 0 1000px #141a1eb2',
            }
            : undefined
        }
        className={cn(
          'mb-1',
          channelId ? 'h-[10.75rem] bg-cover bg-center bg-no-repeat pt-12' : 'pt-2 md:pt-6',
        )}
      >
        <div className="container flex items-center justify-between md:justify-end">
          <Button
            variant="link"
            className={cn('p-0 text-5xl md:hidden', channelId && 'text-white')}
          >
            <HamburgerMenuIcon onClick={() => setMenuOpen(!menuOpen)} className="size-6" />
          </Button>
          {(username || channelId) && (
            <HomeButton className={cn('mr-auto max-md:hidden', channelId && 'text-white')} />
          )}
          {userLoading ? (
            <Skeleton className="size-9 rounded-full" />
          ) : user ? (
            <div className="flex items-center gap-2">
              {airdropBalance > 0 && <ClaimAirdropButton />}
              <UserMenu />
            </div>
          ) : (
            <SignInButton />
          )}
        </div>
      </div>
      <div className="container">
        {channelId && <ChannelDetails channelId={channelId as string} />}
        {profile && <Profile />}
        <Tabs tabs={filteredTabs} className={!(username || channelId) ? 'justify-center' : ''} />
        <Separator className="-mt-px bg-grey-light" />
      </div>
    </header>
  );
};

export default Header;
