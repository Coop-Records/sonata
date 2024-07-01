import { useEffect, useState } from 'react';
import getFormattedTips from '@/lib/getFormattedTips';

const useTipsBanner = () => {
  const [tips, setTips] = useState([]);

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const response = await fetch('/api/tips');
        const result = await response.json();
        if (response.ok) {
          const formattedTips: any = await getFormattedTips(result.tips);
          setTips(formattedTips);
        }
      } catch (error: any) {
        console.error(error);
      }
    };

    fetchTips();
  }, []);

  return { tips };
};

export default useTipsBanner;
