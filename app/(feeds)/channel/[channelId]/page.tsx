import Feeds from "@/app/(feeds)/feeds";
import {CHANNELS} from "@/lib/consts";

export async function generateStaticParams() {
    return CHANNELS.map((channel) => {
        return { channelId: channel.value };
    });
}

export default function Channel({params} : { params: { channelId: string } }) {
    return <Feeds channelId={params.channelId} />
}