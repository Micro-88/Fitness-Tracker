import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

const middleware = async () => {
  return [
    {
      source: '/dashboard',
      destination: '/middleware/authMiddleware',
    },
  ];
};

export { middleware };
export default nextConfig;
