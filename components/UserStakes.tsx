import formatNumber from '@/lib/formatNumber';
import { UserStake } from '@/types/Stake';
import Image from 'next/image';

export default function UserStakes({ stakes }: { stakes: UserStake[] }) {
  return (
    <div className="max-w-full grow space-y-6">
      {stakes.map((stake) => (
        <div
          key={'stake_' + stake.channelId}
          className="flex w-full flex-wrap items-center gap-2 p-1"
        >
          <Image src={stake.icon} alt="" height={32} width={32} className="size-8 rounded-full" />
          <div className="space-y-1">
            <h3 className="text-base/5 text-white font-clashdisplay_semibold">
              /{stake.channelId}
            </h3>
          </div>

          <h5 className="ml-auto w-[10.32rem] text-sm font-[600] text-white">
            <span className="font-[400]">Staked : </span> {formatNumber(stake.points)} NOTES
          </h5>
        </div>
      ))}
    </div>
  );
}
