import { TITLE } from '@/lib/consts';
import { cn } from '@/lib/utils';

const Title = ({ className }: { className?: string }) => (
  <div className={cn('space-y-2 text-center md:space-y-3', className)}>
    <p className="text-xl font-bold tracking-tighter md:text-5xl">{TITLE}</p>
  </div>
);

export default Title;
