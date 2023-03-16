/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,

  // async rewrites() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "http://localhost:5000/",
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
