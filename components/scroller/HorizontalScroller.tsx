import useHorizontalScroll from '@/hooks/useHorizontalScroll';
import Link from 'next/link';

const HorizontalScroller = ({ items }: any) => {
  const { scrollerRef } = useHorizontalScroll();

  return (
    <div className="flex overflow-hidden bg-purple-light" ref={scrollerRef}>
      {items.concat(items).map((item: any, index: any) => (
        <div key={index} className="flex shrink-0 items-center gap-2 p-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.imgUrl} alt="" className="size-8 rounded-full" />
          <p className="font-sora text-base text-purple">
            <Link className='hover:text-purple-800' href={'/' + item.sender}>@{item.sender}</Link>
            {` tipped ${item.amount} NOTES to `}
            <Link className='hover:text-purple-800' href={'/' + item.receiver}>@{item.receiver}</Link>
          </p>
        </div>
      ))}
    </div>
  );
};
export default HorizontalScroller;
