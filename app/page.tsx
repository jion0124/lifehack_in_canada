/* app/page.tsx */
import { getLatestArticles, logCategoryArticleCounts } from './api/articles';
import { LatestArticlesCard } from './components/LatestArticlesCard';
import ArticlesList from './components/ArticlesList';
import CategorySection from './components/CategorySection';
import { Banner } from './components/Banner';
import TopWasabi from './components/TopWasabi';
import RankingArticlesCarousel from './components/RankingArticlesCarousel';
import TodayWolfQuote from './components/TodayWolfQuote';

export default async function Home() {
  // テスト用：記事数をログ出力
  try {
    await logCategoryArticleCounts();
  } catch (error) {
    console.error('記事数取得エラー:', error);
  }

  const articles = await getLatestArticles();

  return (
    <main className="min-h-screen bg-gray-50">
      <Banner />
      <TopWasabi />
      <CategorySection />
      <TodayWolfQuote />
      <RankingArticlesCarousel />
      <ArticlesList articles={articles} />
      <LatestArticlesCard />
    </main>
  );
}