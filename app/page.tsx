/* app/page.tsx */
import TodayWolfQuote from './components/TodayWolfQuote';
import CategorySection from './components/CategorySection';
import LatestArticlesCarousel from './components/LatestArticlesCarousel';
import ArticlesList from './components/ArticlesList';
import { getAllArticles } from './api/articles';
import RankingArticlesCarousel from './components/RankingArticlesCarousel';
import TopWasabi from './components/TopWasabi';
import { Others } from './components/Others';
import Image from 'next/image';
import { PixelArrow } from './components/PixelArrow';
import { Banner } from './components/Banner';

export default async function HomePage() {
  const [allArticles] = await Promise.all([
    getAllArticles(),
  ]);

  return (
      <main >
        <Banner />
        <TodayWolfQuote />
        <CategorySection />

        <LatestArticlesCarousel />
        <ArticlesList articles={allArticles} />
        <RankingArticlesCarousel />
        <TopWasabi />
        <Others />
      </main>
  );
}