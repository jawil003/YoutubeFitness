const withPWA = require("next-pwa");

module.exports = withPWA({
  webpack: (config, options) => {
    options.config.experiments = {
      topLevelAwait: true,
    };

    return config;
  },
  pwa: {
    disable:
      process.env.NODE_ENV ===
      "development",
    dest: "public",
  },
});
