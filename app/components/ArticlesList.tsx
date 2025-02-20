'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Article, JapaneseCategory, EnglishCategory, CATEGORY_MAPPING, convertCategory } from '../api/articles';
import Link from 'next/link';
import MoreButton from './MoreButton';
import { ArticleCard } from './ArticleCard';
import SectionTitle from './SectionTitle';

type Props = {
  articles: Article[];  // 全記事データを受け取る
};

const CATEGORIES = Object.keys(CATEGORY_MAPPING) as Array<keyof typeof CATEGORY_MAPPING>;

const ArticlesList: React.FC<Props> = ({ articles }) => {
  const [selectedCategory, setSelectedCategory] = useState<EnglishCategory>('preparation');

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
        -mx-2
        scrollbar-none
        [-ms-overflow-style:none]
        [scrollbar-width:none]
        [&::-webkit-scrollbar]:hidden
      "
    >
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === CATEGORY_MAPPING[cat];
          return (
            <button
              key={cat}
              onClick={() => handleCategoryChange(CATEGORY_MAPPING[cat])}
              className={`
                flex-shrink-0 px-6 py-3 rounded-full font-medium
                transition-colors duration-200 whitespace-nowrap
                border
                ${
                  isActive
                    ? 'bg-gray-900 text-white border-gray-600'
                    : 'bg-white text-gray-800 border-gray-800 shadow-[1px_2px_0px_0px_rgba(0,0,0,1)] '
                }
              `}
            >
              {cat}
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
        <MoreButton href={path} text={text}/>
    </div>
    <div className="relative w-full h-20 z-10">
          <Image
            src="/images/all_articles_bottom.png"
            alt="section top divider"
            fill
            className="object-contain object-top"
            priority
          />
    </div>
  </>
  );
};

export default ArticlesList;
