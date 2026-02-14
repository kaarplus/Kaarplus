/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kaarplus-images.s3.eu-central-1.amazonaws.com",
      },
    ],
  },
  transpilePackages: ["@kaarplus/database"],
};

export default nextConfig;
