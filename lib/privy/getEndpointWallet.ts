import extractAddress from "./extractAddress";
import pregenerateEndpointWallet from "./pregenerateChannelWallet";

const getEndpointWallet = async (endpoint: string) => {
    const response = await pregenerateEndpointWallet(endpoint);
    const data = await response.json()
    const wallet = extractAddress(data.linked_accounts)
    return wallet[0]
}

export default getEndpointWallet