import Link from 'next/link';
import HamburgerMenu from './HamburgerMenu';

export default function Header() {
  return (
    <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white/80 backdrop-blur-sm shadow z-50">
      <div className="px-4 py-3 relative flex items-center justify-center font-nicomoji">
        <Link href="/" className="text-xl hover:opacity-80">
          カナダ生活事典
        </Link>
        <div className="absolute right-4">
          <HamburgerMenu />
        </div>
      </div>
    </header>
  );
}
