/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            issuer: /\.jsx$/,
            use: ['@svgr/webpack'],
        });

        return config;
    },
};

module.exports = nextConfig;
