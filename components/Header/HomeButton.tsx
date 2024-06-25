import { useFeedProvider } from '@/providers/FeedProvider';
import { FeedType } from '@/types/Feed';
import { useRouter } from 'next/navigation';

const HomeButton = () => {
  const { push } = useRouter();
  const { setFeedType } = useFeedProvider();

  const onClick = () => {
    setFeedType(FeedType.Trending);
    push('/');
  };

  return (
    <button className="flex w-full items-center gap-3" type="button" onClick={onClick}>
      <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M7 13L1 7L7 1"
          stroke="#333536"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <p className="font-sora text-[18px] font-semibold">Home</p>
    </button>
  );
};

export default HomeButton;
