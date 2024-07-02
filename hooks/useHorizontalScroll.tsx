import { useEffect, useRef } from 'react';

const useHorizontalScroll = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if(!scroller) return;

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

    let interval = setInterval(autoScroll, 16);

    const playScroll = ()=> interval = setInterval(autoScroll, 16);
    const pauseScroll = ()=> clearInterval(interval);

    scroller.addEventListener('mouseenter',pauseScroll);
    scroller.addEventListener('mouseleave', playScroll);

    return () => {
      clearInterval(interval);
      scroller.removeEventListener('mouseenter', pauseScroll);
      scroller.removeEventListener('mouseleave', playScroll);
    };
  }, []);

  return { scrollerRef };
};

export default useHorizontalScroll;
