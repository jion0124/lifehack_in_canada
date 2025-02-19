'use client';

import React, { useEffect, useRef, useState } from 'react';
import SectionTitle from './SectionTitle';
import { PixelArrow } from './PixelArrow';

interface WolfMonologueProps {
  text: string;
}

export default function WolfMonologue({ text }: WolfMonologueProps) {
  const [isExpanded, setIsExpanded] = useState(false); // 展開中かどうか
  const [showButton, setShowButton] = useState(false); // ボタンを表示するか
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const p = textRef.current;
    if (!p) return;

    // (1) 計測のためいったん .clamp-8 を外す
    p.classList.remove('clamp-8');

    // (2) 行数を計測: scrollHeight / lineHeight
    const style = window.getComputedStyle(p);
    let lineHeight = parseFloat(style.lineHeight); 
    if (isNaN(lineHeight)) {
      // line-height が normal 等の場合の簡易対処
      lineHeight = 16; 
    }
    const actualHeight = p.scrollHeight;
    const lines = actualHeight / lineHeight;

    // (3) 8行超えかどうか
    if (lines > 8) {
      setShowButton(true);
      // 折りたたみ中（isExpanded=false）の場合は .clamp-8 を付ける
      if (!isExpanded) {
        p.classList.add('clamp-8');
      }
    } else {
      // 8行以下なら折りたたみ不要、ボタン非表示
      setShowButton(false);
    }
  }, [text, isExpanded]);



  // ボタンクリック
  const handleToggleExpand = () => {
    setIsExpanded((prev) => !prev);
    // 展開/折りたたみの切り替え
    if (textRef.current) {
      if (!isExpanded) {
        // 折りたたみ中 → 全文表示へ
        textRef.current.classList.remove('clamp-8');
      } else {
        // 全文表示中 → 折りたたみに戻す
        textRef.current.classList.add('clamp-8');
      }
    }
  };

  return (
    <div className="border border-black my-20 p-4 pb-8 bg-[#F5F5F5] relative mx-auto shadow-[1px_2px_0px_0px_rgba(0,0,0,1)]">
      <SectionTitle enTitle="MONOLOGUE" jaTitle="オオカミの独り言" />

      <p
        ref={textRef}
        className="text-gray-800 text-sm mt-2 leading-relaxed"
      >
        {text}
      </p>

      {/* 8行超時のみボタンを表示 */}
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
