'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { PixelArrow } from './PixelArrow';

export function Banner() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showArrow, setShowArrow] = useState(true);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const { scrollWidth, scrollLeft, clientWidth } = scrollContainer;
      const isEnd = scrollWidth - (scrollLeft + clientWidth);

      // 残りスクロール領域が 1px 以下なら末端と判定して矢印を隠す
      if (isEnd <= 1) {
        setShowArrow(false);
      } else {
        setShowArrow(true);
      }
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    handleScroll(); // 初期表示時にも判定
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="relative w-full h-[400px] overflow-hidden">
      {/* 横スクロールする画像群 */}
      <div 
        ref={scrollContainerRef}
        className="overflow-x-auto scrollbar-hide h-full"
      >
        <div className="flex w-[300%] h-full">
          <div className="relative w-1/3 h-full">
            <Image
              src="/images/top_image1.png"
              alt="カナダ生活バナー1"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div className="relative w-1/3 h-full">
            <Image
              src="/images/top_image2.png"
              alt="カナダ生活バナー2"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div className="relative w-1/3 h-full">
            <Image
              src="/images/top_image3.png"
              alt="カナダ生活バナー3"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </div>
      </div>

      {/* アイコン：背後の画像がスクロールしても動かない */}
      <div 
        className="absolute -bottom-3 left-4 z-10 aspect-square xs:-bottom-5" 
        style={{ width: '10%', minWidth: '170px' }} 
      >
        <Image
          src="/images/top_image_icon.png"
          alt="アイコン"
          fill
          className="object-contain" 
          unoptimized
        />
      </div>

      {/* 矢印：常に DOM に残し、opacity で出し分け → フェードアニメーション */}
      <div
        className={`
          absolute z-10 
          right-4 top-1/2 
          -translate-y-1/2 
          opacity-${showArrow ? '100' : '0'} 
          transition-opacity duration-300 
          ${showArrow ? 'pointer-events-auto' : 'pointer-events-none'}
        `}
      >
        <PixelArrow direction="right" />
      </div>
    </section>
  );
}
