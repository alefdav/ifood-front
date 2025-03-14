/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    domains: ['via.placeholder.com', 'static-images.ifood.com.br', 'storage.googleapis.com'],
  },
  // Desabilitar a exportação estática para todas as páginas
  // e configurar para páginas que usam useSearchParams()
  experimental: {
    missingSuspenseWithCSRBailout: false
  },
  env: {
    SCRAPER_API_URL: process.env.SCRAPER_API_URL || 'http://localhost:8000',
  }
}

module.exports = nextConfig 