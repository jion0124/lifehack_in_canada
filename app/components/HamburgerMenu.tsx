'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Bars3Icon as MenuIcon,
  XMarkIcon as XIcon,
} from '@heroicons/react/24/outline';
import { CATEGORY_MAPPING, JapaneseCategory, getActiveCategories } from '../api/articles';
import { convertCategory } from '../api/articles';

// メニュー項目を「日本語」「英語」併記に変更
const MENU_ITEMS = [
  { href: '/', label: 'トップ', enLabel: 'TOP' },
  // カテゴリーは通常の Link ではなく、展開用の項目として扱う
  { href: '/category', label: 'カテゴリー', enLabel: 'CATEGORY' },
  { href: '/character', label: 'キャラクター', enLabel: 'CHARACTER' },
];

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  // カテゴリー展開用の状態
  const [isCategoryExpanded, setIsCategoryExpanded] = useState(false);
  // アクティブなカテゴリーを管理
  const [activeCategories, setActiveCategories] = useState<Record<JapaneseCategory, string>>({});

  // アクティブなカテゴリーを取得
  useEffect(() => {
    const fetchActiveCategories = async () => {
      try {
        const categories = await getActiveCategories();
        setActiveCategories(categories);
      } catch (error) {
        console.error('アクティブカテゴリー取得エラー:', error);
        // エラーの場合は空のオブジェクトを設定
        setActiveCategories({});
      }
    };

    fetchActiveCategories();
  }, []);

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)} className="p-2">
        <MenuIcon className="h-6 w-6" />
      </button>

      {/* オーバーレイ背景 */}
      <div 
        className={`
          fixed inset-0 h-screen bg-black/50 z-[10]
          transition-all duration-500 ease-in-out
          ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
        `}
        onClick={() => setIsOpen(false)}
      />

      {/* ドロワーメニュー本体 */}
      <nav 
        className={`
          fixed top-0 right-0 w-[80%] h-[90vh] 
          bg-white shadow-lg z-[20]
          transition-all duration-500 ease-in-out
          ${isOpen 
            ? 'opacity-100 visible' 
            : 'opacity-0 invisible'
          }
        `}
      >
        {/* 閉じるボタン */}
        <button
          className="absolute top-4 right-4 p-2"
          onClick={() => setIsOpen(false)}
        >
          <XIcon className="h-6 w-6" />
        </button>
        {/* メニューリスト */}
        <ul className="pt-16 flex flex-col">
          {MENU_ITEMS.map((item) => {
            // カテゴリー項目は展開用に処理を分ける
            if (item.href === '/category') {
              return (
                <li key={item.href} className="border-b border-gray-100">
                  <div 
                    className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-gray-50 cursor-pointer"
                    onClick={() => setIsCategoryExpanded(!isCategoryExpanded)}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-medium">{item.label}</span>
                      <span className="text-xs font-bestten text-red-500">{item.enLabel}</span>
                    </div>
                    <span className="text-xl font-light font-sans text-gray-300">
                      {isCategoryExpanded ? '－' : '＋'}
                    </span>
                  </div>
                  {/* 常にレンダリングし、状態に応じて maxHeight とパディングを変える */}
                  <div
                    className={`grid grid-cols-2 gap-y-6 transition-all duration-300 ease-in-out overflow-hidden ${isCategoryExpanded ? 'py-8 pl-12' : 'py-0 pl-12'}`}
                    style={{ maxHeight: isCategoryExpanded ? '1000px' : '0px' }}
                  >
                    {Object.keys(activeCategories).length > 0 ? (
                      Object.keys(activeCategories).map((cat) => (
                        <Link 
                          key={cat} 
                          href={`/categories/${convertCategory.toEn(cat as JapaneseCategory)}`}
                          onClick={() => {
                            setIsCategoryExpanded(false);
                            setIsOpen(false);
                          }}
                          className="block hover:underline"
                        >
                          {cat}
                        </Link>
                      ))
                    ) : (
                      <div className="col-span-2 text-gray-500 text-sm">
                        記事がありません
                      </div>
                    )}
                  </div>
                </li>
              );
            } else {
              return (
                <li key={item.href} className="border-b border-gray-100">
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 px-6 py-4 hover:bg-gray-50"
                  >
                    <span className="text-xl font-medium">{item.label}</span>
                    <span className="text-xs font-bestten pt-0.5 text-red-500">{item.enLabel}</span>
                  </Link>
                </li>
              );
            }
          })}
        </ul>
      </nav>
    </div>
  );
}
