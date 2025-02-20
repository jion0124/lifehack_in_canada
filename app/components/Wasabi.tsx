import MoreButton from './MoreButton';
import Image from 'next/image';
import SectionTitle from './SectionTitle';

export default function Wasabi() {
  return (
    <section className="bg-[#039877] -mx-3 py-12">
      {/* メインコンテンツ */}
      <div className="text-white">
        <SectionTitle enTitle="COMMUNITY" jaTitle="コミュニティ" subTitle="「WASABI」" color='text-yellow-300'/>

        {/* 説明文 */}
        <p className="text-base text-center mt-7 px-9">
         カナダ生活事典は<br />
        人生のボーナスステージとしての留学を一層刺激的にするためにコミュニティ「WASABI」を運営しています。
        <br />
        <br />
        言語交換イベント、バスケ、BBQ、合同誕生会などを中心に活動しています。
        <br />
        <br />
        一匹狼で海外に来た皆さまが、おひとりでも参加しやすいコミュニティー作りを心がけています。
        </p>

        {/* イメージ一覧（横並び） */}
        <div className="
          flex 
          gap-4 
          mt-6 
          overflow-x-auto 
          pb-4
          [-ms-overflow-style:none]
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
        ">
           <div className="relative min-w-[200px] h-[120px] flex-shrink-0">
            <Image
              src="/images/Wasabi1.png"
              alt="WASABI Image 1"
              fill
              className="object-cover border-2 border-gray-800 rounded-sm"
            />
          </div>
          <div className="relative min-w-[200px] h-[120px] flex-shrink-0">
            <Image
              src="/images/Wasabi2.png"
              alt="WASABI Image 2"
              fill
              className="object-cover border-2 border-gray-800 rounded-sm"
            />
          </div>
          <div className="relative min-w-[200px] h-[120px] flex-shrink-0">
            <Image
              src="/images/Wasabi3.png"
              alt="WASABI Image 3"
              fill
              className="object-cover border-2 border-gray-800 rounded-sm"
            />
          </div>
          <div className="relative min-w-[200px] h-[120px] flex-shrink-0">
            <Image
              src="/images/Wasabi4.png"
              alt="WASABI Image 4"
              fill
              className="object-cover border-2 border-gray-800 rounded-sm"
            />
          </div>
        </div>
      </div>
      {/* <MoreButton href="/wasabi" text="WASABIのサイトへ" /> */}
    </section>
  );
}
