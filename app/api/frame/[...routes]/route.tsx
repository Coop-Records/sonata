/* eslint-disable react/jsx-key */
/** @jsxImportSource frog/jsx */

import getBulkUsersByFid from '@/lib/neynar/getBulkUsersByFid';
import executeUserTip from '@/lib/sonata/tip/executeUserTip';
import getUserTipInfo from '@/lib/sonata/tip/getUserTipInfo';
import { Button, Frog, TextInput } from 'frog';
import { devtools } from 'frog/dev';
import { neynar as neynarHub } from 'frog/hubs';
import { handle } from 'frog/next';
import { serveStatic } from 'frog/serve-static';

const NEYNAR_KEY = process.env.NEYNAR_API_KEY ?? 'NEYNAR_FROG_FM';
const BASE_URL = 'https://sonata.tips';

const app = new Frog({
  basePath: '/api/frame',
  title: 'Sonata Tip or Listen',
  hub: neynarHub({ apiKey: NEYNAR_KEY }),
  unstable_metaTags: [
    { property: 'of:version', content: 'vNext' },
    { property: 'of:accepts:*', content: '*' },
  ]
});

app.frame('/tip', async (c) => {
  const { searchParams, search } = new URL(c.buttonValue ?? c.req.url);
  const cast_url = searchParams.get('cast_url');
  const recipient_fid = searchParams.get('recipient_fid');
  const match = cast_url?.match(/cast\/([^/]+)\/([^/]+)/);
  const username = match?.[1];
  const castHash = match?.[2];
  const image = username ? `/api/og-image/cast/${username}/${castHash}/0` : '/images/og.webp';
  let tipSuccess = false;
  const amount = c?.frameData?.inputText;

  if (amount) {
    try {
      const tipAmount = Number(amount);
      if (!match) throw Error('Could not retrieve cast data');
      else if (!c.verified || !username) throw Error('Could not authenticate user');
      else if (!recipient_fid) throw Error('No recipient found');
      else if (isNaN(tipAmount)) throw Error('Must be a number');
      else if (tipAmount <= 0) throw Error('Invalid entry');

      const tipperFid = c?.frameData?.fid as number;
      const recipientFid = Number(recipient_fid);
      const postHash = c?.frameData?.castId?.hash as string;

      if (tipperFid === recipientFid) throw Error('Can not tip yourself');

      const tipInfo = await getUserTipInfo(tipperFid, tipAmount);
      const users = await getBulkUsersByFid([tipperFid, recipientFid]);

      const recipientWalletAddress = users?.find(user => user.fid == recipientFid)?.verifications?.find(Boolean);
      const tipperWalletAddress = users?.find(user => user.fid == tipperFid)?.verifications?.find(Boolean);

      if (!recipientWalletAddress) throw Error('Invalid recipient');

      await executeUserTip(postHash, { recipientFid, recipientWalletAddress, tipperWalletAddress }, tipInfo);
      tipSuccess = true;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Could not process tip';
      return c.error({ message });
    }
  }

  const actions = tipSuccess ?
    [<Button value={BASE_URL + search}>Add Tip</Button>] :
    [
      <TextInput placeholder='Enter tip amount' />,
      <Button value={BASE_URL + search}>Tip</Button>
    ];

  return c.res({
    browserLocation: cast_url || BASE_URL,
    image: BASE_URL + image,
    intents: [
      ...actions,
      <Button.Link href={cast_url || BASE_URL}>Listen</Button.Link>
    ]
  })
});

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);