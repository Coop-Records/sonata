'use client';
import { FeedFilter, FeedType } from '@/types/Feed';
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { SupabasePost } from '@/types/SupabasePost';
import findValidEmbed from '@/lib/findValidEmbed';
import fetchPosts from '@/lib/supabase/fetchPosts';
import mergeArraysUniqueByPostHash from '@/lib/mergeArraysUniqueByPostHash';
import { useNeynarProvider } from './NeynarProvider';
import { fetchPostsLimit } from '@/lib/consts';
import { supabaseClient } from '@/lib/supabase/client';
import fetchMetadata from '@/lib/fetchMetadata';
import { usePlayer } from '@/providers/audio/PlayerProvider';
import { useProfileProvider } from './ProfileProvider';

type FeedProviderType = {
  filter: FeedFilter;
  updateFilter: (change: FeedFilter) => void;
  feed: SupabasePost[];
  feedType?: string;
  setFeedType: (feedType: string) => void;
  fetchMore: (start: number) => void;
  hasMore: boolean;
  handleNext: () => void;
  handlePrev: () => void;
};

const FeedContext = createContext<FeedProviderType>({} as any);

const FeedProvider = ({ children }: { children: ReactNode }) => {
  const [filter, setFilter] = useState<FeedFilter>({});
  const [feed, setFeed] = useState<SupabasePost[]>([]);
  const [feedType, setFeedType] = useState<string>();
  const [hasMore, setHasMore] = useState(true);
  const { user, loading: userLoading } = useNeynarProvider();
  const [player, dispatch] = usePlayer();
  const { profile } = useProfileProvider();

  const fid = user?.fid;
  const profileFid = profile?.fid;

  useEffect(() => {
    if (userLoading) return;
    if (profileFid) {
      setFeedType(FeedType.Posts);
      return;
    }
    if (user) {
      setFeedType(FeedType.Following);
    } else {
      setFeedType(FeedType.Trending);
    }
  }, [userLoading, user, profileFid]);

  const updateFilter = (change: FeedFilter) => {
    setFilter((prev) => ({ ...prev, ...change }));
  };

  const fetchMore = useCallback(
    async (start: number) => {
      if (!feedType) return;
      setHasMore(true);
      const { posts } = await fetchPosts(supabaseClient, filter, feedType, start, fid, profileFid);
      if (!(posts && posts.length === fetchPostsLimit)) {
        setHasMore(false);
      }
      setFeed((prev) => {
        const mergedUnique = mergeArraysUniqueByPostHash(prev, posts);
        if (profileFid) return mergedUnique.filter((feed) => feed.authorFid === profileFid);
        return mergedUnique;
      });
    },
    [feedType, filter, supabaseClient, fid, profileFid],
  );

  useEffect(() => {
    const init = async () => {
      setFeed([]);
      await fetchMore(0);
    };
    init();
  }, [fetchMore]);

  const filteredFeed = useMemo(
    () =>
      feed.filter((cast) => {
        const channelId = cast.channelId;

        if (filter.channel) {
          if (!(channelId && channelId.includes(filter.channel))) return false;
        }

        if (profileFid && cast.authorFid !== profileFid) return false;

        const validEmbed = findValidEmbed(cast, { platform: filter.platform });
        if (!validEmbed) return false;

        return true;
      }),
    [feed, filter, profileFid],
  );

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
    filter,
    updateFilter,
    feed: filteredFeed,
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
