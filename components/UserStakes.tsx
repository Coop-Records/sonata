import formatNumber from "@/lib/formatNumber";
import { UserStake } from "@/types/Stake";
import Image from "next/image";

export default function UserStakes({ stakes }: { stakes: UserStake[] }) {
  return (
    <div className="max-w-full grow space-y-6">
      {stakes.map(stake => (
        <div key={'stake_' + stake.channelId} className="flex w-full flex-wrap items-center gap-2 p-1">
          <Image src={stake.icon} alt='music-channel' height={48} width={48} className="size-12 rounded-full ring-1 ring-slate-300" />
          <div className="space-y-1">
            <h3 className="text-base/5 font-semibold">/{stake.channelId}</h3>
            <p className="max-w-[350px] truncate text-sm/4 text-gray-500">{stake.description}</p>
          </div>

          <h5 className="ml-auto w-[10.32rem] text-sm/4 font-semibold">
            <span className="font-normal text-grey">Staked : </span> {formatNumber(stake.points)} NOTES
          </h5>
        </div>
      ))}
    </div>
  );
}
