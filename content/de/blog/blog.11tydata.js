module.exports = function () {
  var LANG = "de";
  return {
    lang: LANG,
    tags: ["posts"],
    layout: "layouts/single-post.njk",
    permalink: function (data) {
      if (data.slugOverride) {
        return LANG + "/artikel/" + this.slugify(data.slugOverride) + "/";
      }
    },
  };
};
