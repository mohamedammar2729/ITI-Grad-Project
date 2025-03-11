/** @type {import('next').NextConfig} */



const nextConfig = {
  output: 'export',
  distDir: 'dist',
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
};

export default nextConfig;
