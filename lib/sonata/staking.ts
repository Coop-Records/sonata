async function executeStake(amount: number, signer_uuid: string, channelId: any) {
  if (typeof channelId !== 'string') return null;
  try {
    const response = await fetch('/api/channel/stake', {
      method: 'POST',
      body: JSON.stringify({ signer_uuid, amount, channelId })
    })
    if (!response.ok) throw Error(response.statusText);

    const data: {
      message: string;
      usedAmount: number;
      remainingBalance: number;
    } = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function executeUnstake(amount: number, signer_uuid: string, channelId: any) {
  try {
    if (typeof channelId !== 'string') return null;
    const response = await fetch('/api/channel/unstake', {
      method: 'POST',
      body: JSON.stringify({ signer_uuid, amount, channelId })
    })
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

export { executeStake, executeUnstake };