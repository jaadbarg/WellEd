/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'thesatcrashcourse.com',
    ],
  },
  experimental: {
    appDir: true,
  }
};

export default nextConfig;