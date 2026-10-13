const metadata = require("../../../_data/metadata.js");
const languages = require("../../../_data/languages.js");
module.exports = function () {
  var LANG = "ru";
  return {
    lang: LANG,
    tags: ["casinos"],
    layout: "layouts/single-casino.njk",
    permalink: function (data) {
      if (data.slugOverride) {
        return LANG + "/kazino/" + this.slugify(data.slugOverride) + "/";
      }
    },
    eleventyComputed: {
      pageTitle: (data) => {
        return data.title + " | Честный обзор - " + metadata.title;
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
