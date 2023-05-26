import { ImageResponse } from '@vercel/og';

const font = fetch(new URL('../../../public/fonts/zihun.ttf', import.meta.url)).then((res) => res.arrayBuffer());

const image = fetch(new URL('../../../public/images/og.png', import.meta.url)).then((res) => res.arrayBuffer());

async function handler(req: Request) {
  const { searchParams } = new URL(req.url);
  const postTitle = searchParams.get('title') || 'Willin Wang';
  const [fontData, imageData] = await Promise.all([font, image]);
  const base64 = btoa(new Uint8Array(imageData).reduce((data, byte) => data + String.fromCharCode(byte), ''));
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundImage: `url(data:image/png;base64,${base64})`
        }}>
        <div
          style={{
            marginTop: -200,
            marginLeft: 190,
            marginRight: 190,
            display: 'flex',
            fontSize: 120,
            fontStyle: 'normal',
            fontFamily: 'Zihun',
            color: 'white',
            lineHeight: '150px',
            whiteSpace: 'pre-wrap'
          }}>
          {postTitle}
        </div>
      </div>
    ),
    {
      width: 1920,
      height: 1080,
      emoji: 'twemoji',
      fonts: [
        {
          name: 'Zihun',
          data: fontData,
          style: 'normal'
        }
      ]
    }
  );
}

export const runtime = 'edge';

export { handler as GET };
