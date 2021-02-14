const withPWA = require("next-pwa");

module.exports = withPWA({
  webpack: (config, options) => {
    return config;
  },
  pwa: {
    skipWaiting: false,
    disable:
      process.env.NODE_ENV ===
      "development",
    dest: "public",
  },
});
