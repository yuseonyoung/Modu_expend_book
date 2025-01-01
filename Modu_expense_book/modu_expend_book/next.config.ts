import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['ai-public.creatie.ai'], // 외부 이미지 도메인 허용
  },
};

export default nextConfig;
