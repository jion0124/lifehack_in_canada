import Image from 'next/image';
import { Article } from '../api/articles';

interface ArticleCardProps {
  article: Article;
}

export const ArticleCard = ({ article }: ArticleCardProps) => {
  return (
    <div className="flex gap-3 border-b-2 border-dotted border-gray-300 py-2">
      {/* 写真コンテナ - 中央揃えと固定幅 */}
      <div className="w-1/3 flex-none flex items-center">
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={`${article.heroPhoto.url}?w=400&h=300&fit=crop`}
            alt={article.title}
            fill
            className="object-cover border border-gray-700"
            quality={85}
          />
        </div>
      </div>
      
      {/* 記事情報 */}
      <div className="flex-grow space-y-2">
        {/* 日付 */}
        <p className="text-sm text-gray-800 font-bold">
          {new Date(article.publishedAt).toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          }).replace(/\//g, '.')}
        </p>
        
        {/* タイトル */}
        <div className="space-y-1">
          <h3 className="text-base text-gray-800 line-clamp-2">{article.title}</h3>
        </div>

        <div className="space-y-1">
          <div className="flex flex-wrap gap-1">
            {article.tag?.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs border border-gray-300 rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};