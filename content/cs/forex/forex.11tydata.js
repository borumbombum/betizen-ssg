const metadata = require("../../../_data/metadata.js");
const languages = require("../../../_data/languages.js");
module.exports = function () {
  var LANG = "cs";
  return {
    lang: LANG,
    tags: ["forex"],
    layout: "layouts/single-forex.njk",
    permalink: function (data) {
      if (data.slugOverride) {
        return LANG + "/forex/" + this.slugify(data.slugOverride) + "/";
      }
    },
    eleventyComputed: {
      pageTitle: (data) => {
        return data.title + " | Poctivá recenze - " + metadata.title;
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
