'use client';
import { Button } from '@/components/ui/button';
import useQueryParams from '@/hooks/useQueryParams';
import { cn } from '@/lib/utils';
import { useCallback, useEffect, useState } from 'react';

interface Props {
  tabs: {
    label: string;
    href?: string;
    value: string;
  }[];
  className?: string;
  onChange?: (value: string) => void;
};

export default function Tabs({ tabs, className = '', onChange }: Props) {
  const { setQueryParam, queryParams } = useQueryParams();
  const getTab = useCallback(() => {
    const tab = queryParams.get('tab');
    const found = tabs.findIndex(t => t.value === tab);
    console.log({ found });

    if (found >= 0) return found;
    return 0;
  }, [queryParams, tabs]);
  const [active, setActive] = useState(getTab);

  useEffect(() => {
    const index = getTab();
    setActive(index);
  }, [tabs, getTab]);

  const onTabChange = (value: string, index: number) => {
    if (onChange) onChange(value);
    setActive(index);
    setQueryParam('tab', value);
  }

  return (
    <ul className={cn('flex gap-4 md:gap-8', className)}>
      {tabs.map((tab, index) => {
        return (
          <li className={cn(active === index && 'border-b-2 border-black')} key={index}>
            <Button
              variant="ghost"
              className="p-0 text-sm font-bold hover:bg-transparent md:text-lg"
              onClick={() => onTabChange(tab.value, index)}>
              {tab.label}
            </Button>
          </li>
        );
      })}
    </ul>
  );
}