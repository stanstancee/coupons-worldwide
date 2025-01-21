import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard",
        permanent: false, // Set to true if this redirect is permanent
      },
    ];
  },
};

export default nextConfig;
