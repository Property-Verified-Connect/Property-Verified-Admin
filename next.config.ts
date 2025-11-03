import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // ❌ Warning: This disables ESLint completely during builds
    ignoreDuringBuilds: true,
  },
    typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
