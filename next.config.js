/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['antd-mobile'],
  // reactStrictMode: true,

  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://www.nfcmdx.top/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
