import { Cast } from "@neynar/nodejs-sdk/build/neynar-api/v2";
import { Address } from "viem";

export interface IContract {
  address: Address,
  abi: any,
  functionName: string,
  args?: unknown[]
};

export interface ICastsAndContracts {
  contracts: IContract[],
  casts: Cast[],
};
