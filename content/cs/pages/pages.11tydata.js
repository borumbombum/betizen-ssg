module.exports = function () {
  var LANG = "cs";
  return {
    lang: LANG,
    tags: ["page"],
    layout: "layouts/page.njk",
    permalink: function (data) {
      if (data.slugOverride) {
        return LANG + "/" + this.slugify(data.slugOverride) + "/";
      }
    },
  };
};
