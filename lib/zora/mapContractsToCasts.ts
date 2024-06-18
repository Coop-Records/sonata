import { ICastsAndContracts, IContract } from "@/types/ContractCastMap";
import { Cast } from "@neynar/nodejs-sdk/build/neynar-api/v2";

function mapContractsToCasts(cast: Cast, contract: IContract, previous: ICastsAndContracts) {
  previous.casts.push(cast);
  previous.contracts.push(contract);

  return previous;
}

export default mapContractsToCasts;
