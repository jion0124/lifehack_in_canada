import { getAllArticles } from './api/articles';
import ArticlesList from './components/ArticlesList';
import CategorySection from './components/CategorySection';
import { Banner } from './components/Banner';
import TopWasabi from './components/TopWasabi';
import RankingArticlesCarousel from './components/RankingArticlesCarousel';
import TodayWolfQuote from './components/TodayWolfQuote';
import { Others } from './components/Others';
import LatestArticlesCarousel from './components/LatestArticlesCarousel';

export default async function Home() {
  const allArticles = await getAllArticles();

  return (
    <main>
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