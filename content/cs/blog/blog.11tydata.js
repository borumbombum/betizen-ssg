module.exports = function () {
  var LANG = "cs";
  return {
    lang: LANG,
    tags: ["posts"],
    layout: "layouts/single-post.njk",
    permalink: function (data) {
      if (data.slugOverride) {
        return LANG + "/clanky/" + this.slugify(data.slugOverride) + "/";
      }
    },
  };
};
