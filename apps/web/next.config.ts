import type { NextConfig } from 'next'

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'DENY' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
]

const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: false,

  // Media is served from the Laravel `api` service's /storage path, which is
  // backed by a Railway Volume. Allow-list that host for next/image.
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: process.env.MEDIA_HOST
      ? [
          {
            protocol: 'https',
            hostname: process.env.MEDIA_HOST,
            pathname: '/storage/**',
          },
        ]
      : [],
  },

  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },

  // Legacy .html URLs from the GitHub Pages site. Query strings are preserved
  // automatically, which keeps /contact.html?service=security working.
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/services.html', destination: '/services', permanent: true },
      { source: '/about.html', destination: '/about', permanent: true },
      { source: '/portfolio.html', destination: '/portfolio', permanent: true },
      { source: '/contact.html', destination: '/contact', permanent: true },
    ]
  },
}

export default nextConfig
