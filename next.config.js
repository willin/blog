/** @type {import('next').NextConfig} */
const { get } = require('@vercel/edge-config');
const { withContentlayer } = require('next-contentlayer');

const securityHeaders = [
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains'
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()'
  }
];

const nextConfig = {
  reactStrictMode: true,
  redirects() {
    try {
      return get('redirects');
    } catch {
      return [];
    }
  }
  // headers() {
  //   return [
  //     {
  //       source: '/(.*)',
  //       headers: securityHeaders
  //     }
  //   ];
  // }
};

module.exports = withContentlayer(nextConfig);
