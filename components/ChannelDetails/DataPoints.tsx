import formatNumber from '@/lib/formatNumber';
import NotesIcon from '@/components/NotesIcon';
import { Skeleton } from '@/components/ui/skeleton';

function DataPoints({ channel }: { channel: any }) {
  const stats = [
    { label: 'Balance', value: channel?.balance, notes: true },
    { label: 'Staked', value: channel?.staking?.staked, notes: true },
    { label: 'Stakers', value: channel?.staking?.stakers },
  ];
  return (
    <div className="flex justify-between">
      {stats.map((stat) => (
        <div key={stat.label} className="space-y-1">
          <div className="flex items-center gap-1">
            <p className="font-clashDisplay font-semibold leading-none">
              {stat?.value ? formatNumber(stat.value) : <Skeleton className="h-4 w-12" />}
            </p>
            {stat?.notes && <NotesIcon size={16} />}
          </div>

          <p className="text-sm text-muted-foreground">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}

export default DataPoints;
