'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Article, CATEGORY_MAPPING, getActiveCategories, JapaneseCategory, EnglishCategory, convertCategory } from '../api/articles';
import { ArticleCard } from './ArticleCard';
import SectionTitle from './SectionTitle';
import MoreButton from './MoreButton';

type Props = {
  articles: Article[];  // 全記事データを受け取る
};

const ArticlesList: React.FC<Props> = ({ articles }) => {
  const [selectedCategory, setSelectedCategory] = useState<EnglishCategory>('preparation');
  const [activeCategories, setActiveCategories] = useState<Record<JapaneseCategory, EnglishCategory>>({} as Record<JapaneseCategory, EnglishCategory>);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchActiveCategories = async () => {
      try {
        const categories = await getActiveCategories();
        setActiveCategories(categories);
        // 最初のアクティブカテゴリーを選択状態にする
        const firstCategory = Object.values(categories)[0];
        if (firstCategory) {
          setSelectedCategory(firstCategory);
        }
      } catch (error) {
        console.error('アクティブカテゴリー取得エラー:', error);
        // エラーの場合はデフォルトのカテゴリーを表示
        const defaultCategories = {
          '渡航前': 'preparation',
          '生活基本': 'lifestyle',
          '買い物': 'shopping',
          'マネー': 'finance',
          '留学哲学': 'mindset',
          'WASABI': 'wasabi'
        } as Record<JapaneseCategory, EnglishCategory>;
        setActiveCategories(defaultCategories);
        setSelectedCategory('preparation');
      } finally {
        setIsLoading(false);
      }
    };

    fetchActiveCategories();
  }, []);

  const handleCategoryChange = (category: EnglishCategory) => {
    setSelectedCategory(category);
  };

  const filteredArticles = articles
    .filter(article => {
      const categoryEn = CATEGORY_MAPPING[article.category as keyof typeof CATEGORY_MAPPING];
      return categoryEn === selectedCategory;
    })
    .slice(0, 5); // 最大5件に制限

  // もっと見るボタンの情報を生成
  const getMoreButtonInfo = () => {    
    const jpCategory = Object.entries(CATEGORY_MAPPING).find(([_, value]) => value === selectedCategory)?.[0];
    return {
      path: `/categories/${selectedCategory}`,
      text: `${jpCategory}の記事をもっとみる`
    };
  };

  const { path, text } = getMoreButtonInfo();

  if (isLoading) {
    return (
      <div className="py-16 px-2 max-w-6xl mx-auto bg-white">
        <SectionTitle enTitle="ALL" jaTitle="記事一覧" color="text-red-600" />
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

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
    <div className="max-w-4xl mx-auto mb-10 shadow-md">
      <div className="">
        {filteredArticles.map((article) => (
          <Link 
          key={article.id}
          href={`/categories/${convertCategory.toEn(article.category as JapaneseCategory)}/${article.id}`}
        >
          <ArticleCard article={article} />
        </Link>
        ))}
      </div>
    </div>

      {/* もっと見るボタン追加部分 */}
      <div className="text-center">
        <MoreButton href={path} text={text} />
      </div>

    </div>
    </>
  );
};

export default ArticlesList;
