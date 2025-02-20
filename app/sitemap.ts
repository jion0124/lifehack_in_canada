import { MetadataRoute } from "next";
import { getAllArticles, getArticlesByCategory, CATEGORY_MAPPING } from "./api/articles";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 記事一覧を取得
  const articles = await getAllArticles();
  
  // 現在時刻を取得（確実に有効な日付）
  const currentDate = new Date().toISOString();

  // ドメイン名（本番URL）を指定
  const baseUrl = "https://ca-seikatsu.com";

  // 静的ページの定義
  const staticPages = [
    {
      url: `${baseUrl}/`,
      lastModified: currentDate,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/character`,
      lastModified: currentDate,
      priority: 0.8,
    }
  ];

  // カテゴリーページの定義
  const categoryPages = Object.entries(CATEGORY_MAPPING).map(([jaCategory, enCategory]) => ({
    url: `${baseUrl}/categories/${enCategory}`,
    lastModified: currentDate,
    priority: 0.9,
  }));

  // 記事ページの定義
  const articlePages = articles.map((article) => {
    const categoryEn = CATEGORY_MAPPING[article.category];
    // 日付の安全な処理
    let lastMod;
    try {
      lastMod = article.updatedAt ? new Date(article.updatedAt).toISOString() : currentDate;
    } catch (e) {
      lastMod = currentDate; // エラーが発生した場合は現在時刻を使用
    }
    
    return {
      url: `${baseUrl}/categories/${categoryEn}/${article.id}`,
      lastModified: lastMod,
      priority: 0.7,
    };
  });

  // すべてのページをマージして返却
  return [...staticPages, ...categoryPages, ...articlePages];
}