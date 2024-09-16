'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const useQueryParams = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [queryParams, setQueryParams] = useState(new URLSearchParams(searchParams.toString()));

  const setQueryParam = (key: string, value: string) => {
    const searchParams = new URLSearchParams(queryParams);
    if (value === null) {
      searchParams.delete(key);
    } else {
      searchParams.set(key, value);
    }
    router.replace(`?${searchParams.toString()}`);
  };

  useEffect(() => {
    setQueryParams(new URLSearchParams(searchParams.toString()));
  }, [searchParams]);

  return { queryParams, setQueryParam };
};

export default useQueryParams;
