'use client';

import { useState, useEffect } from 'react';
import { Article, convertCategory, getArticlesByWriter, SortOrder } from '../api/articles';
import { ArticleCard } from './ArticleCard';
import SectionTitle from './SectionTitle';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import Wasabi from './Wasabi';
import Link from 'next/link';

interface WriterArticlesListProps {
  writerId: string;
}

export function WriterArticlesList({ writerId }: WriterArticlesListProps) {
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [articles, setArticles] = useState<Article[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const ITEMS_PER_PAGE = 5;

  const fetchArticles = async (page: number, order: SortOrder) => {
    setIsLoading(true);
    try {
      const { articles: newArticles, totalCount } = await getArticlesByWriter(
        writerId,
        order,
        page,
        ITEMS_PER_PAGE
      );
      setArticles(newArticles);
      setTotalPages(Math.ceil(totalCount / ITEMS_PER_PAGE));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles(currentPage, sortOrder);
  }, [writerId, currentPage, sortOrder]);

  const handleSortChange = async (newOrder: SortOrder) => {
    setSortOrder(newOrder);
    setCurrentPage(1);
    await fetchArticles(1, newOrder);
  };

  const handlePageChange = (direction: 'prev' | 'next') => {
    const newPage = direction === 'next' ? currentPage + 1 : currentPage - 1;
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // articles が存在すれば最初の記事の最初のライターの名前を使用し、なければ writerId をフォールバックとして利用
  const writerName =
    articles.length > 0 && articles[0].writer.length > 0
      ? articles[0].writer[0].name
      : writerId;

  return (
    <div className="pt-16">
      <SectionTitle enTitle="WRITER'S ARTICLES" jaTitle={writerName} />
      <div className="px-2 max-w-6xl mx-auto bg-white mt-4">
        {/* ソートボタン */}
        <div className="pt-4 pb-2 flex items-center">
          <div className="flex space-x-4">
            <button
              onClick={() => handleSortChange('desc')}
              className={`
                flex-shrink-0 px-6 py-2 rounded-full text-base
                transition-colors duration-200 whitespace-nowrap
                border
                ${sortOrder === 'desc'
                  ? 'bg-gray-900 text-white border-gray-600'
                  : 'bg-white text-gray-800 border-gray-800 shadow-[1px_2px_0px_0px_rgba(0,0,0,1)]'}
              `}
            >
              新しい順
            </button>
            <button
              onClick={() => handleSortChange('asc')}
              className={`
                flex-shrink-0 px-6 py-2 rounded-full text-base
                transition-colors duration-200 whitespace-nowrap
                border
                ${sortOrder === 'asc'
                  ? 'bg-gray-900 text-white border-gray-600'
                  : 'bg-white text-gray-800 border-gray-800 shadow-[1px_2px_0px_0px_rgba(0,0,0,1)]'}
              `}
            >
              古い順
            </button>
          </div>
        </div>

        {/* 記事リスト */}
        <div className="max-w-4xl mx-auto">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
            </div>
          ) : (
            <div className="shadow-md">
              {articles.map((article) => (
                <Link 
                  key={article.id}
                  href={`/categories/${convertCategory.toEn(article.category)}/${article.id}`}
                >
                  <ArticleCard article={article} />
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* ページネーション */}
        <div className="flex justify-center items-center space-x-4 py-8 mt-4">
          <button
            onClick={() => handlePageChange('prev')}
            disabled={currentPage === 1}
            className={`
              p-2 rounded-full border
              transition-colors duration-200
              ${currentPage === 1
                ? 'bg-white text-gray-400 border-gray-300'
                : 'bg-white text-gray-800 border-gray-800 shadow-[1px_2px_0px_0px_rgba(0,0,0,1)]'}
            `}
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          <span className="font-medium">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => handlePageChange('next')}
            disabled={currentPage === totalPages}
            className={`
              p-2 rounded-full border
              transition-colors duration-200
              ${currentPage === totalPages
                ? 'bg-white text-gray-400 border-gray-300'
                : 'bg-white text-gray-800 border-gray-800 shadow-[1px_2px_0px_0px_rgba(0,0,0,1)]'}
            `}
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
      <Wasabi />
    </div>
  );
}
