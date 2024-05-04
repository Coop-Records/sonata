import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export default function Loader({ className = '' }) {
  return (
    <div className={cn('flex items-center justify-center', className)}>
      <Loader2 size="32" className="animate-spin" />
    </div>
  );
}
