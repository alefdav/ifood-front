/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    domains: ['via.placeholder.com'],
  },
  // Desabilitar a exportação estática para todas as páginas
  exportPathMap: null,
}

module.exports = nextConfig 