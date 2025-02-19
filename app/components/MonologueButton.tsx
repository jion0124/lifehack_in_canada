import Link from "next/link";
import { PixelArrow } from "./PixelArrow";

interface MonologueButtonProps {
  href: string;
  text: string;
}

export default function MonologueButton({ href, text }: MonologueButtonProps) {
  return (
    <div className="mt-5 text-center">
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
          text-gray-800 
          bg-white 
          shadow-[1px_2px_0px_0px_rgba(0,0,0,1)] 
          hover:translate-x-[1px] 
          hover:translate-y-[1px] 
          hover:shadow-none 
          transition-all"
      >
        <PixelArrow />
        {text}
      </Link>
    </div>
  );
}