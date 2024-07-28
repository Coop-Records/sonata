import getEndpointWallet from "./privy/getEndpointWallet";
import { stack } from "./stack/client";

const trackEndpoint = async (endpoint: string) => {
    const wallet = await getEndpointWallet(endpoint)
    await stack.track(endpoint, {
        points: 1,
        account: wallet
    });
    return wallet
}

export default trackEndpoint