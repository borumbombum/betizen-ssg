const metadata = require("../../../_data/metadata.js");
const languages = require("../../../_data/languages.js");
module.exports = function () {
  var LANG = "de";
  return {
    lang: LANG,
    tags: ["binaries"],
    layout: "layouts/single-binary.njk",
    permalink: function (data) {
      if (data.slugOverride) {
        return LANG + "/binaere-optionen/" + this.slugify(data.slugOverride) + "/";
      }
    },
    eleventyComputed: {
      pageTitle: (data) => {
        return data.title + " | Ehrliche Bewertung - " + metadata.title;
      },
      bonus: {
        link: (data) => {
          if (!data.bonus.link && data.page.lang) {
            return languages[data.page.lang].promo.url;
          } else {
            return data.bonus.link;
          }
        },
      },
    },
  };
};
