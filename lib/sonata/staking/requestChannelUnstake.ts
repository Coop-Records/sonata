async function requestChannelUnstake(amount: number, signer_uuid: string, channelId: any) {
  try {
    if (typeof channelId !== 'string') return null;
    const response = await fetch('/api/channel/unstake', {
      method: 'POST',
      body: JSON.stringify({ signer_uuid, amount, channelId }),
    });
    if (!response.ok) throw Error(response.statusText);

    const data: {
      message: string;
      unstakedAmount: number;
      remainingStake: number;
    } = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default requestChannelUnstake;
