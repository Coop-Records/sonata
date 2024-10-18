const processSuccess = (res: Response) => (res.ok ? res.json() : null);

async function getChannelDetails(id: string, fid: number | undefined) {
  if (!id) throw Error('channel id required');
  const promises = [
    fetch(`/api/neynar/getChannelDetails?channelId=${id}`).then(processSuccess),
    fetch(`/api/channel/details?channelId=${id}`).then(processSuccess)
  ];
  if (fid) promises.push(
    fetch(`/api/channel/stake?channelId=${id}&fid=${fid}`).then(processSuccess)
  );
  const [info, stats, user] = await Promise.all(promises);

  return {
    info: info?.channel,
    topSong: stats?.topSong,
    staking: stats?.staking,
    balance: stats?.balance,
    user
  }
}

export default getChannelDetails;
