module.exports = {
  lang: "cs",
  tags: ["category"],
  layout: "layouts/category.njk",
  permalink: function (data) {
    if (data.slugOverride) {
      // handled by explicit permalink in frontmatter
    }
  },
};
