import { PixelArrow } from "./PixelArrow";

interface CarouselArrowProps {
  isEnd: boolean;
  size?: number;
}

export const CarouselArrow = ({
  isEnd,
  size = 58,
}: CarouselArrowProps) => {
  return (
    <>
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
