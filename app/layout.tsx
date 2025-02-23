/* app/layout.tsx */
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from './components/Header';
import Footer from './components/Footer';
import { GoogleAnalytics } from './components/GoogleAnalytics';

// Tailwind で拡張するならフォントなどをこう読み込む例
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'カナダ生活事典｜カナダ生活の攻略サイト',
  description: '「留学は人生のボーナスステージ」—— せっかくのチャンス、無駄にするな。カナダでの生活・留学・ワーホリを最大限に活かす攻略情報を発信！現地のリアルな生活、英語力向上のヒント、コミュニティ情報、留学哲学をお届けします。',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <GoogleAnalytics />
      </head>
      <body className={inter.className}>
        <div 
          className="fixed inset-0 bg-no-repeat bg-cover"
          style={{ backgroundImage: 'url(/images/bg_pc.png)' }}
        />
        <div className="relative">
          <div className="mx-auto max-w-[430px] overflow-hidden bg-yellow-grid min-h-screen shadow-lg">
            <Header />
            {children}
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
