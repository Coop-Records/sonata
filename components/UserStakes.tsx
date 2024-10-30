import useUserStakes from '@/hooks/useUserStakes';
import formatNumber from '@/lib/formatNumber';
import Image from 'next/image';
import Loader from '@/components/Loader';

export default function UserStakes({ fid }: { fid?: number | null }) {
  const { loading, stakes } = useUserStakes(fid);

  if (loading) return <Loader />;
  return (
    <div className="max-w-full grow space-y-6">
      {stakes.map((stake) => (
        <div
          key={'stake_' + stake.channelId}
          className="flex w-full flex-wrap items-center gap-2 p-1"
        >
          <div className="relative size-8 overflow-hidden rounded-full ring-1 ring-slate-300">
            <Image src={stake.icon} alt="music-channel" className="object-cover" fill />
          </div>

          <h3 className="font-clashDisplay text-base/5 font-medium">/{stake.channelId}</h3>

          <h5 className="ml-auto text-sm/4 font-semibold">
            <span className="font-normal text-grey">Staked : </span> {formatNumber(stake.points)}{' '}
            NOTES
          </h5>
        </div>
      ))}
    </div>
  );
}
