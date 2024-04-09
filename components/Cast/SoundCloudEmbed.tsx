import { useEffect, useState } from 'react';

const SoundCloudEmbed = ({ trackUrl }: any) => {
  const [embedHtml, setEmbedHtml] = useState('');
  const [embedData, setEmbedData] = useState({} as any);

  useEffect(() => {
    const init = async () => {
      const oEmbedUrl = `https://soundcloud.com/oembed?format=json&url=${encodeURIComponent(trackUrl)}`;
      const response = await fetch(oEmbedUrl);
      const data = await response.json();
      setEmbedHtml(data.html);
      setEmbedData(data);
    };
    init();
  }, [trackUrl]);

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: embedData?.html }} />
      <div
        style={{
          fontSize: '10px',
          color: '#cccccc',
          lineBreak: 'anywhere',
          wordBreak: 'normal',
          overflow: 'visible',
          textOverflow: 'clip',
          fontFamily:
            'Interstate, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Garuda, Verdana, Tahoma, sans-serif',
          fontWeight: '100',
        }}
        className="flex justify-center"
      >
        <a
          href={embedData?.author_url}
          title={embedData?.author_name}
          target="_blank"
          style={{ color: '#cccccc', textDecoration: 'none' }}
        >
          {embedData?.author_name}·{' '}
          <p title={embedData?.title} style={{ color: '#cccccc', textDecoration: 'none' }}>
            {embedData?.title}
          </p>
        </a>
      </div>
    </div>
  );
};

export default SoundCloudEmbed;
