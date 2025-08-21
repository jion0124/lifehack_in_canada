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
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  useEffect(() => {
    const processEmbed = () => {
      try {
        if (window.instgrm?.Embeds) {
          window.instgrm.Embeds.process();
          setIsLoaded(true);
          setHasError(false);
        }
      } catch (error) {
        console.error('Instagram埋め込み処理エラー:', error);
        setHasError(true);
      }
    };

    // スクリプトが既に読み込まれている場合
    if (window.instgrm) {
      processEmbed();
    } else {
      // スクリプトが読み込まれていない場合、読み込み完了を待つ
      const checkScript = setInterval(() => {
        if (window.instgrm) {
          clearInterval(checkScript);
          processEmbed();
        }
      }, 100);

      // 10秒でタイムアウト
      setTimeout(() => {
        clearInterval(checkScript);
        if (!window.instgrm) {
          setHasError(true);
        }
      }, 10000);
    }
  }, [url, retryCount]);

  const handleRetry = () => {
    if (retryCount < maxRetries) {
      setRetryCount(prev => prev + 1);
      setIsLoaded(false);
      setHasError(false);
      
      // 既存の埋め込みをクリア
      document.querySelectorAll('.instagram-media').forEach(el => el.remove());
      
      // 少し待ってから再試行
      setTimeout(() => {
        if (window.instgrm?.Embeds) {
          window.instgrm.Embeds.process();
          setIsLoaded(true);
        }
      }, 500);
    }
  };

  return (
    <div className="">
      <div className="my-6 mx-auto max-w-[540px] w-11/12 px-4 sm:px-0">
        <div className="relative overflow-hidden border-2 border-gray-800 rounded-2xl pb-[140%]">
          <div className="absolute top-0 left-0 w-full h-full">
            {/* Instagramスクリプトを一度だけ読み込み */}
            <Script
              src="https://www.instagram.com/embed.js"
              strategy="lazyOnload"
              onLoad={() => {
                if (window.instgrm) {
                  window.instgrm.Embeds.process();
                  setIsLoaded(true);
                }
              }}
              onError={() => setHasError(true)}
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

            {/* ローディング状態 */}
            {!isLoaded && !hasError && (
              <div className="absolute inset-0 bg-gray-50 flex items-center justify-center p-4">
                <div className="text-center space-y-3">
                  <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"/>
                  <div className="text-gray-600 text-sm">
                    Instagramの投稿を読み込んでいます...
                  </div>
                </div>
              </div>
            )}

            {/* エラー状態 */}
            {hasError && (
              <div className="absolute inset-0 bg-gray-50 flex items-center justify-center p-4">
                <div className="text-center space-y-3">
                  <div className="text-gray-600 text-sm">
                    インスタグラムの投稿を読み込めませんでした
                  </div>
                  {retryCount < maxRetries && (
                    <button
                      onClick={handleRetry}
                      className="px-4 py-2 text-sm bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors shadow-[1px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none"
                    >
                      再試行する ({retryCount + 1}/{maxRetries})
                    </button>
                  )}
                  <div className="text-xs text-gray-500">
                    <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      直接インスタグラムで見る
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
