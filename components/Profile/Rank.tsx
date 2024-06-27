import useRank from '@/hooks/useRank';

const Rank = () => {
  const rank = useRank();

  return (
    <>
      {rank && rank > 0 && (
        <div className="flex h-[33px] items-center justify-center rounded-full bg-grey-light px-4 font-sora text-[14px] font-semibold">
          <div className="flex w-fit flex-col justify-center">
            <p className="font-sora text-[16px] font-semibold">#{rank}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Rank;
