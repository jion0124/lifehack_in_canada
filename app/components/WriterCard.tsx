// components/WriterCard.tsx
import Image from 'next/image';
import { Writer } from '../api/articles';
import { PixelArrow } from './PixelArrow';
import Link from 'next/link';

function renderStars(count: number) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          className={`w-4 h-4 ${index < count ? 'text-yellow-300' : 'text-gray-200'} stroke-gray-900 stroke-1`}
          fill="currentColor"
          viewBox="0 0 18 18"
          overflow="visible"
        >
          {/* 枠線付きの星形 */}
          <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
          />
        </svg>
      ))}
    </div>
  );
}


export default function WriterCard({ writer }: { writer: Writer }) {
  return (
    <div className="border border-gray-800 px-4 py-8 bg-white">
      {/* Header部分 */}
      <div className="flex items-center justify-center">
        {writer.image.url && (
          <div className="relative w-[62px] h-[80px] mr-3">
            <Image
              src={writer.image.url}
              alt={writer.name}
              fill
              className="object-contain"
            />
          </div>
        )}
        <div className='ml-3'>
        {writer.tag?.map((tag, index) => (
              <div
                key={index}
                className="inline-block bg-gray-100 text-xs px-2 rounded-full mr-2"
              >
                {tag}
              </div>
            ))}
          <h2 className="text-2xl px-2 pt-2 pb-1">{writer.name}</h2>
          <div className='px-2.5'>{`カナダ歴：${writer.history}年目`}</div>
        </div>
      </div>

      
      {/* ratings の表示 */}
      <div className="relative my-6 bg-gray-100 rounded-xxs py-3">
        {/* ▼ 小画面 = 2列 / xxs以上 = 3列。子要素は均等幅をとるため w-full を指定 */}
        <div className="grid grid-cols-2 xxs:grid-cols-3 place-items-center w-full">
          {writer.ratings.map((rating, index) => (
            <div key={index} className="flex flex-col items-center w-full px-2 py-1">
              <span className="text-xxs mb-1.5">{rating.metric}</span>
              <span>{renderStars(rating.value)}</span>
            </div>
          ))}
        </div>

        {/* ▼ 3列用の縦線 (2本) : xxs以上で表示 (33%, 66%) */}
        <div 
          className="
            hidden 
            xxs:block 
            absolute 
            top-1/2 
            -translate-y-1/2 
            h-[60%] 
            w-0 
            border-r 
            border-dashed 
            border-gray-300 
            left-1/3
          "
        />
        <div 
          className="
            hidden 
            xxs:block 
            absolute 
            top-1/2 
            -translate-y-1/2 
            h-[60%] 
            w-0 
            border-r 
            border-dashed 
            border-gray-300 
            left-2/3
          "
        />
      </div>

      {/* 自己紹介文 */}
      <div className="text-sm mb-4">{writer.intro}</div>

      {/* ライターの他の記事へリンク （例）*/}
      <div className="mt-5 text-center">
      <Link
        href={`/character/writer/${writer.id}`}
        className="
          inline-flex
          items-center
          gap-2
          px-10
          py-1 
          border 
          border-black 
          rounded-full 
          text-sm
          text-gray-800 
          bg-white 
          shadow-[1px_2px_0px_0px_rgba(0,0,0,1)] 
          hover:translate-x-[1px] 
          hover:translate-y-[1px] 
          hover:shadow-none 
          transition-all"
      >
        <PixelArrow />
        このライターの記事をみる
      </Link>
    </div>
    </div>
  );
}
