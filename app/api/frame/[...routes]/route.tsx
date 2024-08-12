/* eslint-disable react/jsx-key */
/** @jsxImportSource frog/jsx */

import getBulkUsersByFid from '@/lib/neynar/getBulkUsersByFid';
import executeUserTip from '@/lib/sonata/tip/executeUserTip';
import getUserTipInfo from '@/lib/sonata/tip/getUserTipInfo';
import getCastByHash from '@/lib/supabase/getCastByHash';
import { Button, Frog, TextInput } from 'frog';
import { neynar as neynarHub } from 'frog/hubs';
import { handle } from 'frog/next';

const NEYNAR_KEY = process.env.NEYNAR_API_KEY ?? 'NEYNAR_FROG_FM';

const app = new Frog({
  basePath: '/api/frame',
  title: 'Sonata Tip or Listen',
  hub: neynarHub({ apiKey: NEYNAR_KEY }),
  verify: true,
  unstable_metaTags: [
    { property: 'of:version', content: 'vNext' },
    { property: 'of:accepts:*', content: '*' },
  ],
});

app.frame('/tip', async (c) => {
  const { origin: BASE_URL } = new URL(c.url);
  const { searchParams } = new URL(c.req.url);
  const postHash = searchParams.get('post_hash');

  try {
    if (!postHash) throw Error('Post hash needed');
    const existingPost = await getCastByHash(postHash);
    if (!existingPost) throw Error('Cast not found');

    const username = existingPost.author.username;
    const castUrl = `${BASE_URL}/cast/${username}/${postHash}`;

    return c.res({
      action: `${BASE_URL}/api/frame/execute-tip`,
      image: `${BASE_URL}/api/og-image/cast/${username}/${postHash}/0`,
      browserLocation: castUrl,
      intents: [
        <TextInput placeholder="Enter tip amount" />,
        <Button>Tip</Button>,
        <Button.Link href={castUrl}>Listen</Button.Link>,
      ],
    });
  } catch (error) {
    console.error(error);
    return c.res({ image: `${BASE_URL}/images/og.webp`, browserLocation: BASE_URL });
  }
});

app.frame('/execute-tip', async (c) => {
  if (!(c.req.method === 'POST')) {
    return c.error({ message: 'Invalid method' });
  }
  const { origin: BASE_URL } = new URL(c.url);

  try {
    const frameUrl = c?.frameData?.url;
    if (!frameUrl) throw Error('Something went wrong');

    const { searchParams } = new URL(frameUrl);
    const postHash = searchParams.get('post_hash');
    if (!postHash) throw Error('Post hash needed');

    const tipAmount = Number(c?.frameData?.inputText);
    if (isNaN(tipAmount)) throw Error('Must be a number');
    if (tipAmount <= 0) throw Error('Invalid tip entry');
    if (!c.verified) throw Error('Could not authenticate user');

    const existingPost = await getCastByHash(postHash);
    if (!existingPost) throw Error('Cast not found');

    const recipientFid = existingPost.author.fid;
    const tipperFid = c?.frameData?.fid as number;
    if (tipperFid === recipientFid) throw Error('Can not tip yourself');

    const tipInfo = await getUserTipInfo(tipperFid, tipAmount);
    const users = await getBulkUsersByFid([tipperFid, recipientFid]);

    const recipientWalletAddress = users
      ?.find((user) => user.fid == recipientFid)
      ?.verifications?.find(Boolean);
    const tipperWalletAddress = users
      ?.find((user) => user.fid == tipperFid)
      ?.verifications?.find(Boolean);

    if (!recipientWalletAddress) throw Error('Invalid recipient');
    const result = await executeUserTip(
      existingPost.post_hash,
      { recipientFid, recipientWalletAddress, tipperWalletAddress },
      tipInfo,
    );

    const username = existingPost.author.username;
    const castUrl = `${BASE_URL}/cast/${username}/${postHash}`;

    return c.res({
      image:
        `${BASE_URL}/api/og-image/frame-tip-result?` +
        new URLSearchParams({
          sender: users[0].username,
          receiver: users[1].username,
          tipAmount: String(tipInfo.allowableAmount),
          remainingAllowance: String(result.tipRemaining),
          dailyAllowance: tipInfo.tip.daily_tip_allocation,
        }),
      intents: [
        <Button action={`${BASE_URL}/api/frame/tip?post_hash=${postHash}`}>Add Tip</Button>,
        <Button.Link href={castUrl}>Listen</Button.Link>,
      ],
    });
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : 'Could not process tip';
    return c.error({ message });
  }
});

export const GET = handle(app);
export const POST = handle(app);

export const revalidate = 0;
