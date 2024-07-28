export const formatLogs = (logs: any[]) =>
  logs.map((log) => ({
    ...log,
    blockNumber: log.blockNumber.toString(),
    transactionIndex: log.transactionIndex.toString(),
    logIndex: log.logIndex.toString(),
    topics: log.topics.map((topic: any) => topic.toString()),
    blockHash: log.blockHash,
    transactionHash: log.transactionHash,
    removed: log.removed,
  }));
