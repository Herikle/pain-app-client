/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const nextConfig = withBundleAnalyzer({
  compiler: {
    styledComponents: true,
  },
  swcMinify: true,
  modularizeImports: {
    "@phosphor-icons/react": {
      transform: "@phosphor-icons/react/dist/icons/{{member}}",
    },
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgo: false,
          },
        },
      ],
    });

    return config;
  },
});

module.exports = nextConfig;
