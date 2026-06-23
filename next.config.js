/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Static export untuk Cloudflare Pages
  images: {
    unoptimized: true,
  },
  experimental: {
    // optimizeCss: false, // nonaktifkan karena static export
  },
  transpilePackages: ['three'],
  // Hilangkan webpack externals karena tidak diperlukan di static
};

module.exports = nextConfig;
