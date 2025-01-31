import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    // incremental value allows to adopt PPR for specific routes
    ppr: 'incremental'
  }
};

export default nextConfig;
