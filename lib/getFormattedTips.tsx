import getUser from '@/lib/sonata/getUser';
import formatNumber from './formatNumber';

const getFormattedTips = async (rawTips: any[]) =>
  await Promise.all(
    rawTips.map(async (tip: any) => {
      const senderUser = await getUser(tip.sender);
      const receiverUser = await getUser(tip.receiver);
      return {
        sender: senderUser.username,
        receiver: receiverUser.username,
        amount: formatNumber(tip.amount),
        imgUrl: senderUser.pfp_url,
      };
    }),
  );

export default getFormattedTips;
