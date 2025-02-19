'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { convertCategory, getRelatedArticles, Article, JapaneseCategory } from '../api/articles'
import { ArticleCard } from './ArticleCard'
import SectionTitle from './SectionTitle'

type RelatedArticlesCardProps = {
  currentArticleId: string
  category: JapaneseCategory
  limit?: number
}

export const RelatedArticlesCard: React.FC<RelatedArticlesCardProps> = ({
  currentArticleId,
  category,
  limit = 5
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchRelated = async () => {
      setIsLoading(true);
      try {
        const data = await getRelatedArticles(currentArticleId, category, limit);
        setArticles(data);
      } catch (error) {
        console.error('Error fetching related articles:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRelated();
  }, [currentArticleId, category, limit]);

  return (
    <>
      <SectionTitle enTitle="RELATED" jaTitle="関連記事" />
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
