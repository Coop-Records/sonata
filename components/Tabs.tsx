'use client';
import useTabs from '@/hooks/useTabs';
import { cn } from '@/lib/utils';
import { Tab as TabType } from '@/types/Tab';
import { usePrivy } from '@privy-io/react-auth';
import { useMemo } from 'hono/jsx';
import { Button } from './ui/button';

interface Props {
  tabs: TabType[];
  className?: string;
  onChange?: (value: string) => void;
}

export default function Tabs({ tabs, className = '', onChange }: Props) {
  const { authenticated } = usePrivy();
  const filteredTabs = useMemo(() => {
    return tabs.filter((tab) => !tab.auth || authenticated);
  }, [tabs, authenticated]);

  const { activeTab, setActiveTab } = useTabs(filteredTabs);

  const onTabChange = (value: string, index: number) => {
    if (onChange) onChange(value);
    setActiveTab(index);
  };

  return (
    <ul className={cn('flex gap-4 md:gap-8 border-b', className)}>
      {filteredTabs.map((tab, index) => (
        <li
          key={`tab-${tab.value}`}
          className={cn(activeTab === index && 'border-b-2 border-white')}
        >
          <Button
            variant="ghost"
            className="p-0 hover:bg-transparent md:text-lg"
            onClick={() => onTabChange(tab.value, index)}
          >
            {tab.label}
          </Button>
        </li>
      ))}
    </ul>
  );
}
