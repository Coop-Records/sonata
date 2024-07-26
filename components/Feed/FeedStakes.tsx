import { FeedStake } from "@/types/Feed";
import Image from "next/image";


export default function FeedStakes({ feed }: { feed: FeedStake[] }) {
  return (
    <div className="max-w-full grow space-y-6">
      {feed.map(stake => (
        <div key={'stake_' + stake.channelId} className="flex w-full flex-wrap items-center gap-2">
          <Image src={stake.icon} alt='music-channel' height={48} width={48} className="size-12 rounded-full" />
          <div className="space-y-1">
            <h3 className="text-base/5 font-semibold">/{stake.channelId}</h3>
            <p className="max-w-[350px] truncate text-sm/4 text-gray-500">{stake.description}</p>
          </div>

          <h5 className="ml-auto text-sm/4 font-semibold">
            <span className="font-normal text-grey">Staked :</span> {stake.points} NOTES
          </h5>
        </div>
      ))}
    </div>
  );
}
