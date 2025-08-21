'use client'

import Image from 'next/image';
import SectionTitle from './SectionTitle';
import Link from 'next/link';
import { CATEGORY_MAPPING, getActiveCategories, JapaneseCategory, EnglishCategory } from '../api/articles';
import { useEffect, useState, useMemo } from 'react';

export default function CategorySection() {
  const [activeCategories, setActiveCategories] = useState<Record<JapaneseCategory, EnglishCategory>>({} as Record<JapaneseCategory, EnglishCategory>);
  const [isLoading, setIsLoading] = useState(true);

  // カテゴリ数に応じたグリッドクラスと背景スタイルを計算
  const gridConfig = useMemo(() => {
    const categoryCount = Object.keys(activeCategories).length;
    
    let gridClass = 'category_grid';
    let containerStyle: React.CSSProperties = { width: '100%', aspectRatio: '393/396' }; // デフォルト（3列×1行用）
    
    if (categoryCount > 6) {
      // 7個以上は4列表示
      gridClass = 'category_grid_7';
      containerStyle = { width: '100%', aspectRatio: '393/396' };
    } else if (categoryCount > 3) {
      // 4-6個は3列×2行
      gridClass = 'category_grid_4';
      containerStyle = { width: '100%', aspectRatio: '393/396' };
    }
    
    // 9個以上の場合のみ背景画像を大きく（縦に3つアイコンが並ぶ時）
    if (categoryCount >= 9) {
      containerStyle = { 
        width: '120%', 
        aspectRatio: '393/396',
        left: '-10%' // 中央に配置するために左に10%移動
      };
    }
    
    return { gridClass, containerStyle };
  }, [activeCategories]);

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
      {/* 背景用SVG画像 - カテゴリ数に応じてサイズを調整 */}
      <div className="relative w-full" style={gridConfig.containerStyle}>
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

        {/* アイコン一覧 - カテゴリ数に応じてグリッドクラスを動的に適用 */}
        <div className="mx-auto mt-6 text-center">
          <div className={`inline-grid ${gridConfig.gridClass} gap-y-6 gap-3`}>
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