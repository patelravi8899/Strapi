/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loader: "default",
    domains: ["localhost"],
  },
  // env:{
  //   NEXT_PUBLIC_STRAPI_URL:process.env.NEXT_PUBLIC_STRAPI_URL
  // }
}

module.exports = nextConfig
