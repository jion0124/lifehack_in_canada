import { useEffect, useState } from 'react';
import Script from 'next/script';

// グローバルな Window 型の拡張
declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

interface InstagramEmbedProps {
  url: string;
}

export default function InstagramEmbed({ url }: InstagramEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const processEmbed = () => {
      if (window.instgrm?.Embeds) {
        window.instgrm.Embeds.process();
        setIsLoaded(true);
      }
    };

    if (window.instgrm) {
      processEmbed();
    } else {
      const script = document.createElement('script');
      script.src = 'https://www.instagram.com/embed.js';
      script.async = true;
      script.onload = processEmbed;
      document.body.appendChild(script);
    }

    return () => {
      document.querySelectorAll('.instagram-media').forEach(el => el.remove());
    };
  }, [url, key]);

  return (
    <div className="">
      <div key={key} className="my-6 mx-auto max-w-[540px] w-11/12 px-4 sm:px-0">
        <div className="relative overflow-hidden border-2 border-gray-800 rounded-2xl pb-[140%]">
          <div className="absolute top-0 left-0 w-full h-full">
            <Script
              src="https://www.instagram.com/embed.js"
              strategy="lazyOnload"
              onLoad={() => {
                if (window.instgrm) {
                  window.instgrm.Embeds.process();
                  setIsLoaded(true);
                }
              }}
            />

            <blockquote
              className="instagram-media h-full w-full rounded-2xl"
              data-instgrm-permalink={url}
              data-instgrm-version="14"
              data-instgrm-captioned
              style={{
                background: '#FFF',
                border: 'none',
                minWidth: '0px',
                maxWidth: '540px',
                width: '100%'
              }}
            />

            {!isLoaded && (
              <div className="absolute inset-0 bg-gray-50 flex items-center justify-center p-4">
                <div className="text-center space-y-3">
                  <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"/>
                  <div className="text-gray-600 text-sm">
                    Instagramの投稿を読み込んでいます...
                  </div>
                  <button
                    onClick={() => setKey(prev => prev + 1)}
                    className="px-4 py-2 text-sm bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors shadow-[1px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none"
                  >
                    再読み込みする
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
