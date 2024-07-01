import { useEffect, useRef } from 'react';

const useHorizontalScroll = () => {
  const scrollerRef = useRef(null);

  useEffect(() => {
    const scroller: any = scrollerRef.current;
    let startOffset = 0;

    const autoScroll = () => {
      if (startOffset && startOffset >= scroller.scrollWidth - scroller.clientWidth) {
        scroller.scrollTo({ left: 0 });
        startOffset = 0;
      } else {
        startOffset += 1;
      }
      scroller.scrollTo({
        left: startOffset,
      });
    };

    const interval = setInterval(autoScroll, 16);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return { scrollerRef };
};

export default useHorizontalScroll;
