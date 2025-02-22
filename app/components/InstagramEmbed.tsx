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

    // スクリプト読み込み済みかチェック
    if (window.instgrm) {
      processEmbed();
    } else {
      const script = document.createElement('script');
      script.src = 'https://www.instagram.com/embed.js';
      script.async = true;
      script.onload = processEmbed;
      document.body.appendChild(script);
    }

    // クリーンアップ
    return () => {
      document.querySelectorAll('.instagram-media').forEach(el => el.remove());
    };
  }, [url, key]);

  return (
    <div className="">
  
      <div key={key} className="my-6 mx-auto max-w-[540px] w-11/12 px-4 sm:px-0">
        <div className="relative overflow-hidden border-2 border-gray-800 rounded-2xl pb-[140%]">
          <div className="absolute top-0 left-0 w-full h-full">
            {/* Instagram公式スクリプト */}
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

            {/* Instagram埋め込み要素 */}
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

            {/* フォールバック表示 */}
            {!isLoaded && (
              <div className="absolute inset-0 bg-gray-50 flex items-center justify-center p-4 animate-pulse">
                <div className="text-center">
                  <div className="text-gray-500 text-sm mb-2">
                    Instagramを読み込んでいます...
                  </div>
                  <button
                    onClick={() => setKey(prev => prev + 1)}
                    className="px-3 py-1.5 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  >
                    再試行
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
