import { VERCEL_URL } from '@/lib/consts';
import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const trackName = req.nextUrl.searchParams.get('trackName') || 'defaultHash';
  const artistName = req.nextUrl.searchParams.get('artistName') || 'Default artistName';
  const artworkUrl = req.nextUrl.searchParams.get('artworkUrl') || 'Default artworkUrl';
  const points = req.nextUrl.searchParams.get('points') || 'Default points';
  const username = req.nextUrl.searchParams.get('username') || 'Default username';
  const channelLabel = req.nextUrl.searchParams.get('channelLabel') || 'Default channelLabel';
  const channelIcon = req.nextUrl.searchParams.get('channelIcon') || 'Default channelIcon';

  return new ImageResponse(
    (
      <div
        style={{
          background: '#fff',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '20px',
          border: '1px solid #eaeaea',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '50px' }}>
          <div style={{ display: 'flex', margin: 0, alignItems: 'center' }}>
            <img
              src={`${VERCEL_URL}/images/notes.jpg`}
              alt=""
              style={{
                width: '32px',
                height: '32px',
              }}
            />
            <p style={{ margin: 0, fontSize: '20px', fontWeight: '600' }}>Sonata</p>
          </div>
          <div style={{ display: 'flex', margin: 0, alignItems: 'center', marginTop: '30px' }}>
            <img
              src={channelIcon}
              alt=""
              style={{
                width: '32px',
                height: '32px',
              }}
            />
            <p style={{ margin: 0, fontSize: '20px', fontWeight: '600' }}>{channelLabel}</p>
          </div>

          <div style={{ display: 'flex', marginTop: '10px' }}>
            <img
              src={artworkUrl}
              alt=""
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
                borderRadius: '12px',
                width: '72px',
                height: '72px',
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '20px' }}>
              <p style={{ margin: 0, fontSize: '20px', fontWeight: '700 ' }}>{trackName}</p>
              <p style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', color: '#949494' }}>
                {artistName}
              </p>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                margin: 0,
                background: '#F6F6F6',
                borderRadius: '12px',
                width: '200px',
                height: '100px',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: '30px',
              }}
            >
              <div style={{ display: 'flex', margin: 0, width: '65%', alignItems: 'center' }}>
                <p style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>{points}</p>
                <img
                  src={`${VERCEL_URL}/images/notes.jpg`}
                  alt=""
                  style={{
                    width: '28px',
                    height: '28px',
                  }}
                />
              </div>
              <p style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: '#949494' }}>
                Notes Collected
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <p style={{ color: '#949494' }}>Posted By</p>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#EEE4FE',
                borderRadius: '100px',
                width: '200px',
              }}
            >
              <img src={`${VERCEL_URL}/images/neynar.svg`} alt="warpcast" width={16} height={14} />
              <p style={{ color: '#8b49f7' }}>{username}</p>
            </div>
          </div>
        </div>
      </div>
    ),
  );
}
