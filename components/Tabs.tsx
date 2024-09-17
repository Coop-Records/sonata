'use client';
import useQueryParams from '@/hooks/useQueryParams';
import useTabs from '@/hooks/useTabs';
import { cn } from '@/lib/utils';
import Tab from './Tab';
import { useSpring, animated } from 'react-spring';

interface Props {
  tabs: {
    label: string;
    href?: string;
    value: string;
  }[];
  className?: string;
  onChange?: (value: string) => void;
  isSticky?: boolean;
}

export default function Tabs({ tabs, className = '', onChange, isSticky = false }: Props) {
  const { setQueryParam } = useQueryParams();
  const { activeTab, setActiveTab } = useTabs(tabs);

  const onTabChange = (value: string, index: number) => {
    if (onChange) onChange(value);
    setActiveTab(index);
    setQueryParam('tab', value);
  };

  const animation = useSpring({
    transform: isSticky ? 'translateY(0)' : 'translateY(-20px)',
    config: { tension: 200, friction: 20, bounce: 0 },
  });

  return (
    <animated.ul
      className={`flex gap-4 md:gap-8 w-full ${className} ${isSticky ? 'sticky top-0 z-10 backdrop-blur-[2px] bg-[#0000000D]' : ''}`}
      style={isSticky ? animation : {}}
    >
      {tabs.map((tab, index) => (
        <Tab
          tab={tab}
          key={index}
          className={cn(activeTab === index && 'border-b-2 border-white')}
          onClick={() => onTabChange(tab.value, index)}
        />
      ))}
    </animated.ul>
  );
}
