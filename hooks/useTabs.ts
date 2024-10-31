import { useCallback, useEffect, useState } from 'react';
import useQueryParams from '@/hooks/useQueryParams';
import { Tab } from '@/types/Tab';
import { usePrivy } from '@privy-io/react-auth';

export default function useTabs(tabs: Tab[]) {
  const { queryParams, setQueryParam } = useQueryParams();
  const { ready: authReady } = usePrivy();

  const getTab = useCallback(() => {
    const tab = queryParams.get('tab');
    const found = tabs.findIndex((t) => t.value === tab);

    if (found >= 0) return found;
    return 0;
  }, [queryParams, tabs]);

  const [activeTab, setActiveTab] = useState<number | null>(null);

  useEffect(() => {
    if (!authReady || activeTab !== null) return;
    const tab = getTab();
    setActiveTab(tab);
  }, [tabs, getTab, authReady, activeTab]);

  useEffect(() => {
    if (activeTab !== null) {
      setQueryParam('tab', tabs[activeTab].value);
    }
  }, [activeTab, tabs, setQueryParam]);

  return { getTab, activeTab, setActiveTab };
}
