const metadata = require("../../../_data/metadata.js");
module.exports = function () {
  var LANG = "ru";
  return {
    lang: LANG,
    tags: ["provider"],
    layout: "layouts/single-provider.njk",
    permalink: function (data) {
      if (data.slugOverride) {
        return "/" + LANG + "/provayder/" + this.slugify(data.slugOverride) + "/";
      }
    },
    eleventyComputed: {
      pageTitle: (data) => {
        return "Бесплатные слоты от " + data.title + " - " + metadata.title;
      },
    },
  };
};
