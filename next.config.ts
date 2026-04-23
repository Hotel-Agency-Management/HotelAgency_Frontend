import type { NextConfig } from 'next'
import { baseURL } from './core/configs/clientConfig'

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'source.unsplash.com' }
    ]
  },
  async rewrites() {
    const apiUrl = process.env.BACKEND_URL

    if (!apiUrl) return []

    return [
      {
        source: `${baseURL}/:api_path*`,
        destination: `${apiUrl}${baseURL}/:api_path*`
      }
    ]
  }
}

export default nextConfig
