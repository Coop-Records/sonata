import { useCallback, useEffect, useState } from "react";
import useQueryParams from "./useQueryParams";

export default function useTabs(tabs: { value: string }[]) {
  const { queryParams } = useQueryParams();

  const getTab = useCallback(() => {
    const tab = queryParams.get('tab');
    const found = tabs.findIndex(t => t.value === tab);

    if (found >= 0) return found;
    return 0;
  }, [queryParams, tabs]);

  const [activeTab, setActiveTab] = useState(getTab);

  useEffect(() => {
    const index = getTab();
    setActiveTab(index);
  }, [tabs, getTab]);

  return { getTab, activeTab, setActiveTab };
}