import Title from '@/components/Header/Title';

export const runtime = 'edge';

export async function GET() {
  const { ImageResponse } = await import('@vercel/og');
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: 'black',
          background: 'white',
          width: '100%',
          height: '100%',
          padding: '50px 200px',
          textAlign: 'center',
          fontFamily: 'Sora',
        }}
        tw="flex gap-3"
      >
        <Title />
      </div>
    ),
  );
}
