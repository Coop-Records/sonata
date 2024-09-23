import formatNumber from '@/lib/formatNumber';
import Image from 'next/image';

function DataPoints({ channel }: { channel: any }) {
  return (
    <div className="my-4 flex justify-between">
      <div className="grid grid-cols-[auto_1fr] gap-x-1 items-center">
        <span className="font-clashdisplay_medium text-lg text-white">34.7K</span>
        <Image src="/images/notes.png" width={16} height={16} alt="notes" />
        <span className="col-span-full text-sm text-grey">Balance</span>
      </div>

      <div className="grid grid-cols-[auto_1fr] gap-x-1 items-center">
        <span className="font-clashdisplay_medium text-lg text-white">
          {formatNumber(channel.staking.staked)}
        </span>
        <Image src="/images/notes.png" width={16} height={16} alt="notes" />
        <span className="col-span-full text-sm text-grey">Staked</span>
      </div>

      <div>
        <span className="font-clashdisplay_medium text-lg text-white">
          {formatNumber(channel.staking.stakers)}
        </span>
        <p className="col-span-full text-sm text-grey">Stakers</p>
      </div>
    </div>
  );
}

export default DataPoints;
