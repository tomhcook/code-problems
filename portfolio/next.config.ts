import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Set basePath to match repository name for GitHub Pages
  basePath: isProd ? "/code-problems" : "",
  assetPrefix: isProd ? "/code-problems" : "",
};

export default nextConfig;
