import { useState, useEffect } from 'react';

function useFeedScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);

  const feedContainer =
    typeof window !== 'undefined' ? document.getElementById('channel-sticky') : null;

  useEffect(() => {
    const feedContainer = document?.getElementById('channel-sticky');

    if (!feedContainer) return;

    const handleScroll = () => {
      setScrollPosition(feedContainer.scrollTop);
      setScrollHeight(feedContainer.scrollHeight);
    };

    feedContainer.addEventListener('scroll', handleScroll);

    return () => {
      feedContainer.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { scrollPosition, scrollHeight, feedContainer };
}

export default useFeedScrollPosition;
