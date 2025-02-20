import { MetadataRoute } from "next";
import { getAllArticles, getArticlesByCategory, CATEGORY_MAPPING } from "./api/articles";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 記事一覧を取得
  const articles = await getAllArticles();

  // ドメイン名（本番URL）を指定
  const baseUrl = "https://lifehack-in-canada.com";

  // 静的ページの定義
  const staticPages = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date().toISOString(),
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date().toISOString(),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/character`,
      lastModified: new Date().toISOString(),
      priority: 0.8,
    }
  ];

  // カテゴリーページの定義
  const categoryPages = Object.entries(CATEGORY_MAPPING).map(([jaCategory, enCategory]) => ({
    url: `${baseUrl}/categories/${enCategory}`,
    lastModified: new Date().toISOString(),
    priority: 0.9,
  }));

  // 記事ページの定義
  const articlePages = articles.map((article) => {
    const categoryEn = CATEGORY_MAPPING[article.category];
    return {
      url: `${baseUrl}/categories/${categoryEn}/${article.id}`,
      lastModified: new Date(article.updatedAt).toISOString(),
      priority: 0.7,
    };
  });

  // すべてのページをマージして返却
  return [...staticPages, ...categoryPages, ...articlePages];
}