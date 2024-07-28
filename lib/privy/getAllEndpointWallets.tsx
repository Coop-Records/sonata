import { endpoints } from '../getEndpointsList';
import pregenerateEndpointWallet from './pregenerateEndpointWallet';

const getAllEndpointWallets = async () => {
  const results = await Promise.all(
    endpoints.map((endpoint) => pregenerateEndpointWallet(endpoint.stack)),
  );
  const wallets = await Promise.all(results.map((res) => res.json()));
  return wallets;
};

export default getAllEndpointWallets;
