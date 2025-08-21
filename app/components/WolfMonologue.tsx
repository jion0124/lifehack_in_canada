'use client';

import React, { useEffect, useRef, useState } from 'react';
import SectionTitle from './SectionTitle';
import { PixelArrow } from './PixelArrow';

interface WolfMonologueProps {
  text: string;
}

export default function WolfMonologue({ text }: WolfMonologueProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const div = textRef.current;
    if (!div) return;

    div.classList.remove('clamp-8');

    const style = window.getComputedStyle(div);
    let lineHeight = parseFloat(style.lineHeight);
    if (isNaN(lineHeight)) {
      lineHeight = 16;
    }
    const actualHeight = div.scrollHeight;
    const lines = actualHeight / lineHeight;

    if (lines > 8) {
      setShowButton(true);
      if (!isExpanded) {
        div.classList.add('clamp-8');
      }
    } else {
      setShowButton(false);
    }
  }, [text, isExpanded]);

  const handleToggleExpand = () => {
    setIsExpanded((prev) => !prev);
    if (textRef.current) {
      if (!isExpanded) {
        textRef.current.classList.remove('clamp-8');
      } else {
        textRef.current.classList.add('clamp-8');
      }
    }
  };

  return (
    <div className="border border-black my-20 p-4 pb-8 bg-[#F5F5F5] relative mx-auto shadow-[1px_2px_0px_0px_rgba(0,0,0,1)]">
      <SectionTitle enTitle="MONOLOGUE" jaTitle="オオカミの独り言" />

      <div
        ref={textRef}
        className="text-gray-800 text-sm mt-2 leading-relaxed article-content"
        dangerouslySetInnerHTML={{ __html: text }}
      />

      {showButton && (
        <div className="mt-5 text-center">
          <button
            onClick={handleToggleExpand}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              px-12
              py-1
              border
              border-black
              rounded-full
              text-gray-800
              bg-white
              shadow-[1px_2px_0px_0px_rgba(0,0,0,1)]
              hover:translate-x-[1px]
              hover:translate-y-[1px]
              hover:shadow-none
              transition-all
            "
          >
            <span className="flex items-center">
              <PixelArrow direction={isExpanded ? 'up' : 'down'} />
            </span>
            <span className="flex items-center">
              {isExpanded ? '閉じる' : 'つづきを見る'}
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
