'use client';
import useQueryParams from '@/hooks/useQueryParams';
import useTabs from '@/hooks/useTabs';
import { cn } from '@/lib/utils';
import Tab from './Tab';

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
  const { setQueryParam } = useQueryParams();
  const { activeTab, setActiveTab } = useTabs(tabs);

  const onTabChange = (value: string, index: number) => {
    if (onChange) onChange(value);
    setActiveTab(index);
    setQueryParam('tab', value);
  };

  return (
    <ul className={cn('flex gap-4 md:gap-8', className)}>
      {tabs.map((tab, index) => (
        <Tab
          tab={tab}
          key={index}
          className={cn(activeTab === index && 'border-b-2 border-black')}
          onClick={() => onTabChange(tab.value, index)}
        />
      ))}
    </ul>
  );
}