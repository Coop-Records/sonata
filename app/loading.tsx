import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex size-full items-center justify-center">
      <Loader2 size="64" className="animate-spin" />
    </div>
  );
}
