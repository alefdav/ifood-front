/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    domains: ['via.placeholder.com'],
  },
  // Desabilitar a exportação estática para todas as páginas
  // e configurar para páginas que usam useSearchParams()
  experimental: {
    missingSuspenseWithCSRBailout: false
  }
}

module.exports = nextConfig 