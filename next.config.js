/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    images: { unoptimized: true },
    eslint: {
        ignoreDuringBuilds: true,
    },
    basePath: "/tiktok-live-view",
    assetPrefix: "/tiktok-live-view/",
    env: {
        NEXT_PUBLIC_API_URL: "https://tiktok-live-stream.vercel.app",
        NEXT_PUBLIC_URL: "https://rehandias.github.io/tiktok-live-view",
    },
};

module.exports = nextConfig;
