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
  signer_uuid; amount;
  if (typeof channelId !== 'string') return null;
  return null;
}

export { executeStake, executeUnstake };