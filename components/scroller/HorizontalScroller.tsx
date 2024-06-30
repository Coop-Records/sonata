import React, { useEffect, useRef } from 'react';

const HorizontalScroller = ({ items }: any) => {
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

  return (
    <div className=" overflow-hidden whitespace-nowrap w-full " ref={scrollerRef}>
      <div className=" inline-flex">
        {items.concat(items).map((item: any, index: any) => (
          <div key={index} className="min-w-[200px] p-5 bg-[#eee4fe] flex items-center gap-2">
            <img src={item.imgUrl} alt="" className=" w-8 h-8 rounded-full" />
            <p className="text-[#8B49F7] text-base font-sora">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default HorizontalScroller;
