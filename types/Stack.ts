import { Address } from "viem";

export interface StackEvent {
  event: string;
  address: Address;
  timestamp: string;
  points: number;
  metadata: { [key: string]: any }
}

export interface SetupNewTokenMetadata {
  blockNumber: bigint | string;
  sender: Address;
  contractAddress: Address;
  newURI: string;
  tokenId: bigint | string;
  maxSupply: bigint | string;
}

export interface SetupNewTokenStackEvent extends StackEvent {
  metadata: SetupNewTokenMetadata;
}

export interface StackEventAPI {
  name: string;
  account: string;
  pointSystemId: number | string;
  points?: number | string;
  uniqueId?: string | number;
  eventTimestamp?: string;
  metadata?: { [key: string]: any };
}