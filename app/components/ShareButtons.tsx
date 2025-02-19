import { FaFacebookF } from 'react-icons/fa'; // react-iconsを利用する場合
import { FaXTwitter } from 'react-icons/fa6'; // X (Twitter) アイコン例
import { RiLineFill } from 'react-icons/ri';  // LINEアイコン例

type Props = {
  url: string;    // シェアする記事URL
  title: string;  // 記事タイトル
};

export const ShareButtons: React.FC<Props> = ({ url, title }) => {
  // 各SNS共有リンクを定義
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  const xShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  const lineShareUrl = `https://line.me/R/msg/text/?${encodeURIComponent(title + ' ' + url)}`;

  return (
    <div className="w-full text-center my-16">
      <p className="text-sm mb-4">この記事をシェアする</p>
      <div className="flex justify-center gap-3">
        {/* Facebook */}
        {/* <a
          href={facebookShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center px-10 py-2 gap-2 text-white bg-[#1877F2] rounded-md hover:opacity-90 transition-opacity"
        >
          <FaFacebookF size={24} className="text-white" />
        </a> */}

        {/* X (Twitter) */}
        <a
          href={xShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center px-10 py-2 gap-2 text-white bg-black rounded-md hover:opacity-90 transition-opacity"
        >
          <FaXTwitter size={24} className="text-white" />
        </a>

        {/* LINE */}
        <a
          href={lineShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center px-10 gap-2 text-white bg-[#00B900] rounded-md hover:opacity-90 transition-opacity"
        >
          <RiLineFill size={29} className="text-white" />
        </a>
      </div>

      <div className="dot-divider mt-10" />

    </div>
  );
};
