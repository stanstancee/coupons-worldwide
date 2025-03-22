import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "100mb",
      allowedOrigins: ['app.couponsworldwide.com', '*.couponsworldwide.com']
    },
  },
  // Helps with routing in Passenger
  poweredByHeader: false,
  // Ensure this is false for Server Actions
  output: 'standalone',

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

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flagcdn.com",
        port: "",
        search: "",
      },
      {
        protocol: "https",
        hostname: "sandbox.couponsworldwide.com",
        port: "",
        search: "",
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',

      }
    ],
  },
};

export default nextConfig;



