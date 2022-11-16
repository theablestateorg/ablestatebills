/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['www.google.com', 't2.gstatic.com'
    ],
  },
};

module.exports = nextConfig;
