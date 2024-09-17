import { Skeleton } from '../ui/skeleton';

function ChannelDetailsSkeleton() {
  return (
    <div className="flex items-center justify-between my-6">
      <div>
        <Skeleton className="h-4 w-full" />
        <span className="col-span-full text-sm text-grey">Notes</span>
      </div>

      <div>
        <Skeleton className="h-4 w-full" />
        <span className="col-span-full text-sm text-grey">Staked</span>
      </div>

      <div>
        <Skeleton className="h-4 w-full" />
        <p className="col-span-full text-sm text-grey">Stakers</p>
      </div>
    </div>
  );
}

export default ChannelDetailsSkeleton;
