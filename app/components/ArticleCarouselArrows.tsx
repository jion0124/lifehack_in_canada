import { PixelArrow } from './PixelArrow';

interface ArticleCarouselArrowsProps {
  isBeginning: boolean;
  isEnd: boolean;
  onPrevClick: () => void;
  onNextClick: () => void;
  direction: 'prev' | 'next';
  size?: number;
}

export const ArticleCarouselArrows = ({
  isBeginning,
  isEnd,
  onPrevClick,
  onNextClick,
  direction,
  size = 40 
}: ArticleCarouselArrowsProps) => {
  return (
    <>
      <div 
        className={`swiper-button-prev after:!content-none ${isBeginning ? 'swiper-button-disabled' : ''}`} 
        onClick={onPrevClick}
      >
        <div className={`
              swiper-button-${direction}
              !static !w-auto !h-auto !m-0
              ${direction === 'prev' ? 'left-0 rotate-180' : 'right-0'}
              after:!content-['']
            `}>
              <PixelArrow 
                color="#FF4444" 
                borderColor="#4A4A4A" 
                width={size}
                height={size}
              />
            </div>
      </div>
      <div 
        className={`swiper-button-next after:!content-none ${isEnd ? 'swiper-button-disabled' : ''}`} 
        onClick={onNextClick}
      >
        <div className={`
      swiper-button-${direction}
      !static !w-auto !h-auto !m-0
      ${direction === 'prev' ? 'left-0 rotate-180' : 'right-0'}
      after:!content-['']
        `}>
          <PixelArrow 
            color="#FF4444" 
            borderColor="#4A4A4A" 
            width={size}
            height={size}
          />
        </div>
      </div>
    </>
  );
};