import getUser from '@/lib/sonata/getUser';
import React, { useEffect, useState } from 'react';
import HorizontalScroller from './scroller/HorizontalScroller';

const TipsList = () => {
  const [tips, setTips] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const response = await fetch('/api/tips');
        const result = await response.json();

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
        } else {
          setError(result.message || 'Error fetching tips');
        }
      } catch (error: any) {
        setError(error || 'Unknown error');
      }
    };

    fetchTips();
  }, []);

  if (error) return <p>Error: {error}</p>;

  return <HorizontalScroller items={tips} />;
};

export default TipsList;
