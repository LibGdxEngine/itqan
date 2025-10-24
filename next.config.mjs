/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "xn--kgbei0hva.com",
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
        dangerouslyAllowSVG: true,
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },

    compress: true,
    poweredByHeader: false,

    // ✅ `swcMinify` removed — no longer needed (it's always enabled)
    // ✅ Updated experimental options
    experimental: {
        optimizeCss: true,
        optimizePackageImports: ['lucide-react', 'framer-motion'],
    },

    // ✅ New place for server external packages
    serverExternalPackages: [],

    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
                    { key: 'X-Content-Type-Options', value: 'nosniff' },
                    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
                    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
                ],
            },
            {
                source: '/static/(.*)',
                headers: [
                    { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
                ],
            },
            {
                source: '/_next/static/(.*)',
                headers: [
                    { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
                ],
            },
        ];
    },

    async redirects() {
        return [
            {
                source: '/home',
                destination: '/',
                permanent: true,
            },
        ];
    },

    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'https://xn--kgbei0hva.com/api/:path*',
            },
        ];
    },
};

export default nextConfig;

