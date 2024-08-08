import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex grow flex-col items-center justify-center gap-10 text-center">
      <h2 className="text-3xl">Could not find user!</h2>
      <Link href="/" className={buttonVariants({ variant: 'default' })}>
        Return Home
      </Link>
    </div>
  );
}
