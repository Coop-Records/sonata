import { SetupNewTokenStackEvent } from "@/types/Stack";
import { EVENT_SETUP_NEW_TOKEN } from "../consts";
import formatBigIntValues from "../formatBigIntValues";
import getSetupNewContractLogs from "../zora/getSetupNewContractLogs";
import getSetupNewTokenLogs from "../zora/getSetupNewTokenLogs";
import { bulkTrack } from "./bulkTrack";

async function trackNewTokens(blockNumber?: bigint): Promise<SetupNewTokenStackEvent[]> {
  const logs = await getSetupNewContractLogs();
  const contractAddresses = logs.map(contract => contract.args.newContract).filter(Boolean);
  const contractTokens = await Promise.all(
    contractAddresses.map(addr => getSetupNewTokenLogs(addr!, blockNumber))
  );
  const tokens = contractTokens.flat().map(contract => ({
    name: EVENT_SETUP_NEW_TOKEN,
    account: contract.address,
    pointSystemId: process.env.STACK_POINT_SYSTEM_ID!,
    uniqueId: contract.transactionHash,
    metadata: {
      blockNumber: contract.blockNumber,
      contractAddress: contract.address,
      ...contract.args
    }
  }));

  tokens.sort((a, b) => {
    if (a.metadata?.blockNumber > b.metadata?.blockNumber) return -1;
    if (a.metadata?.blockNumber < b.metadata?.blockNumber) return 1;
    return 0;
  })

  await bulkTrack(formatBigIntValues(tokens));

  return tokens.map(token => ({
    address: token.account,
    event: token.name,
    points: 0,
    timestamp: (new Date()).toISOString(),
    metadata: token.metadata
  }));
}

export default trackNewTokens;