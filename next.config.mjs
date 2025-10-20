/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
                port: "8000",
                pathname: "/media/**",
            },
            {
                protocol: "https",
                hostname: "إتقان.com",
                pathname: "/media/**",
            },
        ],
        formats: ['image/webp', 'image/avif'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        minimumCacheTTL: 31536000, // 1 year
    },
    // Enable compression
    compress: true,
    // Optimize for production
    poweredByHeader: false,
    // Performance optimizations
    swcMinify: true,
    // Enable experimental features for better performance
    experimental: {
        optimizeCss: true,
        optimizePackageImports: ['lucide-react', 'framer-motion'],
        serverComponentsExternalPackages: [],
    },
    // Headers for better SEO and security
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin',
                    },
                    {
                        key: 'Permissions-Policy',
                        value: 'camera=(), microphone=(), geolocation=()',
                    },
                ],
            },
            {
                source: '/static/(.*)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
            {
                source: '/_next/static/(.*)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
        ];
    },
    // Redirects for SEO
    async redirects() {
        return [
            {
                source: '/home',
                destination: '/',
                permanent: true,
            },
        ];
    },
    // Rewrites for API proxy
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://django-api:8000/api/:path*',
            },
        ];
    },
};

export default nextConfig;
