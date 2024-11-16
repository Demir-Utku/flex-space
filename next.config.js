import CopyPlugin from 'copy-webpack-plugin'

// eslint-disable-next-line import/extensions
await import('./src/env.js')

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: ['@node-rs/argon2']
  },
  images: {
    remotePatterns: [
      {
        hostname: 'images.unsplash.com'
      },
      {
        hostname: 'www.spacesworks.com',
        pathname: '/wp-content/themes/spaces/img/**'
      },
      {
        hostname: 'cdn-images.wework.com',
        pathname: '/images/**'
      },
      {
        hostname: 'ctfassets.imgix.net'
      },
      {
        hostname: 'www.coworkingcafe.com'
      }
    ]
  },
  webpack: (config, { webpack }) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: 'node_modules/leaflet/dist/images',
            to: '../public/leaflet/images'
          }
        ]
      })
    )

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    config.plugins.push(new webpack.IgnorePlugin({
      resourceRegExp: /^pg-native$|^cloudflare:sockets$/
    }))

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return config
  }
}

export default config
