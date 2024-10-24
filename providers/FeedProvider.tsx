'use client';
import { FeedType } from '@/types/Feed';
import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react';
import { SupabasePost } from '@/types/SupabasePost';
import findValidEmbed from '@/lib/findValidEmbed';
import mergeArraysUniqueByPostHash from '@/lib/mergeArraysUniqueByPostHash';
import { fetchPostsLimit } from '@/lib/consts';
import fetchMetadata from '@/lib/fetchMetadata';
import { usePlayer } from '@/providers/audio/PlayerProvider';
import { useProfileProvider } from './ProfileProvider';
import { useParams, useSearchParams } from 'next/navigation';
import { usePrivy } from '@privy-io/react-auth';
import qs from 'qs';

type FeedProviderType = {
  feed: SupabasePost[];
  feedType?: FeedType;
  setFeedType: (feedType: FeedType) => void;
  fetchMore: (start: number) => void;
  hasMore: boolean;
  handleNext: () => void;
  handlePrev: () => void;
};

const FeedContext = createContext<FeedProviderType>({} as any);

const FeedProvider = ({ children }: { children: ReactNode }) => {
  const { channelId }: { channelId: string } = useParams();
  const tab = useSearchParams().get('tab');
  const [feed, setFeed] = useState<SupabasePost[]>([]);
  const [feedType, setFeedType] = useState<FeedType>();
  const [hasMore, setHasMore] = useState(true);
  const { user, ready: privyReady } = usePrivy();
  const [player, dispatch] = usePlayer();
  const { profile, loading: profileLoading, error: profileError } = useProfileProvider();

  const fid = user?.farcaster?.fid;
  const profileFid = profile?.fid;

  useEffect(() => {
    if (!privyReady || profileLoading || profileError) return;
    if (tab && Object.values(FeedType).includes(tab as FeedType)) {
      setFeedType(tab as FeedType);
    } else if (channelId) setFeedType(FeedType.Trending);
    else if (profileFid) setFeedType(FeedType.Posts);
    else if (fid) setFeedType(FeedType.Following);
    else setFeedType(FeedType.Trending);
  }, [privyReady, profileLoading, profileError, profileFid, channelId, tab, fid]);

  const fetchMore = useCallback(
    async (start: number) => {
      if (!feedType) return;
      setHasMore(true);
      const queryString = qs.stringify({
        feedType,
        start,
        channelId,
        viewerFid: fid,
        authorFid: profileFid,
      });
      const posts = await fetch(`/api/feed?${queryString}`).then((res) => res.json());
      if (!(posts && posts.length === fetchPostsLimit)) {
        setHasMore(false);
      }
      setFeed((prev) => {
        const mergedUnique = mergeArraysUniqueByPostHash(prev, posts);
        if (profileFid) return mergedUnique.filter((feed) => feed.authorFid === profileFid);
        return mergedUnique;
      });
    },
    [feedType, channelId, fid, profileFid],
  );

  useEffect(() => {
    const init = async () => {
      setFeed([]);
      await fetchMore(0);
    };
    init();
  }, [fetchMore]);

  const playFeedId = async (feedIndex: number) => {
    const embed = findValidEmbed(feed[feedIndex]);
    const feedObj = feed[feedIndex];
    const url = embed?.url;
    if (url) {
      const metadata = await fetchMetadata(url, feedObj);
      if (metadata)
        dispatch({
          type: 'PLAY',
          payload: { metadata, feedId: feedObj.id },
        });
    }
  };

  const handleNext = async () => {
    const feedIndex = feed.findIndex((feedObj: SupabasePost) => feedObj.id === player.feedId);

    if (feedIndex > -1) {
      if (feedIndex + 1 < feed.length) {
        playFeedId(feedIndex + 1);
      }
      return;
    }
    playFeedId(0);
  };

  const handlePrev = async () => {
    const feedIndex = feed.findIndex((feedObj: SupabasePost) => feedObj.id === player.feedId);
    if (feedIndex > -1) {
      if (feedIndex && feedIndex > 0) {
        playFeedId(feedIndex - 1);
      }
      return;
    }
    playFeedId(0);
  };

  const value = {
    feed,
    feedType,
    setFeedType,
    fetchMore,
    hasMore,
    handleNext,
    handlePrev,
  };

  return <FeedContext.Provider value={value}>{children}</FeedContext.Provider>;
};

export const useFeedProvider = () => {
  const context = useContext(FeedContext);
  if (!context) {
    throw new Error('useFeedProvider must be used within a FeedProvider');
  }
  return context;
};

export default FeedProvider;
