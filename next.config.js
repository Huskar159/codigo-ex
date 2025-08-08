/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Desativa completamente o indicador de desenvolvimento
  devIndicators: {
    buildActivity: false,
    buildActivityPosition: 'bottom-right',
  },
  // Desativa o overlay de erros
  experimental: {
    reactRemoveProperties: true,
    removeConsole: process.env.NODE_ENV === 'production',
    // Desativa o hot reload para evitar o ícone
    reactStrictMode: false,
  },
  // Desativa o webpack dev overlay
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.watchOptions = {
        ...config.watchOptions,
        ignored: ['**/node_modules', '**/.next/**'],
      };
    }
    return config;
  },
  // Desativa o Fast Refresh
  reactStrictMode: false,
  // Desativa o overlay de erros
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
};

// Remove o indicador de build do Next.js
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    // Desativa o indicador de build durante o desenvolvimento
    process.env.NEXT_PUBLIC_DEV_INDICATOR = 'false';
  }
  return nextConfig;
};
