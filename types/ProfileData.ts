import { Address } from "viem";

export type ProfileData = {
    fid: number,
    custodyAddress: Address,
    username: string,
    displayName: string,
    pfp: {
        url: string
    },
    profile: {
        bio: {
            text?: string,
            mentionedProfiles?: any
        }
    },
    followerCount: number,
    followingCount: number,
    verifications: Address[],
    verifiedAddresses: {
        eth_addresses: Address[],
        sol_addresses: string[]
    },
    activeStatus: "active" | "inactive",
    powerBadge: boolean
};
  