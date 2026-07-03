import path from 'path'
import { fileURLToPath } from 'url'
import { withPayload } from '@payloadcms/next/withPayload'

const dirname = path.dirname(fileURLToPath(import.meta.url))

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
  webpack: (webpackConfig: any, { webpack }: { webpack: any }) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    // payload-puck's runtime CSS endpoint imports Tailwind native binaries (.node)
    // that cannot be bundled for Cloudflare Workers. CSS is pre-built instead.
    webpackConfig.plugins.push(
      new webpack.NormalModuleReplacementPlugin(
        /[\\/]payload-puck[\\/]dist[\\/]endpoints[\\/]styles\.js$/,
        path.resolve(dirname, 'src/stubs/payload-puck-styles.js'),
      ),
    )

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

export default withPayload(nextConfig, { devBundleServerPackages: false })
