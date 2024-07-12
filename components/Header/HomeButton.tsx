import { cn } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

const HomeButton = ({ className}: { className?: string }) => {
  return (
    <Link href='/' className={cn("flex items-center gap-1", className)}>
      <ChevronLeft/>
      <p className="font-sora text-[18px] font-semibold">Home</p>
    </Link>
  );
};

export default HomeButton;
