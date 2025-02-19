import { PixelArrow } from "./PixelArrow";

interface CarouselArrowProps {
  isBeginning: boolean;
  isEnd: boolean;
  size?: number;
}

export const CarouselArrow = ({
  isBeginning,
  isEnd,
  size = 58,
}: CarouselArrowProps) => {
  return (
    <>
      <div
        className={`swiper-button-prev after:!content-none ${
          isBeginning ? "swiper-button-disabled" : ""
        }`}
        style={{ left: 20 }}  // 左矢印の位置
    >
        <div
          className={`
          !static
          left-0 rotate-180
          after:!content-['']
        `}
        >
          <PixelArrow
            color="#FF4444"
            borderColor="#4A4A4A"
            width={size}
            height={size}
          />
        </div>
      </div>
      <div
        className={`swiper-button-next after:!content-none ${
          isEnd ? "swiper-button-disabled" : ""
        }`}
        style={{ right: 20 }}
      >
        <div
          className={`
            !static
            right-90
            after:!content-['']
              `}
              >
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
