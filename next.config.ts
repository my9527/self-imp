import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  typescript:{
    ignoreBuildErrors: true
  },
  cacheComponents: true
};

export default nextConfig;
