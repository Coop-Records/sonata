import { useEffect, useMemo, useState } from "react";

function useChannelDetails(channelId = '', image = '') {
  const [channel, setChannel] = useState<any>({ image_url: image });

  useEffect(() => {
    if (channelId) fetch(
      `/api/neynar/getChannelDetails?channelId=${channelId}`
    ).then(res => {
      if (res.ok) return res.json();
      throw Error('');
    }).then(data => {
      if (data?.channel) setChannel(data.channel)
    }).catch(console.error);
  }, [channelId])

  const moderators = useMemo(() => {
    const users = [];

    !!channel?.hosts?.[0] && users.push(channel.hosts[0]);
    !!channel?.moderator && users.push(channel.moderator);

    return users;
  }, [channel]);

  return { moderators, channel }
}

export default useChannelDetails;