import Image from 'next/image';

interface WolfQuoteProps {
  text: string;
}

export default function WolfQuote({ 
  text, 
}: WolfQuoteProps) {
  return (
    <section className="relative w-[96%] max-w-md mx-auto my-5 border border-gray-800 shadow-[1px_2px_0px_0px_rgba(0,0,0,1)] bg-white bg-opacity-90 px-2 py-4">
      {/* 見出し部分 */}
      <div className="flex items-center mb-1 pl-2">
        <div className="mr-2 w-[19px] h-[26px] relative">
          <Image
            src="/images/wolf_icon.png" 
            alt="オオカミアイコン"
            fill
            style={{ objectFit: 'contain' }}
            unoptimized
          />
        </div>
        <h2 className="text-xl font-nicomoji">今日のオオカミ語録</h2>
      </div>

      <div className="dot-divider mb-3" />

      {/* テキスト部分 */}
      <p className="text-sm leading-relaxed px-2">
        {text}
      </p>

    </section>
  );
}
