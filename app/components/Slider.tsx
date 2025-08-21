// components/Slider.tsx
import React from 'react';

type SliderProps = {
  images: string[];
};

export default function Slider({ images }: SliderProps) {
  return (
    <div className="overflow-x-auto whitespace-nowrap border p-2">
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`slider-img-${index}`}
          className="inline-block h-48 mr-2"
        />
      ))}
    </div>
  );
}
