import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // ビルド時に ESLint のエラーを無視
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
