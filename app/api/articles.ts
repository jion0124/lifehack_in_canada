// app/api/articles.ts

import { cache } from 'react';
import { client } from '../libs/microcms';

/* ------------------------------------------------------------------
 * カテゴリマッピング: 「日本語 -> 英語」の対応表
 * ------------------------------------------------------------------ */
export const CATEGORY_MAPPING = {
  '渡航前': 'preparation',
  '生活基本': 'lifestyle',
  '観光': 'sightseeing',
  '外食': 'dining',
  '買い物': 'shopping',
  '交通': 'transport',
  '医療': 'healthcare',
  '文化歴史': 'culture',  
  'マネー': 'finance',
  '英語学習': 'english',
  '留学哲学': 'mindset',
  'WASABI': 'wasabi'
} as const;

// 日本語カテゴリ (キー)
export type JapaneseCategory = keyof typeof CATEGORY_MAPPING;
// 英語カテゴリ (値)
export type EnglishCategory = typeof CATEGORY_MAPPING[JapaneseCategory];

type CategoryPair = [JapaneseCategory, EnglishCategory];
/* ------------------------------------------------------------------
 * 型安全なカテゴリー変換関数
 * - toEn: 日本語カテゴリ (例: "渡航前") → 英語 (例: "preparation")
 * - toJa: 英語カテゴリ (例: "preparation") → 日本語 (例: "渡航前")
 * ------------------------------------------------------------------ */
export const convertCategory = {
  toEn: (ja: JapaneseCategory): EnglishCategory => {
    // もし CATEGORY_MAPPING に含まれていない日本語が来たらエラー
    if (!(ja in CATEGORY_MAPPING)) {
      throw new Error(`未定義の日本語カテゴリー: ${ja}`);
    }
    return CATEGORY_MAPPING[ja];
  },

  toJa(en: EnglishCategory): JapaneseCategory {
    // 2) Object.entries(...) の戻り値に CategoryPair[] を割り当て
    const mappingEntries = Object.entries(CATEGORY_MAPPING) as CategoryPair[];

    const found = mappingEntries.find(([_, val]) => val === en);
    if (!found) {
      throw new Error(`Undefined English category: ${en}`);
    }
    // found[0] は JapaneseCategory
    return found[0];
  },
};

/* ------------------------------------------------------------------
 * 以降、記事取得関数など
 * ------------------------------------------------------------------ */

export type Rating = {
  fieldId: string;
  metric: string;
  value: number;
};

export type Writer = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  history: string;
  name: string;
  image: {
    url: string;
    width: number;
    height: number;
  };
  intro: string;
  tag: string[];
  ratings: Rating[];
  button: boolean;
};

export type Character = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  history: string;
  name: string;
  image: {
    url: string;
    width: number;
    height: number;
  };
  intro: string;
  tag: string[];
  ratings: Rating[];
  button: boolean;
};

export type Article = {
  id: string;
  category: JapaneseCategory; // 英語カテゴリを保存
  title: string;
  tag: string[];
  wolf_quote: string;
  content: string;
  wolf_monologue: string;
  instaPost?: string;
  publishedAt: string;
  updatedAt: string;
  heroPhoto: {
    url: string;
    width: number;
    height: number;
  };
  writer: Writer[];
};

/* ------------------------------------------------------------------
 * microCMSから記事を取得する関数群
 * ------------------------------------------------------------------ */

// fetch処理をキャッシュ化
const fetchWithCache = cache(async (endpoint: string, queries?: Record<string, any>) => {
  try {
    const data = await client.get({
      endpoint,
      queries: {
        ...queries,
        fields: queries?.fields || 'id,title,publishedAt',
        depth: 1
      }
    });
    return data;
  } catch (error) {
    console.error(`API fetch error (${endpoint}):`, error);
    throw new Error(`Failed to fetch ${endpoint}`);
  }
});

// 全記事取得
export const getAllArticles = cache(async () => {
  const data = await fetchWithCache('articles', {
    fields: 'id,category,title,publishedAt,heroPhoto,tag,',
    limit: 100,
    orders: '-publishedAt'
  });
  return data.contents as Article[];
});

