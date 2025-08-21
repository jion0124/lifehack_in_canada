/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'images.microcms-assets.io',
    }, ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // パフォーマンス最適化
  experimental: {
    optimizeCss: false,
    optimizePackageImports: ['@heroicons/react'],
  },
  // 圧縮設定
  compress: true,
  // 静的ファイルの最適化
  poweredByHeader: false,
};

module.exports = nextConfig;