'use client';
import { useState } from 'react';
import { Button } from '../ui/button';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import MobileMenu from './MobileMenu';
import { cn } from '@/lib/utils';
import { User2Icon } from 'lucide-react';
import Tabs from '@/components/Tabs';
import { tabs } from '@/lib/consts';

export default function HeaderMobile({ className }: { className?: string }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className={cn('w-full flex items-center justify-between py-4', className)}>
        <Button variant="link" className="p-0 text-5xl md:hidden">
          <HamburgerMenuIcon onClick={() => setMenuOpen(!menuOpen)} className="size-6" />
        </Button>
        <Tabs tabs={tabs} />
        <Button>
          <User2Icon />+
        </Button>
      </div>
      <MobileMenu open={menuOpen} setOpen={setMenuOpen} />
    </>
  );
}
