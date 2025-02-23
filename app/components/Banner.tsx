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
      setShowArrow(isEnd > 1);
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const images = [1, 2, 3, 4, 5].map(num => ({
    src: `/images/top_image${num}.jpeg`,
    alt: `カナダ生活バナー${num}`
  }));

  return (
    <section className="relative w-full h-[400px] overflow-hidden">
      {/* 横スクロールする画像群 */}
      <div 
        ref={scrollContainerRef}
        className="overflow-x-auto scrollbar-hide h-full"
      >
        <div className="flex h-full">
          {images.map((image, index) => (
            <div 
              key={index} 
              className="relative h-full min-w-full flex-shrink-0"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-14 left-4 z-1 aspect-square xs:bottom-11" 
        style={{ width: '10%', height: '43px', minWidth: '170px' }}
      >
        <Image
          src="/images/top_image_icon.png"
          alt="アイコン"
          width={500}
          height={500}
          style={{ width: '100%', height: 'auto' }}
          unoptimized
        />
      </div>

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
