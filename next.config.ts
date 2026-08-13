import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
  },
  output: "export",
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
