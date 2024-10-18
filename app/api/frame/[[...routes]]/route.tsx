/* eslint-disable react/jsx-key */
/** @jsxImportSource frog/jsx */

import { LOGO_URL } from '@/lib/consts';
import { getDataForCastOg } from '@/lib/getDataForCastOg';
import executeUserTip from '@/lib/sonata/tip/executeUserTip';
import getAllowance from '@/lib/supabase/getAllowance';
import { Button, Frog, TextInput } from 'frog';
import { handle } from 'frog/next';
import { ReactNode } from 'react';

function FrameContainer({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '32px',
        paddingBottom: '27px',
        color: '#fff',
        background: 'black',
        position: 'relative',
      }}
    >
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          background:
            'linear-gradient(180deg, rgba(49, 102, 218, 0.2) 0%, rgba(49, 102, 218, 0) 30%)',
        }}
      />
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px', gap: '4px' }}>
        <img src={LOGO_URL} height={16} width={16} />
        <span style={{ fontWeight: '600' }}>Sonata</span>
      </div>
      {children}
    </div>
  );
}

const app = new Frog({
  basePath: '/api/frame',
  title: 'Sonata Tip or Listen',
  hub: { apiUrl: 'https://hub.pinata.cloud' },
  verify: true,
  unstable_metaTags: [
    { property: 'of:version', content: 'vNext' },
    { property: 'of:accepts:*', content: '*' },
  ],
  imageOptions: {
    width: 570,
    height: 320,
    fonts: [
      {
        name: 'Sora',
        source: 'google',
        weight: 400,
      },
      {
        name: 'Sora',
        source: 'google',
        weight: 600,
      },
    ],
  },
});

app.frame('/', async (c) => {
  const { origin: BASE_URL } = new URL(c.url);
  const { searchParams } = new URL(c.req.url);
  const postHash = searchParams.get('post_hash');

  try {
    if (!postHash) throw Error('Post hash needed');
    const { cast } = await getDataForCastOg(postHash);

    const username = cast.author.username;
    const castUrl = `${BASE_URL}/cast/${username}/${postHash}`;

    return c.res({
      image: `${BASE_URL}/api/frame/img?post_hash=${postHash}`,
      browserLocation: castUrl,
      action: `${BASE_URL}/api/frame/tip`,
      intents: [
        <Button>Tip curator</Button>,
        <Button.Link href={castUrl}>Listen on Sonata</Button.Link>,
      ],
    });
  } catch (error) {
    console.error(error);
    return c.res({ image: `${BASE_URL}/images/og.webp`, browserLocation: BASE_URL });
  }
});

app.image('/img', async (c) => {
  const { searchParams } = new URL(c.req.url);
  const postHash = searchParams.get('post_hash');

  const { cast, metadata, channelIcon, channelLabel, points } = await getDataForCastOg(postHash);
  return c.res({
    image: (
      <FrameContainer>
        <div style={{ display: 'flex', gap: '16px', maxWidth: '90%', overflow: 'hidden' }}>
          <img
            src={metadata.artworkUrl}
            width={164}
            height={164}
            style={{ borderRadius: '12px' }}
          />
          <div
            style={{
              flexShrink: 1,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span
              style={{
                fontSize: '20px',
                fontWeight: '600',
                width: '100%',
              }}
            >
              {metadata.trackName}
            </span>
            {metadata.artistName && (
              <span style={{ marginTop: '4px', color: 'rgba(255, 255, 255, 0.6)' }}>
                {metadata.artistName}
              </span>
            )}
            <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <img src={channelIcon} width={16} height={16} style={{ borderRadius: '100%' }} />
              <span style={{ fontSize: '12px' }}>{channelLabel}</span>
            </div>
            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ fontSize: '12px', fontWeight: '600' }}>{points}</span>
              <img src={LOGO_URL} width={16} height={16} />
            </div>
            <span style={{ marginTop: '8px', fontSize: '10px', color: 'rgba(255, 255, 255, 0.6)' }}>
              NOTES Collected
            </span>
          </div>
        </div>
        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '10px' }}>
            Posted on Sonata by
          </span>
          <img src={cast.author.pfp_url} width={16} height={16} style={{ borderRadius: '50%' }} />
          <span style={{ fontSize: '12px' }}>{cast.author.username}</span>
        </div>
      </FrameContainer>
    ),
    headers: {
      'Cache-Control': 'max-age=0',
    },
  });
});

