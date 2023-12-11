/** @type {import('next').NextConfig} */

module.exports = {
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };

    return config;
  },
  images: {
    domains: ['localhost', 'res.cloudinary.com'],
  },
};