// 記事詳細取得（関連記事も含めて最適化版）
export const getArticleById = cache(async (id: string) => {
  try {
    const [article, related] = await Promise.all([
      fetchWithCache(`articles/${id}`, {
        fields: 'id,category,title,tag,wolf_quote,content,wolf_monologue,instaPost,publishedAt,heroPhoto,updatedAt,writer',
        customRequestInit: {
          next: {
            revalidate: 60 * 30 // 30分キャッシュ
          }
        }
      }),
      fetchWithCache('articles', {
        fields: 'id,title,publishedAt,heroPhoto,category',
        limit: 3,
        orders: '-publishedAt',
        filters: `id[not_equals]${id}`,
        customRequestInit: {
          next: {
            revalidate: 60 * 15 // 15分キャッシュ
          }
        }
      })
    ]);

    return {
      ...(article as Article),
      relatedArticles: related.contents as Article[]
    };
  } catch (error) {
    console.error(`Failed to fetch article ${id}:`, error);
    throw new Error('記事の取得に失敗しました');
  }
});

export type SortOrder = 'desc' | 'asc';

// カテゴリで記事取得 + ページネーション（最適化版）
export const getArticlesByCategory = cache(async (
  category: JapaneseCategory,
  sortOrder: SortOrder = 'desc',
  page: number = 1,
  limit: number = 30
) => {
  const offset = (page - 1) * limit;
  const data = await fetchWithCache('articles', {
    fields: 'id,title,publishedAt,heroPhoto,tag,category,updatedAt',
    filters: `category[contains]${category}`, 
    orders: sortOrder === 'desc' ? '-publishedAt' : 'publishedAt',
    offset,
    limit,
    customRequestInit: {
      next: {
        revalidate: 60 * 20 // 20分キャッシュ
      }
    }
  });

  return {
    articles: data.contents as Article[],
    totalCount: data.totalCount,
    pageInfo: {
      currentPage: page,
      totalPages: Math.ceil(data.totalCount / limit),
      hasNextPage: page * limit < data.totalCount
    }
  };
});

// 新着記事取得（最適化版）
export const getLatestArticles = cache(async () => {
  const data = await fetchWithCache('articles', {
    fields: 'id,title,publishedAt,heroPhoto,tag,updatedAt,category',
    limit: 5,
    orders: '-publishedAt',
    customRequestInit: {
      next: {
        revalidate: 60 * 5 // 5分キャッシュ（短縮）
      }
    }
  });
  return data.contents as Article[];
});

// 関連記事取得（最適化版）
export const getRelatedArticles = cache(async (
  currentArticleId: string,
  category: JapaneseCategory,
  limit: number = 5
) => {
  const data = await fetchWithCache('articles', {
    fields: 'id,title,publishedAt,heroPhoto,writer,category',
    filters: `category[contains]${category}[and]id[not_equals]${currentArticleId}`,
    orders: '-publishedAt',
    limit,
    customRequestInit: {
      next: {
        revalidate: 60 * 15 // 15分キャッシュ
      }
    }
  });
  return data.contents as Article[];
});

export const getAllCharacter = cache(async () => {
  const data = await fetchWithCache('character', {
    fields: 'id,name,history,createdAt,image,intro,tag,ratings,button',
    limit: 100,
    orders: 'createdAt',
    customRequestInit: {
      next: {
        revalidate: 60 * 60 // 1時間キャッシュ
      }
    }
  });
  return data.contents as Character[];
});

export const getArticlesByWriter = cache(async (
  writerId: string,
  sortOrder: SortOrder = 'desc',
  page: number = 1,
  limit: number = 30
) => {
  const offset = (page - 1) * limit;
  const data = await fetchWithCache('articles', {
    fields: 'id,title,publishedAt,heroPhoto,tag,category,writer',
    filters: `writer[contains]${writerId}`,
    orders: sortOrder === 'desc' ? '-publishedAt' : 'publishedAt',
    offset,
    limit,
    customRequestInit: {
      next: {
        revalidate: 60 * 20 // 20分キャッシュ
      }
    }
  });
  return {
    articles: data.contents as Article[],
    totalCount: data.totalCount,
  };
});

export const getLatestWolfQuote = cache(async (): Promise<Article | null> => {
  try {
    const { contents } = await client.getList<Article>({
      endpoint: 'articles',
      queries: {
        limit: 1,
        orders: '-publishedAt',
        filters: 'wolf_quote[exists]' // wolf_quoteフィールドが存在する記事のみ
      }
    });
    return contents[0] || null;
  } catch (error) {
    console.error('オオカミ語録取得エラー:', error);
    return null;
  }
});

