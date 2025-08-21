'use client'

import Link from 'next/link'
import React from 'react'
import { convertCategory, getLatestArticles, Article } from '../api/articles'
import { ArticleCard } from './ArticleCard'
import SectionTitle from './SectionTitle'
import { useEffect, useState, useCallback } from 'react';

export const LatestArticlesCard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  
  useEffect(() => {
    const fetchLatest = useCallback(async () => {
      try {
        const data = await getLatestArticles();
        setArticles(data);
      } catch (error) {
        console.error('Error fetching latest articles:', error);
      } finally {
        setIsLoading(false);
      }
    }, []);

    fetchLatest();
  }, []);
  return (
    <>
       {/* 記事リスト */}
       <SectionTitle enTitle="NEW" jaTitle="新着記事" />
      <div className="max-w-4xl mx-auto mt-4 mb-20">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
          </div>
        ) : (
          <div>
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
    </>
  )
}