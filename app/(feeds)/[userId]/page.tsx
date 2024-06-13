import type { Metadata } from 'next';
import User from "@/components/User";
import { getFrameMetadata } from '@coinbase/onchainkit';
import { DEFAULT_FRAME, DESCRIPTION, TITLE, VERCEL_URL } from '@/lib/consts';

const frameMetadata = { ...getFrameMetadata(DEFAULT_FRAME), 'of:accepts:xmtp': '2024-02-01' };

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    openGraph: {
        title: TITLE,
        description: DESCRIPTION,
        images: `${VERCEL_URL}/images/og.png`,
    },
    icons: [`${VERCEL_URL}/images/logo2.png`],
    other: {
        ...frameMetadata,
    },
};

export default function UserHome() {
    return <User />
}
