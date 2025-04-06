/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "placehold.co"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
