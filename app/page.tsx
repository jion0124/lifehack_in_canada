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

export default async function HomePage() {
  const [allArticles] = await Promise.all([
    getAllArticles(),
  ]);

  return (
      <main >
        <section className="relative w-full h-[400px]"> 
      <div className="overflow-x-auto h-full scrollbar-hide">
        <div className="relative w-[1980px] h-full scrollbar-hide">
          <Image
            src="/images/top_image.png"
            alt="カナダ生活バナー"
            fill
            style={{ objectFit: 'cover' }}
            unoptimized
          />
        </div>
      </div>

      <div className="absolute bottom-12 left-2 mb-1">
        <Image
          src="/images/top_image_icon.png"
          alt="アイコン"
          width={180}
          height={180}
          unoptimized
        />
      </div>

      <div className="absolute right-0 top-1/2 mr-2 opacity-80">
    <PixelArrow direction="right" />
  </div>
    </section>

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