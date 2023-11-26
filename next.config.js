/** @type {import('next').NextConfig} */

// const { i18n } = require("./next-i18next.config.js");
// const nextTranslate = require("next-translate-plugin");
const nextConfig = {
  // i18n,
  // plugins: [nextTranslate],
  images: {
    domains: ["reqres.in"],
  },
};

module.exports = nextConfig;
