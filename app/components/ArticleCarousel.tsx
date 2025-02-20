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
import { convertCategory, Article } from '../api/articles';
import { format } from 'date-fns'; // 追加
import { Swiper as SwiperType } from 'swiper';

interface ArticleCarouselProps {
  articles: Article[];
}

export default function ArticleCarousel({ articles }: ArticleCarouselProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [mounted, setMounted] = useState(false); // 追加

  useEffect(() => {
    setMounted(true);
  }, []);

  const updateNavigationState = useCallback(() => {
    if (swiperRef.current) {
      setIsBeginning(swiperRef.current.isBeginning);
      setIsEnd(swiperRef.current.isEnd);
    }
  }, []);

  // サーバーサイドレンダリング時は何も表示しない
  if (!mounted) return null;

  return (
    <div className="relative flex flex-col gap-8">
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
        <CarouselArrow
          isBeginning={isBeginning}
          isEnd={isEnd}
        />
        {articles.map((article) => (
          <SwiperSlide key={article.id} className="flex items-center justify-center"> 
            <Link href={`/categories/${convertCategory.toEn(article.category)}/${article.id}`} className="w-10/12 mx-auto">
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
                w-10/12
                mx-auto
              ">
                {article.heroPhoto && (
                  <div className="relative aspect-[5/3] flex-shrink-0">
                    <Image
                      src={article.heroPhoto.url}
                      alt={article.title}
                      fill
                      className="object-cover rounded-lg"
                      priority={articles.indexOf(article) < 3} // 最初の3画像に優先読み込み
                    />
                  </div>
                )}
                <div className="flex flex-col flex-grow py-4 px-1 justify-between">
                  <div>
                    <p className="text-sm font-fugazOne">
                      {/* 日付フォーマット修正 */}
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
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="swiper-pagination !bottom-0" />
    </div>
  );
}