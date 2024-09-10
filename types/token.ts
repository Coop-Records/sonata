export type TOKEN_EVENT_TYPE = {
  event: string;
  address: string;
  timestamp: string;
  points: number;
  metadata: {
    user: string;
    tokenId: string;
    uniqueId: string;
    collection: string;
    blockNumber: string;
    permissions: string;
    transactionHash: string;
  };
};
