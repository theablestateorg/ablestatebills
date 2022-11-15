/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['www.google.com',
    ],
  },
};

module.exports = nextConfig;
