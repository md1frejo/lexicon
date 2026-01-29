import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.adriabandiere.com",
      },
    ],
  },
};

export default nextConfig;
