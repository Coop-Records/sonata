import { TITLE } from '@/lib/consts';
import Image from 'next/image';

export default function Title() {
  return (
    <div className="flex items-center justify-center space-x-2 md:space-x-3">
      <div>
        <Image src="/images/logo2.png" width={33} height={33} alt="logo" />
      </div>
      <div className="text-4xl font-bold">{TITLE}</div>
    </div>
  );
}
