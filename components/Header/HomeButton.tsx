import Link from 'next/link';

const HomeButton = () => {
  return (
    <div className="w-full">
      <Link href="/" className="flex items-center gap-3">
        <svg
          width="8"
          height="14"
          viewBox="0 0 8 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 13L1 7L7 1"
            stroke="#333536"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <p className="font-sora text-[18px] font-semibold">Home</p>
      </Link>
    </div>
  );
};

export default HomeButton;
