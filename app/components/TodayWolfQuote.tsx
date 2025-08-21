// TodayWolfQuote.tsx
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Article, convertCategory, getRandomWolfQuote } from '../api/articles';
import MoreButton from './MoreButton';

export default function TodayWolfQuote() {
  const [randomArticle, setRandomArticle] = useState<Article | null>(null);

  useEffect(() => {
    const fetchWolfQuote = async () => {
      try {
        const article = await getRandomWolfQuote(); // ランダムAPIを呼び出し
        setRandomArticle(article);
      } catch (error) {
        console.error('データ取得エラー:', error);
      }
    };
    fetchWolfQuote();
  }, []);

  return (
    <section className="relative w-10/12 max-w-md mx-auto my-8 border border-gray-800 shadow-[1px_2px_0px_0px_rgba(0,0,0,1)] bg-white bg-opacity-90 p-4">
      {/* 見出し部分 */}
      <div className="flex items-center mb-1 pl-1">
        <div className="mr-2 w-[22px] h-[28px] relative">
          <Image
            src="/images/wolf_icon.png" 
            alt="オオカミアイコン"
            fill
            style={{ objectFit: 'contain' }}
            unoptimized
          />
        </div>
        <h2 className="text-xl font-nicomoji">今日のオオカミ語録</h2>
      </div>

      <div className="dot-divider mb-3" />

      {/* テキスト部分 */}
      <p className="text-sm leading-relaxed">
        {randomArticle ? (
          randomArticle.wolf_quote
        ) : (
          <span className="block bg-gray-300 animate-pulse h-4 w-full rounded">
            読み込み中...
          </span>
        )}
      </p>

      {/* ボタン - APIから記事データが取得できた場合のみ表示 */}
      {randomArticle && (
        <MoreButton href={`/categories/${convertCategory.toEn(randomArticle.category)}/${randomArticle.id}`} text="記事を見る" />
      )}
    </section>
  );
};