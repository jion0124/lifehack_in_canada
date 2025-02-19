import Link from "next/link";
import { PixelArrow } from "./PixelArrow";

interface MoreButtonProps {
  href: string;
  text: string;
  mt?: number;
  targetBlank?: boolean; // 新しいプロップを追加
}

export default function MoreButton({ 
  href, 
  text,
  mt = 5,
  targetBlank = false // デフォルトはfalse
}: MoreButtonProps) {
  return (
    <div className={`mt-${mt} text-center`}>
      <Link
        href={href}
        className="
          inline-flex
          items-center
          gap-2
          px-14 
          py-3 
          border 
          border-black 
          rounded-full 
          bg-white 
          shadow-[1px_2px_0px_0px_rgba(0,0,0,1)] 
          hover:translate-x-[1px] 
          hover:translate-y-[1px] 
          hover:shadow-none 
          transition-all"
        {...(targetBlank && { // 条件付きで属性を追加
          target: "_blank",
          rel: "noopener noreferrer"
        })}
      >
        <PixelArrow />
        <span className="whitespace-nowrap">{text}</span>
      </Link>
    </div>
  );
}