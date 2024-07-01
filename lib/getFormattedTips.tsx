import getUser from '@/lib/sonata/getUser';

const getFormattedTips = async (rawTips: any[]) =>
  await Promise.all(
    rawTips.map(async (tip: any) => {
      const senderUser = await getUser(tip.sender);
      const receiverUser = await getUser(tip.receiver);
      return {
        text: `@${senderUser.username} tipped ${tip.amount} notes to @${receiverUser.username}`,
        imgUrl: senderUser.pfp_url,
      };
    }),
  );

export default getFormattedTips;
