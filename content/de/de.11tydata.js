module.exports = function () {
  var LANG = "de";
  return {
    lang: LANG,
    layout: "layouts/base.njk",
    permalink: function (data) {
      if (data.slugOverride) {
        return "/" + LANG + "/" + this.slugify(data.slugOverride) + "/";
      }
    },
  };
};
