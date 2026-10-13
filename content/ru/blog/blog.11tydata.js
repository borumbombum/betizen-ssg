module.exports = function () {
  var LANG = "ru";
  return {
    lang: LANG,
    tags: ["posts"],
    layout: "layouts/single-post.njk",
    permalink: function (data) {
      if (data.slugOverride) {
        return LANG + "/stati/" + this.slugify(data.slugOverride) + "/";
      }
    },
  };
};
