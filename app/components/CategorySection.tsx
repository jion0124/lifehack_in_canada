import Image from 'next/image';
import SectionTitle from './SectionTitle';
import Link from 'next/link';
import { CATEGORY_MAPPING } from '../api/articles';

export default function CategorySection() {
  const categories = [
    '渡航前',
    '生活基本',
    '観光',
    '外食',
    '買い物',
    '交通',
    '医療',
    '文化歴史',
    'マネー',
    '英語学習',
    '留学哲学',
    'WASABI',
  ];

  return (
    <section className="relative my-8">
      {/* 背景用SVG画像 - 修正部分 */}
      <div className="relative w-full" style={{ aspectRatio: '393/507' }}>
        <Image
          src="/images/category_bg.svg"
          alt="背景"
          fill
          className="object-contain"
        />
      </div>

      {/* コンテンツ本体 */}
      <div className="absolute inset-0 z-10 mx-auto w-full px-4 py-10 mb-4 flex flex-col items-center justify-center">
        {/* セクションタイトル */}
        <SectionTitle enTitle="CATEGORY" jaTitle="カテゴリー" />

        {/* アイコン一覧 */}
        <div className="mx-auto mt-6 text-center">
          <div className="inline-grid category_grid gap-y-6 gap-3">
            {categories.map((cat) => (
              <Link 
                key={cat} 
                href={`/categories/${CATEGORY_MAPPING[cat as keyof typeof CATEGORY_MAPPING]}`}
                className="flex flex-col items-center justify-center pb-1 w-[77px] h-[88px] hover:opacity-80 transition-opacity"
              >
                <Image 
                  src={`/images/category_icon/${CATEGORY_MAPPING[cat as keyof typeof CATEGORY_MAPPING]}.png`} 
                  alt={cat} 
                  width={72}
                  height={85}
                  quality={100}
                  className="object-contain"
                  unoptimized
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}