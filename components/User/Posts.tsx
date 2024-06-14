"use client"
import Cast from "@/components/Cast";
import { SupabasePost } from "@/types/SupabasePost";

import "../../styles/scrollbar.css"

// Static cast data taken from feeds api
const data: SupabasePost = {
        id: 3297,
        post_hash: "0xaf124acf86c3ccdaa050cbbb6182b0eeac033c79",
        points: 0,
        alternativeEmbeds: ["test"],
        created_at: new Date("2024-06-12T11:50:06+00:00"),
        degen: 0,
        likes: 3,
        author: {
            fid: 323251,
            object: "user",
            pfp_url: "https://i.imgur.com/Vakefh3.gif",
            profile: {
                bio: {
                    mentioned_profiles: [],
                    text: "Animations\nhttps://linktr.ee/miguelgarest"
                }
            },
            username: "miguelgarest.eth",
            display_name: "Miguelgarest 🎩",
            active_status: "inactive",
            verifications: [
                "0x8036bb84031e60a1bac93078c0e59bbd5e485db9"
            ],
            follower_count: 11645,
            custody_address: "0x1a6cc3cea61b722db45d5400e201048f9dff50e6",
            following_count: 439,
            verified_addresses: {
                eth_addresses: [
                    "0x8036bb84031e60a1bac93078c0e59bbd5e485db9"
                ],
                sol_addresses: []
            }
        },
        embeds: [
            "{\"url\":\"https://open.spotify.com/track/2fuCquhmrzHpu5xcA1ci9x?si=Gb9MBB2gSIyNsXP2fWnhGA\"}"
        ]
    }

const Posts = () => (
    <div className="flex flex-col gap-6">
        <div className="w-full border-b border-b-[#F5F5F5] flex items-center gap-[2px]">
            <p className="pb-4 border-b-2 border-b-[#333536] font-semibold text-base">Posts</p>
        </div>
        <div className="no-scroll max-w-full grow space-y-6 overflow-y-auto max-h-[calc(100vh-481px)] overflow-x-hidden ">
            {Array(15).fill(null).map((_, index) => <Cast key={index}  cast={data}/> )}
        </div>
    </div>
)

export default Posts