const withPWA = require("next-pwa");

module.exports = withPWA({
  webpack: (config) => {
    return config;
  },
  pwa: {
    disable:
      process.env.NODE_ENV ===
      "development",
    dest: "public",
  },
});
