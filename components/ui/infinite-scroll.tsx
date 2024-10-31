import * as React from 'react';
import { useEffect } from 'react';
import { useIntersectionObserver } from 'usehooks-ts';

interface InfiniteScrollProps {
  hasMore: boolean;
  next: () => unknown;
  children?: React.ReactNode;
  loader?: React.ReactNode;
}

export default function InfiniteScroll({ hasMore, next, children, loader }: InfiniteScrollProps) {
  const [isLoadingMore, setIsLoadingMore] = React.useState(false);
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.8,
  });

  useEffect(() => {
    if (!(isIntersecting && hasMore && !isLoadingMore)) return;
    const loadMore = async () => {
      try {
        setIsLoadingMore(true);
        await next();
      } finally {
        setIsLoadingMore(false);
      }
    };
    loadMore();
  }, [isIntersecting, next, hasMore, isLoadingMore]);

  return (
    <>
      {children}
      {isLoadingMore ? loader : <div className="h-10" ref={ref} />}
    </>
  );
}
