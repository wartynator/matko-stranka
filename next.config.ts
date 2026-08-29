import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: { root: __dirname },
  // Allow custom local/tunnel hostnames to access dev-only endpoints (HMR, assets).
  allowedDevOrigins: ["local.att.com", "*.att.com"],
  images: {
    remotePatterns: [{ protocol: "https", hostname: "picsum.photos" }],
  },
};

export default nextConfig;
