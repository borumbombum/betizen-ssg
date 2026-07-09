const metadata = require("../../../_data/metadata.js");
module.exports = {
  tags: ["games"],
  lang: "de",
  layout: "layouts/game.njk",
  permalink: function (data) {
    if (data.slugOverride) {
      return "/de/spiel/" + this.slugify(data.slugOverride) + "/";
    }
  },
  eleventyComputed: {
    pageTitle: (data) => {
      if (data.tags.includes("bingo")) {
        return data.title + " Bewertung - RTP & Freispiele";
      } else if (data.tags.includes("slot")) {
        return data.title + " Spielautomat Bewertung - RTP & Freispiele";
      }
      return data.title + " - Kostenlos spielen - " + metadata.title;
    },
  },
};
