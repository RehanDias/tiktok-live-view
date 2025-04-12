/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    images: { unoptimized: true },
    eslint: {
        ignoreDuringBuilds: true,
    },
    basePath: process.env.NODE_ENV === "production" ? "/tiktok-live-view" : "",
    env: {
        NEXT_PUBLIC_API_URL: "https://tiktok-live-stream.vercel.app",
    },
};

module.exports = nextConfig;
