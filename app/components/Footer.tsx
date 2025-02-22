// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="w-full">
      {/* 背景全体：黄色チェック */}
      <div
        className="
          bg-gray-50
          bg-opacity-50
          pt-4 
          pb-10 
          px-4
          text-center
        "
      >
        {/* スポンサーのロゴ群 */}
        {/* <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white text-black py-4 shadow-sm"
            >
              スポンサーの<br />ロゴ
            </div>
          ))}
        </div> */}

        {/* Instagram案内 */}
        <div className="mt-10">
          <p className="text-base mb-4">＼ 各SNSもフォローしてね ／</p>

          {/* インスタアイコン（仮） */}
          <div className="flex flex-col items-center">
            <a href="https://www.instagram.com/ca_seikatsu/" target="_blank" rel="noopener noreferrer">
              <img
                src="/images/ig_icon.png"
                alt="Instagram"
                className="w-[72px] mb-2"
              />
            </a>
          </div>
        </div>
      </div>

      {/* コピーライト表記 */}
      <div className="text-center text-white text-[12px] py-2 bg-[url('/images/copyright.png')]">
      ©カナダ生活事典  / ca_seikatsu 2025
      </div>
    </footer>
  );
}
