/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
   images: {
        domains: ['www.google.com','marketplace.canva.com'],
    },
  env: {
        NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    },
}

module.exports = nextConfig
