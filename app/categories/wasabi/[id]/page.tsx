import { getArticleById } from '../../../api/articles';
import ArticlePage from '../../../components/ArticlePage';
import { notFound } from 'next/navigation';

interface CategoryArticlePageProps {
  params: {
    id: string;
  };
}

export default async function CategoryArticlePage({ params }: CategoryArticlePageProps) {
  try {
    const { id } = await Promise.resolve(params);
    const article = await getArticleById(id);

    if (!article) {
      notFound();
    }
    
    return <ArticlePage article={article} />;
  } catch (error) {
    console.error('記事の取得に失敗:', error);
    notFound();
  }
}