'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useRef, useCallback, useState } from 'react';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ImageCarouselArrow } from './ImageCarouselArrow';

interface ImageSliderProps {
  images: {
    url: string;
    alt?: string;
  }[];
  quality?: number;
}

export const ImageSlider = ({ images, quality = 85 }: ImageSliderProps) => {
  const swiperRef = useRef<any>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const updateNavigationState = useCallback(() => {
    if (swiperRef.current) {
      setIsBeginning(swiperRef.current.isBeginning);
      setIsEnd(swiperRef.current.isEnd);
    }
  }, []);

  return (
    <div className="relative flex flex-col gap-8 mx-[-.75rem]">
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
        className="w-full !px-5 "
      >
        <ImageCarouselArrow
          isBeginning={isBeginning}
          isEnd={isEnd}
          size={30}
        />
        {images.map((image, index) => (
          <SwiperSlide key={`slide-${index}`} className="flex items-center justify-center">
            <div className="w-full mx-auto">
              <div className="relative aspect-[5/3]">
                <Image
                  src={image.url}
                  alt={image.alt || `スライド ${index + 1}`}
                  fill
                  className="object-cover rounded-md border border-gray-800"
                  sizes="(max-width: 768px) 100vw, 80vw"
                  quality={quality}
                  priority={index === 0}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="swiper-pagination !bottom-0" />
    </div>
  );
};