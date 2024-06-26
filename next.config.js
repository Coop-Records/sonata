/* eslint-disable no-param-reassign */
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'i1.sndcdn.com',
      },
      {
        hostname: 'i.scdn.co',
      },
      {
        hostname: '*.cloudfront.net',
      },
      {
        hostname: 'soundcloud.com',
      },
      {
        hostname: 'imagedelivery.net',
      },
      {
        hostname: 'i.imgur.com',
      },
      {
        hostname: 'ipfs.decentralized-content.com',
      },
      {
        hostname: 'i.seadn.io',
      },
      {
        hostname: 'arweave.net',
      },
      {
        hostname: 'static.highongrowth.xyz',
      },
    ],
  },
};

module.exports = nextConfig;
