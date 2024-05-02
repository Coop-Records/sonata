'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import MobileMenu from './MobileMenu';
import { cn } from '@/lib/utils';
import Tabs from '@/components/Tabs';
import { tabs } from '@/lib/consts';
import CreateButton from '../CreateButton';

export default function HeaderMobile({ className }: { className?: string }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className={cn('w-screen flex items-center justify-between py-4', className)}>
        <Button variant="link" className="p-0 text-5xl md:hidden">
          <HamburgerMenuIcon onClick={() => setMenuOpen(!menuOpen)} className="size-6" />
        </Button>
        <Tabs tabs={tabs} />
        <CreateButton />
      </div>
      <MobileMenu open={menuOpen} setOpen={setMenuOpen} />
    </>
  );
}
