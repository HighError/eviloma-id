/** @type {import('next').NextConfig} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextTranslate = require('next-translate-plugin');

const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
  images: {
    domains: ['www.gravatar.com'],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });
    return config;
  },
};

module.exports = nextTranslate(nextConfig);