app.frame('/tip', async (c) => {
  const { origin: BASE_URL } = new URL(c.url);

  try {
    const frameUrl = c?.frameData?.url;
    if (!frameUrl) throw Error('Something went wrong');
    const { searchParams } = new URL(frameUrl);
    const postHash = searchParams.get('post_hash');
    if (!postHash) throw Error('Post hash needed');

    const tipperFid = c?.frameData?.fid as number;
    if (!(c.verified && tipperFid)) throw Error('Could not authenticate user');

    const { cast } = await getDataForCastOg(postHash);

    const username = cast.author.username;
    const castUrl = `${BASE_URL}/cast/${username}/${postHash}`;

    return c.res({
      image: `${BASE_URL}/api/frame/tip-img?post_hash=${postHash}&tipperFid=${tipperFid}`,
      browserLocation: castUrl,
      action: `${BASE_URL}/api/frame/execute-tip`,
      intents: [<TextInput placeholder="Enter amount of NOTES" />, <Button>Tip</Button>],
    });
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : 'Could not process tip';
    return c.error({ message });
  }
});

app.image('/tip-img', async (c) => {
  const { searchParams } = new URL(c.req.url);
  const postHash = searchParams.get('post_hash');
  const tipperFid = searchParams.get('tipperFid');
  const { metadata, channelIcon, channelLabel } = await getDataForCastOg(postHash);

  const allowance = await getAllowance(Number(tipperFid));
  return c.res({
    image: (
      <FrameContainer>
        <div style={{ display: 'flex', gap: '16px', maxWidth: '90%', overflow: 'hidden' }}>
          <img
            src={metadata.artworkUrl}
            width={164}
            height={164}
            style={{ borderRadius: '12px' }}
          />
          <div
            style={{
              flexShrink: 1,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span
              style={{
                fontSize: '20px',
                fontWeight: '600',
                width: '100%',
              }}
            >
              {metadata.trackName}
            </span>
            {metadata.artistName && (
              <span style={{ marginTop: '4px', color: 'rgba(255, 255, 255, 0.6)' }}>
                {metadata.artistName}
              </span>
            )}
            <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <img src={channelIcon} width={16} height={16} style={{ borderRadius: '100%' }} />
              <span style={{ fontSize: '12px' }}>{channelLabel}</span>
            </div>
            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ fontSize: '12px', fontWeight: '600' }}>
                {allowance.remaining_tip_allocation}/{allowance.daily_tip_allocation}
              </span>
              <img src={LOGO_URL} width={16} height={16} />
            </div>
            <span style={{ marginTop: '8px', fontSize: '10px', color: 'rgba(255, 255, 255, 0.6)' }}>
              Notes Left to Tip
            </span>
          </div>
        </div>
      </FrameContainer>
    ),
    headers: {
      'Cache-Control': 'max-age=0',
    },
  });
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

    const { post, receiver, tipRemaining, dailyAllowance } = await executeUserTip({
      postHash,
      tipperFid,
      amount,
    });

    const username = post.author.username;
    const castUrl = `${BASE_URL}/cast/${username}/${postHash}`;

    return c.res({
      image: `${BASE_URL}/api/frame/execute-tip-img?amount=${amount}&receiverUsername=${receiver.username}&dailyAllowance=${dailyAllowance}&tipRemaining=${tipRemaining}&receiverPfpUrl=${receiver.pfp_url}`,
      action: `${BASE_URL}/api/frame/tip?post_hash=${postHash}`,
      intents: [<Button>Tip Again</Button>, <Button.Link href={castUrl}>Listen</Button.Link>],
    });
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : 'Could not process tip';
    return c.error({ message });
  }
});

app.image('/execute-tip-img', async (c) => {
  const { searchParams } = new URL(c.req.url);
  const amount = searchParams.get('amount');
  const receiverUsername = searchParams.get('receiverUsername');
  const dailyAllowance = searchParams.get('dailyAllowance');
  const tipRemaining = searchParams.get('tipRemaining');
  const receiverPfpUrl = searchParams.get('receiverPfpUrl');

  if (!receiverPfpUrl) throw Error('Receiver pfp url needed');
  if (!receiverUsername) throw Error('Receiver username needed');
  if (!dailyAllowance) throw Error('Daily allowance needed');
  if (!tipRemaining) throw Error('Tip remaining needed');

  return c.res({
    image: (
      <FrameContainer>
        <span style={{ marginTop: '40px', fontWeight: '600', fontSize: '21px' }}>
          You have tipped {amount} NOTES to
        </span>
        <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <img src={receiverPfpUrl} width={16} height={16} style={{ borderRadius: '50%' }} />
          <span style={{ fontSize: '14px' }}>{receiverUsername}</span>
        </div>
        <div style={{ marginTop: '32px', display: 'flex', gap: '70px' }}>
          <div
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
          >
            <span style={{ fontSize: '14px' }}>Allowance</span>
            <span style={{ fontWeight: '600' }}>{dailyAllowance}</span>
          </div>
          <div
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
          >
            <span style={{ fontSize: '14px' }}>Remaining</span>
            <span style={{ fontWeight: '600' }}>{tipRemaining}</span>
          </div>
        </div>
      </FrameContainer>
    ),
    headers: {
      'Cache-Control': 'max-age=0',
    },
  });
});

export const GET = handle(app);
export const POST = handle(app);

export const revalidate = 0;
