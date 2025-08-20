'use client'

import Image from 'next/image';
import SectionTitle from './SectionTitle';
import Link from 'next/link';
import { CATEGORY_MAPPING, getActiveCategories, JapaneseCategory, EnglishCategory } from '../api/articles';
import { useEffect, useState } from 'react';

export default function CategorySection() {
  const [activeCategories, setActiveCategories] = useState<Record<JapaneseCategory, EnglishCategory>>({} as Record<JapaneseCategory, EnglishCategory>);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchActiveCategories = async () => {
      try {
        const categories = await getActiveCategories();
        setActiveCategories(categories);
      } catch (error) {
        console.error('アクティブカテゴリー取得エラー:', error);
        // エラーの場合はデフォルトのカテゴリーを表示
        setActiveCategories({
          '渡航前': 'preparation',
          '生活基本': 'lifestyle',
          '買い物': 'shopping',
          'マネー': 'finance',
          '留学哲学': 'mindset',
          'WASABI': 'wasabi'
        } as Record<JapaneseCategory, EnglishCategory>);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActiveCategories();
  }, []);

  if (isLoading) {
    return (
      <section className="relative my-8">
        <div className="relative w-full" style={{ aspectRatio: '393/396' }}>
          <Image
            src="/images/category_bg.png"
            alt="背景"
            fill
            className="object-contain"
          />
        </div>
        <div className="absolute inset-0 z-10 mx-auto w-full px-4 py-10 mb-4 flex flex-col items-center justify-center">
          <SectionTitle enTitle="CATEGORY" jaTitle="カテゴリー" />
          <div className="mx-auto mt-6 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative my-8">
      {/* 背景用SVG画像 - 修正部分 */}
      <div className="relative w-full" style={{ aspectRatio: '393/396' }}>
        <Image
          src="/images/category_bg.png"
          alt="背景"
          fill
          className="object-contain"
        />
      </div>

      {/* コンテンツ本体 */}
      <div className="absolute inset-0 z-10 mx-auto w-full px-4 py-10 mb-4 flex flex-col items-center justify-center">
        {/* セクションタイトル */}
        <SectionTitle enTitle="CATEGORY" jaTitle="カテゴリー" />

        {/* アイコン一覧 */}
        <div className="mx-auto mt-6 text-center">
          <div className="inline-grid category_grid gap-y-6 gap-3">
            {Object.entries(activeCategories).map(([jaCategory, enCategory]) => (
              <Link 
                key={jaCategory} 
                href={`/categories/${enCategory}`}
                className="flex flex-col items-center justify-center pb-1 w-[77px] h-[88px] hover:opacity-80 transition-opacity"
              >
                <Image 
                  src={`/images/category_icon/${enCategory}.png`} 
                  alt={jaCategory} 
                  width={72}
                  height={85}
                  quality={100}
                  className="object-contain"
                  unoptimized
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}