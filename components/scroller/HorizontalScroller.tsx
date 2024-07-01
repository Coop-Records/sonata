import useHorizontalScroll from '@/hooks/useHorizontalScroll';

const HorizontalScroller = ({ items }: any) => {
  const { scrollerRef } = useHorizontalScroll();

  return (
    <div className=" w-full overflow-hidden whitespace-nowrap " ref={scrollerRef}>
      <div className=" inline-flex">
        {items.concat(items).map((item: any, index: any) => (
          <div key={index} className="flex min-w-[200px] items-center gap-2 bg-[#eee4fe] p-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.imgUrl} alt="" className="size-8 rounded-full" />
            <p className="font-sora text-base text-[#8B49F7]">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default HorizontalScroller;
