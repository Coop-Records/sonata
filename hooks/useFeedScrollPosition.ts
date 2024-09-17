import { useState, useEffect } from 'react';

function useFeedScrollPosition(feedContainerName: string = 'feed-container') {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);

  const feedContainer =
    typeof window !== 'undefined' ? document.getElementById(feedContainerName) : null;

  useEffect(() => {
    const feedContainer = document?.getElementById(feedContainerName);

    if (!feedContainer) return;

    const handleScroll = () => {
      setScrollPosition(feedContainer.scrollTop);
      setScrollHeight(feedContainer.scrollHeight);
    };

    feedContainer.addEventListener('scroll', handleScroll);

    return () => {
      feedContainer.removeEventListener('scroll', handleScroll);
    };
  }, [feedContainerName]);

  return { scrollPosition, scrollHeight, feedContainer };
}

export default useFeedScrollPosition;
