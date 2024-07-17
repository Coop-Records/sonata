export async function executeStake(
  amount: bigint,
  signer_uuid: string,
  channelId: any
) {
  if (typeof channelId !== 'string') return null;
  try {
    const response = await fetch('/api/channel/stake', {
      method: 'POST',
      body: JSON.stringify({ signer_uuid, amount, channelId })
    })
    if (!response.ok) throw Error(response.statusText);

    const data: {
      message: string;
      usedAmount: bigint;
      dailyAmountRemaining: bigint;
    } = await response.json();

    return data;
  } catch {
    return null;
  }
}

export async function executeUnstake(
  amount: bigint,
  signer_uuid: string,
  channelId: any
) {
  signer_uuid; amount;
  if (typeof channelId !== 'string') return null;
  return null;
}