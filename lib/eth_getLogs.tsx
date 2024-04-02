export const getLogs = async (
  contractAddress: String[],
  topics: Array<String>,
  toBlock: number | string | bigint,
  fromBlock: number | string | bigint,
  endpoint: string | any,
  chainId: number | string | bigint,
) => {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: 1,
        jsonrpc: '2.0',
        method: 'eth_getLogs',
        params: [
          {
            address: contractAddress,
            fromBlock,
            toBlock,
            topics,
          },
        ],
      }),
    });
    const data = await response.json();
    const dataWithChainId = data.result.map((log: any) => {
      return {
        ...log,
        chainId,
      };
    });
    return dataWithChainId;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error fetching logs:', err);
    return [];
  }
};
