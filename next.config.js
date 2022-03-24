const withPWA = require('next-pwa')

/** @type {import('next').NextConfig} */
module.exports = withPWA({
  i18n: {
    locales: ['en'],
    defaultLocale: 'en'
  },
  pwa: {
    dest: 'public',
    fallbacks: {
      document: '/index'
    },
    cacheOnFrontEndNav: true,
    disable: process.env.NODE_ENV === 'development'
  },
  reactStrictMode: true,
  experimental: {
    outputStandalone: true
  }
})
