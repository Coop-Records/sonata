import { useEffect, useState } from 'react';

const SoundCloudEmbed = ({ trackUrl }: any) => {
  const [embedHtml, setEmbedHtml] = useState('');

  useEffect(() => {
    const init = async () => {
      const oEmbedUrl = `https://soundcloud.com/oembed?format=json&url=${encodeURIComponent(trackUrl)}`;
      const response = await fetch(oEmbedUrl);
      const data = await response.json();
      setEmbedHtml(data.html);
      console.log('SWEETS data', data);
    };
    init();
  }, [trackUrl]);

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: embedHtml }} />
      <div
        style={{
          fontSize: '10px',
          color: '#cccccc',
          lineBreak: 'anywhere',
          wordBreak: 'normal',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          fontFamily:
            'Interstate, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Garuda, Verdana, Tahoma, sans-serif',
          fontWeight: '100',
        }}
      >
        <a
          href="https://soundcloud.com/v4w-enko"
          title="v4w.enko"
          target="_blank"
          style={{ color: '#cccccc', textDecoration: 'none' }}
        >
          v4w.enko
        </a>{' '}
        ·{' '}
        <a
          href="https://soundcloud.com/v4w-enko/0212-44100-hz"
          title="V4W.ENKO - 0212"
          target="_blank"
          style={{ color: '#cccccc', textDecoration: 'none' }}
        >
          V4W.ENKO - 0212
        </a>
      </div>
    </div>
  );
};

export default SoundCloudEmbed;
