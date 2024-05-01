import { DESCRIPTION, TITLE } from '@/lib/consts';
import { cn } from '@/lib/utils';
export default function Title({ className }: { className?: string }) {
  return (
    <div className={cn('space-y-2 text-center md:space-y-3', className)}>
      <p className="text-xl font-bold tracking-tighter md:text-5xl">{TITLE}.</p>
      <p className="text-sm font-bold md:text-xl">{DESCRIPTION}.</p>
    </div>
  );
}
