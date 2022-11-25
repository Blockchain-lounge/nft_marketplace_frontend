/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: [
    //   "localhost",
    //   "cloudax.infura-ipfs.io",
    //   "cloudax-nft-marketplace.io",
    //   "market-api-staging.cloudax.finance",
    //   "cloudax-api.herokuapp.com",
    //   "cloudaxnftmarketplace.s3.amazonaws.com",
    //   "cloudaxnftmarketplace.s3.us-east-2.amazonaws.com",
    //   "*"
    // ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  reactStrictMode: true,
  swcMinify: true,
  env: {
    APP_DOMAIN: "cloudax-nft-marketplace.io",
    MORALIS_API_KEY:
      "IweUz1dlN1EOO2rKS5YMpdqKaixPWIVR46zgD2zvXO4HxTvtb5GyzXsjQ3PcRtQy",
    NEXTAUTH_URL: "http://localhost:3000/",
    NEXTAUTH_SECRET: "681ec8080db3cc7452d15129dd7a69af",
  },
};
module.exports = nextConfig;
