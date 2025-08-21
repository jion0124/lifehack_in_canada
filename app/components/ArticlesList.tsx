'use client'

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Article, CATEGORY_MAPPING, JapaneseCategory, EnglishCategory, convertCategory } from '../api/articles';
import { ArticleCard } from './ArticleCard';
import SectionTitle from './SectionTitle';
import MoreButton from './MoreButton';

type Props = {
  articles: Article[];  // 全記事データを受け取る
};

const ArticlesList: React.FC<Props> = ({ articles }) => {
  const [selectedCategory, setSelectedCategory] = useState<EnglishCategory>('preparation');

  // カテゴリー別記事数をメモ化
  const categoryCounts = useMemo(() => {
    const counts: Record<JapaneseCategory, number> = {} as Record<JapaneseCategory, number>;
    
    // 初期化
    Object.keys(CATEGORY_MAPPING).forEach(jaCategory => {
      counts[jaCategory as JapaneseCategory] = 0;
    });
    
    // 記事をカウント
    articles.forEach(article => {
      const category = article.category as JapaneseCategory;
      if (category in counts) {
        counts[category]++;
      }
    });
    
    return counts;
  }, [articles]);

  // アクティブカテゴリーをメモ化
  const activeCategories = useMemo(() => {
    const active: Record<JapaneseCategory, EnglishCategory> = {} as Record<JapaneseCategory, EnglishCategory>;
    Object.entries(categoryCounts).forEach(([jaCategory, count]) => {
      if (count > 0) {
        active[jaCategory as JapaneseCategory] = CATEGORY_MAPPING[jaCategory as JapaneseCategory];
      }
    });
    return active;
  }, [categoryCounts]);

  // 最初のアクティブカテゴリーを選択状態にする
  useEffect(() => {
    const firstCategory = Object.values(activeCategories)[0];
    if (firstCategory) {
      setSelectedCategory(firstCategory);
    }
  }, [activeCategories]);

  // フィルタリングされた記事をメモ化
  const filteredArticles = useMemo(() => {
    return articles
      .filter(article => {
        const categoryEn = CATEGORY_MAPPING[article.category as keyof typeof CATEGORY_MAPPING];
        return categoryEn === selectedCategory;
      })
      .slice(0, 5); // 最大5件に制限
  }, [articles, selectedCategory]);

  // カテゴリー変更ハンドラーをメモ化
  const handleCategoryChange = useCallback((category: EnglishCategory) => {
    setSelectedCategory(category);
  }, []);

  // もっと見るボタンの情報をメモ化
  const moreButtonInfo = useMemo(() => {
    const jpCategory = Object.entries(CATEGORY_MAPPING).find(([_, value]) => value === selectedCategory)?.[0];
    return {
      path: `/categories/${selectedCategory}`,
      text: `${jpCategory}の記事をもっとみる`
    };
  }, [selectedCategory]);

  return (
    <>  

      <div className="relative w-full h-8 mt-12 z-10">
        <Image
          src="/images/all_articles_top.png"
          alt="section top divider"
          fill
          className="object-contain object-bottom"
          priority
        />
      </div>


    <div className="py-16 px-2 max-w-6xl mx-auto bg-white">

      <SectionTitle enTitle="ALL" jaTitle="記事一覧" color="text-red-600" />

     {/* 横スクロール可能なカテゴリーバー */}
     <div 
      className="
        mt-8
        mb-6 
        flex 
        overflow-x-auto 
        space-x-4 
        pb-3 
        px-4
        -mx-3
        scrollbar-none
        [-ms-overflow-style:none]
        [scrollbar-width:none]
        [&::-webkit-scrollbar]:hidden
      "
    >
        {Object.entries(activeCategories).map(([jaCategory, enCategory]) => {
          const isActive = selectedCategory === enCategory;
          return (
            <button
              key={jaCategory}
              onClick={() => handleCategoryChange(enCategory)}
              className={`
                flex-shrink-0 px-6 py-3 rounded-full font-medium
                transition-colors duration-200 whitespace-nowrap
                border
                ${
                  isActive
                    ? 'bg-black text-white border-gray-600'
                    : 'bg-white text-gray-800 border-gray-800 shadow-[1px_2px_0px_0px_rgba(0,0,0,1)] '
                }
              `}
            >
              {jaCategory}
            </button>
          );
        })}
      </div>

        {/* 記事リストコンテナ */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="space-y-6">
            {filteredArticles.map((article, index) => (
              <div key={article.id}>
                <Link 
                  href={`/categories/${convertCategory.toEn(article.category as JapaneseCategory)}/${article.id}`}
                >
                  <ArticleCard article={article} />
                </Link>
              </div>
            ))}
          </div>
        </div>

      {/* もっと見るボタン追加部分 */}
      <div className="text-center">
        <MoreButton href={moreButtonInfo.path} text={moreButtonInfo.text} />
      </div>
    </div>

    {/* 下の区切り線 - 画面幅100% */}
    <div className="relative w-full h-20 z-10">
      <Image
        src="/images/all_articles_bottom.png"
        alt="section bottom divider"
        fill
        className="object-contain object-top"
        priority
      />
    </div>
    </>
  );
};

export default ArticlesList;
