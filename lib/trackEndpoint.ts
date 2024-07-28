import getEndpointWallet from "./privy/getEndpointWallet";

const trackEndpoint = async (endpoint: string) => {
    const wallet = await getEndpointWallet(endpoint)
    console.log("SWEETS wallet", wallet);
    return wallet
}

export default trackEndpoint