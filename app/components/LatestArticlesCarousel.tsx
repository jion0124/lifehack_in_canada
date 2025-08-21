import { getLatestArticles } from '../api/articles';
import ArticleCarousel from './ArticleCarousel';
import SectionTitle from './SectionTitle';

export default async function LatestArticlesCarousel() {
  const articles = await getLatestArticles();

  return (
    <section className="mt-8 max-w-6xl mx-auto">
      <SectionTitle enTitle="NEW" jaTitle="新着記事" color="text-red-600" />
      <div className="h-12" />
      <ArticleCarousel articles={articles} />
    </section>
  );
}
