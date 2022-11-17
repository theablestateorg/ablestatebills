/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  concurrentFeatures: true,
  images: {
    domains: ['www.google.com', 't2.gstatic.com'
    ],
  },
};

module.exports = nextConfig;
