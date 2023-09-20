/** @type {import('next').NextConfig} */

const os = require("os");
const userHomeDirectory = os.homedir();

const nextConfig = {
  experimental: {
    serverActions: true,
  },
  publicRuntimeConfig: {
    userHomeDir: userHomeDirectory,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig
