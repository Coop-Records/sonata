import getEndpointWallet from "@/lib/privy/getEndpointWallet";
import { stack } from "@/lib/stack/client";

const trackEndpoint = async (endpoint: string) => {
    const wallet = await getEndpointWallet(endpoint)
    await stack.track(endpoint, {
        points: 1,
        account: wallet
    });
    return wallet
}

export default trackEndpoint