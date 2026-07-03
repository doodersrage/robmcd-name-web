import { withPayload } from '@payloadcms/next/withPayload'
import { withPuckCSS } from '@delmaredigital/payload-puck/next'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    localPatterns: [
      {
        pathname: '/api/media/file/**',
      },
    ],
  },
  // Packages with Cloudflare Workers (workerd) specific code
  // Read more: https://opennext.js.org/cloudflare/howtos/workerd
  serverExternalPackages: ['jose', 'pg-cloudflare'],

  // Your Next.js config here
  webpack: (webpackConfig: any) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true, // Returns 308 instead of 307
      },
    ]
  },
}

export default withPuckCSS({
  cssInput: 'src/app/(frontend)/globals.scss',
})(withPayload(nextConfig, { devBundleServerPackages: false }))
