const metadata = require("../../../_data/metadata.js");
module.exports = {
  lang: "de",
  tags: ["provider"],
  layout: "layouts/single-provider.njk",
  permalink: function (data) {
    if (data.slugOverride) {
      return "/de/anbieter/" + this.slugify(data.slugOverride) + "/";
    }
  },
  eleventyComputed: {
    pageTitle: (data) => {
      return "Kostenlose Spielautomaten von " + data.title + " - " + metadata.title;
    },
  },
};