// ランダムでオオカミ語録を取得
export const getRandomWolfQuote = cache(async (): Promise<Article | null> => {
  try {
    // 直接MicroCMSからwolf_quoteがある記事を取得
    const data = await fetchWithCache('articles', {
      fields: 'id,category,title,wolf_quote,publishedAt',
      filters: 'wolf_quote[exists]',
      limit: 100, // 最大100件取得
      orders: '-publishedAt',
      customRequestInit: {
        next: {
          revalidate: 60 * 60 // 1時間キャッシュ
        }
      }
    });
    
    const wolfQuoteArticles = data.contents as Article[];
    
    if (wolfQuoteArticles.length === 0) {
      return null;
    }
    
    // ランダム選択
    const randomIndex = Math.floor(Math.random() * wolfQuoteArticles.length);
    return wolfQuoteArticles[randomIndex];
  } catch (error) {
    console.error('ランダムオオカミ語録取得エラー:', error);
    return null;
  }
});

// おすすめ記事（featured）を取得
export const getFeaturedArticles = cache(async (limit: number = 5) => {
  try {
    const data = await client.get({
      endpoint: 'featured',
      queries: {
        fields: 'id,featured,featured.id,featured.title,featured.publishedAt,featured.heroPhoto,featured.tag,featured.category',
        limit
      }
    });
    
    // featured APIのレスポンス構造に合わせて処理
    if (data.contents && data.contents.length > 0) {
      const featuredContent = data.contents[0];
      
      if (featuredContent.featured && Array.isArray(featuredContent.featured)) {
        // limitに達していない場合は、実際の記事数を返す
        const articles = featuredContent.featured.slice(0, limit);
        return articles as Article[];
      }
    }
    
    return [];
  } catch (error) {
    console.error('おすすめ記事取得エラー:', error);
    return [];
  }
});

// any の代わりに型を指定
type SwipeRef = {
  isBeginning: boolean;
  isEnd: boolean;
};

/* ------------------------------------------------------------------
 * カテゴリー別記事数取得関数（最適化版）
 * ------------------------------------------------------------------ */
export const getCategoryArticleCounts = cache(async () => {
  try {
    // 1回のAPI呼び出しで全記事を取得
    const allArticles = await getAllArticles();
    
    // カテゴリー別に記事数をカウント
    const categoryCounts: Record<JapaneseCategory, number> = {} as Record<JapaneseCategory, number>;
    
    // 初期化：全カテゴリーを0件で初期化
    Object.keys(CATEGORY_MAPPING).forEach(jaCategory => {
      categoryCounts[jaCategory as JapaneseCategory] = 0;
    });
    
    // 記事をカウント
    allArticles.forEach(article => {
      const category = article.category as JapaneseCategory;
      if (category in categoryCounts) {
        categoryCounts[category]++;
      }
    });
    
    return categoryCounts;
  } catch (error) {
    console.error('カテゴリー別記事数取得エラー:', error);
    
    // エラーの場合は空のオブジェクトを返す
    const emptyCounts: Record<JapaneseCategory, number> = {} as Record<JapaneseCategory, number>;
    Object.keys(CATEGORY_MAPPING).forEach(jaCategory => {
      emptyCounts[jaCategory as JapaneseCategory] = 0;
    });
    
    return emptyCounts;
  }
});

// 記事があるカテゴリーのみを取得
export const getActiveCategories = cache(async () => {
  const categoryCounts = await getCategoryArticleCounts();
  const activeCategories: Record<JapaneseCategory, EnglishCategory> = {} as Record<JapaneseCategory, EnglishCategory>;
  
  for (const [jaCategory, count] of Object.entries(categoryCounts)) {
    if (count > 0) {
      activeCategories[jaCategory as JapaneseCategory] = CATEGORY_MAPPING[jaCategory as JapaneseCategory];
    }
  }
  
  return activeCategories;
});

// テスト用：現在の各カテゴリーの記事数をログ出力
export const logCategoryArticleCounts = async () => {
  const counts = await getCategoryArticleCounts();
  console.log('=== カテゴリー別記事数 ===');
  Object.entries(counts).forEach(([jaCategory, count]) => {
    const enCategory = CATEGORY_MAPPING[jaCategory as JapaneseCategory];
    console.log(`${jaCategory} (${enCategory}): ${count}件`);
  });
  console.log('========================');
  return counts;
};
