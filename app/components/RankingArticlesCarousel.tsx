'use client';

import '../globals.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { CarouselArrow } from './CarouselArrow';
import { useRef, useCallback, useState, useEffect } from 'react';
import { convertCategory, Article, getArticleById } from '../api/articles';
import { format } from 'date-fns';
import SectionTitle from './SectionTitle';
import MoreButton from './MoreButton';
import { Swiper as SwiperType } from 'swiper';

// 表示したい記事のID配列
const RANKING_ARTICLE_IDS = [
  "J7UsoiopC",  // キノコの記事のID
  "wxyZeG3f1a2i",  // 幸せについての記事のID
  "igqO78YnRRl",  // カナダの州についての記事のID
  "bU4R1vG1RS",  // Shakepayについての記事のID
  "AJ3uifhk7"   // ポイ活の記事のID
];

export default function RankingArticleCarousel() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchRankingArticles = async () => {
      try {
        const articlePromises = RANKING_ARTICLE_IDS.map(id => getArticleById(id));
        const fetchedArticles = await Promise.all(articlePromises);
        // getArticleByIdの戻り値から記事データのみを抽出
        const articlesData = fetchedArticles.map(result => ({
          ...result,
          relatedArticles: undefined // 関連記事は不要なので除外
        }));
        setArticles(articlesData);
        setMounted(true);
      } catch (error) {
        console.error('ランキング記事の取得に失敗しました:', error);
      }
    };

    fetchRankingArticles();
  }, []);

  const updateNavigationState = useCallback(() => {
    if (swiperRef.current) {
      setIsBeginning(swiperRef.current.isBeginning);
      setIsEnd(swiperRef.current.isEnd);
    }
  }, []);

  if (!mounted || articles.length === 0) return null;

  return (
    <>
      <SectionTitle enTitle="RANKING" jaTitle="週間ランキング" color="text-red-600" />
      <div className="relative flex flex-col gap-8 mt-8">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={10}
          slidesPerView={1}
          slidesPerGroup={1}
          speed={600}
          loop={false}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            updateNavigationState();
          }}
          onSlideChange={updateNavigationState}
          navigation={{
            prevEl: '.swiper-button-prev',
            nextEl: '.swiper-button-next'
          }}
          pagination={{ 
            clickable: true,
          }}
          className="w-full !px-5 !pb-8"
        >
          <CarouselArrow isEnd={isEnd} />
          {articles.map((article, index) => (
            <SwiperSlide key={article.id} className="!flex items-start justify-center">
              <div className="w-full max-w-3xl">
                {/* ランキング番号（カードの真上に配置） */}
                <div className="ml-8 mb-3">
                  <Image
                    src={`/images/no.${index + 1}.png`}
                    alt={`No.${index + 1}`}
                    width={70}
                    height={70}
                    className="drop-shadow-rank"
                    unoptimized
                  />
                </div>

                {/* カード本体 */}
                <Link 
                  href={`/categories/${convertCategory.toEn(article.category)}/${article.id}`}
                  className="block"
                >
                  <div className="
                    bg-white 
                    border 
                    border-gray-800 
                    shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] 
                    p-2
                    flex
                    flex-col
                    min-h-[300px]
                    max-h-[450px]
                    mx-auto
                    w-10/12
                  ">
                    {article.heroPhoto && (
                      <div className="relative aspect-[5/3] flex-shrink-0">
                        <Image
                          src={article.heroPhoto.url}
                          alt={article.title}
                          fill
                          className="object-cover rounded-lg"
                          priority={index < 3}
                        />
                      </div>
                    )}
                    <div className="flex flex-col flex-grow py-4 px-1 justify-between">
                      <div>
                        <p className="text-sm font-fugazOne">
                          {format(new Date(article.publishedAt), 'yyyy.MM.dd')}
                        </p>
                        <h3 className="text-xl line-clamp-2 my-2">
                          {article.title}
                        </h3>
                      </div>
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
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="swiper-pagination !bottom-0" />
      </div>
    </>
  );
}
