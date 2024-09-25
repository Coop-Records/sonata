import { Address } from 'viem';
import getIdentity from './stack/getIdentity';
import getZoraProfile from './zora/getZoraProfile';

const getConnectedZoraProfile = async (zoraAddress: Address) => {
  const identity = await getIdentity(zoraAddress);
  if (!identity?.tagData) return null;

  const connectedAddress = new URL(identity?.tagData?.externalUrl).pathname.split('@')[1];
  const connectedZoraProfile = await getZoraProfile(connectedAddress);

  return connectedZoraProfile;
};

export default getConnectedZoraProfile;
