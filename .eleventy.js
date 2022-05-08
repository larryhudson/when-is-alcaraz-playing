const { EleventyServerlessBundlerPlugin } = require("@11ty/eleventy");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyServerlessBundlerPlugin, {
    name: "serverless", // The serverless function name from your permalink object
    functionsDir: "./netlify/functions/",
    redirects: "netlify-toml-builders",
  });

  eleventyConfig.addFilter("toUTCString", (value) => {
    return value.replace(" ", "T") + "Z";
  });

  eleventyConfig.addFilter("toUTCFormattedString", (value) => {
    return new Date(value).toUTCString();
  });

  return {
    dir: {
      input: "./src",
      output: "./_site",
    },
  };
};
