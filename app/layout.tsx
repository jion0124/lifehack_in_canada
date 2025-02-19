/* app/layout.tsx */
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from './components/Header';
import Footer from './components/Footer';

// Tailwind で拡張するならフォントなどをこう読み込む例
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'カナダ生活事典',
  description: 'カナダでの生活情報をまとめた攻略サイト',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-100">
          <div className="mx-auto max-w-[430px]  overflow-hidden bg-yellow-grid min-h-screen shadow-lg ">
            <Header />
            {children}
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
