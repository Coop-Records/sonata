import formatNumber from './formatNumber';
import getUsers from './sonata/getUsers';

const getFormattedTips = async (rawTips: any[]) => {
  const uniqueFids = new Set(rawTips.flatMap(tip => [tip.sender, tip.receiver]));
  const users:any[] = await getUsers(Array.from(uniqueFids));

  return rawTips.map((tip: any) => {
    const senderUser = users.find(user => user.fid == tip.sender);
    const receiverUser = users.find(user => user.fid == tip.receiver);
    return {
      sender: senderUser.username,
      receiver: receiverUser.username,
      amount: formatNumber(tip.amount),
      imgUrl: senderUser.pfp_url,
    };
  });
}
export default getFormattedTips;
