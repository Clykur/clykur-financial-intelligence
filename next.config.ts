import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // We don't have an external image server, so unoptimized local/imported images works great.
  },
};

export default nextConfig;
