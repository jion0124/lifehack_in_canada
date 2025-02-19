'use client';

import Image from 'next/image';
import { Article,convertCategory,getLatestArticles } from '../api/articles';
import WolfQuote from './WolfQuote';
import { useEffect, useState } from 'react';
import '../globals.css';
import WolfMonologue from './WolfMonologue';
import parse from 'html-react-parser';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ImageSlider } from './ImageSlider';
import InstagramEmbed from './InstagramEmbed';
import WriterCard from './WriterCard';
import { ShareButtons } from './ShareButtons';
import Wasabi from './Wasabi';
import { LatestArticlesCard } from './LatestArticlesCard';
import { RelatedArticlesCard } from './RelatedArticles';

interface InlineImage {
  url: string;
  alt?: string;
}

// スライダーコンポーネント（超シンプル例）
// 実際は Swiper や react-slick を使うと便利です
function InlineSlider({ images }: { images: InlineImage[] }) {
  return <ImageSlider images={images} />;
}

/**
 * 連続した <figure> 要素をまとめてスライダー化するためのヘルパー関数。
 * 「html-react-parser」でパースしたあとのReact要素配列を走査して、
 * <figure> が連続する部分だけ画像URLを抜き出し、<InlineSlider> に置き換えます。
 */
function mergeConsecutiveFigures(
  nodes: React.ReactNode,
  sliderMaker: (images: InlineImage[]) => React.ReactNode
): React.ReactNode {
  const arr = React.Children.toArray(nodes);
  const result: React.ReactNode[] = [];
  let figureBuffer: React.ReactNode[] = [];

  function flushBuffer() {
    if (figureBuffer.length === 0) return;

    if (figureBuffer.length === 1) {
      result.push(
        React.cloneElement(figureBuffer[0] as React.ReactElement, {
          key: uuidv4()
        })
      );
    } else {
      const images: InlineImage[] = figureBuffer.map((fig) => {
        if (React.isValidElement(fig)) {
          const figureEl = fig as React.ReactElement<{ children: React.ReactNode }>;
          const children = React.Children.toArray(figureEl.props.children);
          const imgTag = children.find(
            (child) => React.isValidElement(child) && (child.type as any) === 'img'
          ) as React.ReactElement<HTMLImageElement> | undefined;

          return {
            url: imgTag?.props?.src || '',
            alt: imgTag?.props?.alt
          };
        }
        return { url: '' };
      });

      result.push(React.cloneElement(
        sliderMaker(images) as React.ReactElement,
        { key: uuidv4() }
      ));
    }
    figureBuffer = [];
  }

  for (const node of arr) {
    if (React.isValidElement(node) && node.type === 'figure') {
      figureBuffer.push(node);
    } else {
      flushBuffer();
      result.push(React.cloneElement(
        node as React.ReactElement,
        { key: uuidv4() }
      ));
    }
  }
  flushBuffer();

  return result;
}

const TocSkeleton = () => (
  <div className="space-y-2 animate-pulse">
    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2 ml-4"></div>
    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
  </div>
);

type ArticlePageProps = {
  article: Article;
};

interface TocItem {
  id: string;
  text: string;
  level: 'h1' | 'h2';
}

export default function ArticlePage({ article }: ArticlePageProps) {
  const {
    publishedAt,
    category,
    title,
    heroPhoto,
    wolf_quote,
    content,
    wolf_monologue,
    instaPost,
    writer,
  } = article;

  // 目次生成を一度だけ実行
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [isLoadingToc, setIsLoadingToc] = useState(true);

  useEffect(() => {
    const contentDiv = document.querySelector('.article-content');
    if (!contentDiv) return;

    const headings = contentDiv.querySelectorAll('h1, h2');
    const items = Array.from(headings).map((heading, index) => {
      if (!heading.id) {
        heading.id = `heading-${index}`;
      }
      return {
        id: heading.id,
        text: heading.textContent ?? '',
        level: heading.tagName.toLowerCase() as 'h1' | 'h2'
      };
    });

    setTocItems(items);
    setIsLoadingToc(false);
  }, [article.content]);

  // 目次クリックでスムーススクロール
  const scrollToHeading = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  // 1) HTMLをパース
  const parsedContent = parse(content);
  
  // 2) 連続<figure>をまとめてスライダー化
  const mergedContent = mergeConsecutiveFigures(parsedContent, (images) => {
    return <InlineSlider images={images} />;
  });

  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 最新記事取ってくる
  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const data = await getLatestArticles();
        setArticles(data);
      } catch (error) {
        console.error('Error fetching latest articles:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLatest();
  }, []);

  return (
    <article className="bg-white max-w-screen-sm mx-auto px-3 pt-[52px]">

      {/* アイキャッチ画像 */}
      <div className="relative -mx-3 ">
        <div className="relative aspect-[5/3] w-full">
          <Image
            src={heroPhoto.url}
            alt={title}
            fill
            sizes="100vw"
            priority
            className="object-cover"
            quality={85}
          />
        </div>
      </div>

      {/* カテゴリ表示 */}
      <div className="my-3">
        <span className="inline-block bg-gray-200 text-xs px-2 py-1 rounded mr-2">
          {category}
        </span>
      </div>
      <h1 className="text-2xl mb-2">{title}</h1>

      {/* カテゴリとタグの表示 */}
      <div className="flex justify-between items-center my-3">
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
        <p className="text-sm text-gray-800">
          {new Date(publishedAt).toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          }).replace(/\//g, '.')}
        </p>
      </div>

      <div className="dot-divider mb-3" />

      <WolfQuote text={wolf_quote} />

      {/* 目次 */}
      {tocItems.length > 0 && (
        <nav className="my-8 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-lg font-bold mb-4">目次</h2>
          <div className="space-y-2">
            {isLoadingToc ? (
              <TocSkeleton />
            ) : (
              tocItems.map((item) => (
                <a
                  key={`toc-${item.id}`} // 一意なkeyを設定
                  href={`#${item.id}`}
                  onClick={scrollToHeading(item.id)}
                  className={`
                    block hover:text-blue-600 transition-colors underline decoration-black decoration
                    ${item.level === 'h2' ? 'ml-4' : ''}
                  `}
                >
                  {item.text}
                </a>
              ))
            )}
          </div>
        </nav>
      )}

      {/* 本文 (連続する <figure><img .../></figure> があればスライダーに！) */}
      <div className="article-content prose prose-sm sm:prose lg:prose-lg">
        {mergedContent}
      </div>

      <WolfMonologue text={wolf_monologue} />

      {instaPost && (
        <>
          <InstagramEmbed url={instaPost} />
          <div className="h-20"></div>
        </>
      )}

      {/* ライター情報 */}
      {/* 本当は常に表示させておくけど、応急措置 */}
      {writer && (
          <WriterCard writer={article.writer[0]} />
      )}
     
      <ShareButtons url={`${process.env.NEXT_PUBLIC_SITE_URL}/categories/${convertCategory.toEn(article.category)}/${article.id}`} title={article.title} />

      <RelatedArticlesCard currentArticleId={article.id} category={article.category} />
     <LatestArticlesCard />

      <Wasabi />

      
    </article>
  );
}
