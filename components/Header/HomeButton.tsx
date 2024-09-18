import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

const HomeButton = () => (
  <Link href="/">
    <ChevronLeft className="size-8 text-white" />
  </Link>
);

export default HomeButton;
