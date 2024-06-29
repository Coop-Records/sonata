// HorizontalScroller.js
import React, { useEffect, useRef } from 'react';
import './scroller.css'; // Styles

const HorizontalScroller = ({ items }: any) => {
  const scrollerRef = useRef(null);

  useEffect(() => {
    const scroller: any = scrollerRef.current;
    let startOffset: any = 0;

    const autoScroll = () => {
      if (startOffset && startOffset >= scroller.scrollWidth - scroller.clientWidth) {
        scroller.scrollTo({ left: 0 }); // Reset scroll
        startOffset = 0;
      } else {
        startOffset += 1; // Adjust scroll increment
      }
      scroller.scrollTo({
        left: startOffset,
      });
    };

    const interval = setInterval(autoScroll, 16); // Scroll every 16ms

    return () => {
      clearInterval(interval); // Clear interval on component unmount
    };
  }, []);

  return (
    <div className="scroller-container" ref={scrollerRef}>
      <div className="scroller">
        {items.concat(items).map((item: any, index: any) => (
          <div key={index} className="scroller-item">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalScroller;
