const markdownIt = require("markdown-it");
const md = markdownIt({ html: false, breaks: true, linkify: true });

module.exports = function (eleventyConfig) {
  // Render a markdown string (used for editable policy/about text)
  eleventyConfig.addFilter("markdown", (content) => {
    if (!content) return "";
    return md.render(String(content));
  });
  eleventyConfig.addFilter("markdownInline", (content) => {
    if (!content) return "";
    return md.renderInline(String(content));
  });

  // Copy static assets straight through to the built site
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/admin": "admin" });
  eleventyConfig.addPassthroughCopy({ "src/_redirects": "_redirects" });
  eleventyConfig.addPassthroughCopy({ "src/robots.txt": "robots.txt" });

  // Watch CSS/JS so the dev server reloads on change
  eleventyConfig.addWatchTarget("src/assets/");

  // Simple currency formatter used in templates: {{ 149 | usd }} -> $149
  eleventyConfig.addFilter("usd", function (value) {
    const n = Number(value);
    if (isNaN(n)) return value;
    return "$" + n.toLocaleString("en-US", { maximumFractionDigits: 2 });
  });

  // Current year for the footer
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"]
  };
};
