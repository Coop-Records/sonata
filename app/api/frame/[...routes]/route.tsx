/* eslint-disable react/jsx-key */
/** @jsxImportSource frog/jsx */

import executeUserTip from '@/lib/sonata/tip/executeUserTip';
import getPostByHash from '@/lib/supabase/getPostByHash';
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
    const existingPost = await getPostByHash(postHash);
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
  const tipperFid = c?.frameData?.fid as number;

  try {
    const frameUrl = c?.frameData?.url;
    if (!frameUrl) throw Error('Something went wrong');

    const { searchParams } = new URL(frameUrl);
    const postHash = searchParams.get('post_hash');
    if (!postHash) throw Error('Post hash needed');

    if (!c.verified) throw Error('Could not authenticate user');

    const amount = Number(c?.frameData?.inputText);

    const { post, sender, receiver, tipRemaining, dailyAllowance } = await executeUserTip({
      postHash,
      tipperFid,
      amount,
    });

    const username = post.author.username;
    const castUrl = `${BASE_URL}/cast/${username}/${postHash}`;

    return c.res({
      image:
        `${BASE_URL}/api/og-image/frame-tip-result?` +
        new URLSearchParams({
          sender: sender.username,
          receiver: receiver.username,
          tipAmount: String(amount),
          remainingAllowance: String(tipRemaining),
          dailyAllowance,
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
