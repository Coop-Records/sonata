import getEndpointWallet from "@/lib/privy/getEndpointWallet";
import track from "./track";

const trackEndpoint = async (endpoint: string) => {
    const wallet = await getEndpointWallet(endpoint)
    await track(endpoint, {
        points: 1,
        account: wallet
    })
    return wallet
}

export default trackEndpoint