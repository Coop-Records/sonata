'use client';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Separator } from '../ui/separator';
import { useState } from 'react';

function StakeTabs({
  tabs,
  onSelect,
  className = '',
}: {
  onSelect: (value: any, index: number) => void;
  tabs: { label: string; value: any }[];
  className?: string;
}) {
  const [active, setActive] = useState(0);
  return (
    <div className={className}>
      <ul className="flex gap-4 md:gap-8">
        {tabs.map((tab, i) => {
          return (
            <li className={cn(active == i && 'border-b-2 border-black')} key={i}>
              <Button
                variant="ghost"
                className="p-0 text-sm font-semibold hover:bg-transparent md:text-base/5"
                onClick={() => {
                  setActive(i);
                  onSelect(tab.value, i);
                }}
              >
                {tab.label}
              </Button>
            </li>
          );
        })}
      </ul>
      <Separator className="-mt-px" />
    </div>
  );
}

export default StakeTabs;
