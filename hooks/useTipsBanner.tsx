import { useEffect, useState } from 'react';
import getUser from '@/lib/sonata/getUser';

const useTipsBanner = () => {
  const [tips, setTips] = useState([]);

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const response = await fetch('/api/tips');
        const result = await response.json();
        console.log('SWEETS result', result);

        if (response.ok) {
          const formattedTips: any = await Promise.all(
            result.tips.map(async (tip: any) => {
              const senderUser = await getUser(tip.sender);
              const receiverUser = await getUser(tip.receiver);
              return {
                text: `@${senderUser.username} tipped ${tip.amount} notes to @${receiverUser.username}`,
                imgUrl: senderUser.pfp_url,
              };
            }),
          );

          setTips(formattedTips);
        }
      } catch (error: any) {
        console.error('SWEETS', error);
      }
    };

    fetchTips();
  }, []);

  return { tips };
};

export default useTipsBanner;
