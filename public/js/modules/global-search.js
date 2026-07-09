window.BZ = window.BZ || {};
window.BZ.globalSearch = {
  data: [],
  debounceTimer: null,
  debounceDelay: 300,
  selectedIndex: -1,

  init() {
    const input = document.getElementById("global-search-input");
    const results = document.getElementById("global-search-results");
    if (!input || !results) return;

    fetch("/assets/data/brands-" + window.currentLang + ".json")
      .then(function (r) { return r.json(); })
      .then(function (data) { window.BZ.globalSearch.data = data; })
      .catch(function () { console.warn("Global search data unavailable"); });

    input.addEventListener("input", function (e) {
      window.BZ.globalSearch.handleInput(e.target.value);
    });

    input.addEventListener("keydown", function (e) {
      window.BZ.globalSearch.handleKeyboard(e);
    });

    document.addEventListener("click", function (e) {
      if (!e.target.closest("#global-search-input") && !e.target.closest("#global-search-results")) {
        window.BZ.globalSearch.close();
      }
    });
  },

  handleInput(query) {
    clearTimeout(this.debounceTimer);
    var self = this;
    this.debounceTimer = setTimeout(function () {
      self.search(query.trim());
    }, this.debounceDelay);
  },

  handleKeyboard(e, resultsEl) {
    var container = resultsEl || document.getElementById("global-search-results");
    var items = container.querySelectorAll(".gs-result");
    if (e.key === "Escape") {
      if (resultsEl) {
        window.BZ.modal.close();
      } else {
        this.close();
        document.getElementById("global-search-input").blur();
      }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      this.selectedIndex = this.selectedIndex >= items.length - 1 ? 0 : this.selectedIndex + 1;
      this.highlightItem(items);
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      this.selectedIndex = this.selectedIndex <= 0 ? items.length - 1 : this.selectedIndex - 1;
      this.highlightItem(items);
      return;
    }
    if (e.key === "Enter") {
      if (this.selectedIndex > -1 && items[this.selectedIndex]) {
        items[this.selectedIndex].click();
      } else if (items.length > 0) {
        items[0].click();
      }
    }
  },

  highlightItem(items) {
    items.forEach(function (el, i) {
      el.classList.toggle("bg-base-300", i === window.BZ.globalSearch.selectedIndex);
    });
    if (items[this.selectedIndex]) {
      items[this.selectedIndex].scrollIntoView({ block: "nearest" });
    }
  },

  search(query, resultsEl) {
    var results = resultsEl || document.getElementById("global-search-results");
    if (!results) return;

    if (query.length < 1) {
      this.close();
      return;
    }

    var matches = [];
    var self = this;

    this.data.forEach(function (item) {
      if (self.fuzzyMatch(query.toLowerCase(), item.t.toLowerCase())) {
        matches.push(item);
      }
    });

    matches.sort(function (a, b) { return b.s - a.s; });
    matches = matches.slice(0, 10);
    this.selectedIndex = -1;

    if (matches.length === 0) {
      results.innerHTML = '<div class="px-4 py-8 text-center text-base-content/60"><i data-lucide="search-x" class="size-8 mx-auto mb-2 opacity-50"></i><p class="text-sm">' + (results.dataset.noResults || 'No brands found') + '</p></div>';
    } else {
      results.innerHTML = matches.map(function (item, idx) {
        var initials = self.getInitials(item.t);
        return '<a href="' + item.u + '" class="gs-result flex items-center gap-3 px-4 py-2.5 hover:bg-base-200 transition-colors border-b border-base-200 dark:border-gray-700 last:border-b-0">' +
          '<div class="size-9 rounded-full overflow-hidden bg-neutral text-neutral-content flex items-center justify-center text-xs font-bold shrink-0">' +
            '<img src="' + item.i + '" alt="' + item.t + '" class="w-full h-full object-cover" loading="lazy" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'">' +
            '<span class="hidden w-full h-full items-center justify-center">' + initials + '</span>' +
          '</div>' +
            '<div class="flex-1 min-w-0">' +
            '<div class="text-sm font-medium truncate">' + item.t + '</div>' +
            '<div class="text-xs text-base-content/60 capitalize">' + item.c + '</div>' +
            (item.d ? '<div class="text-xs text-base-content/50 truncate mt-0.5">' + item.d + '</div>' : '') +
          '</div>' +
          '<div class="badge badge-sm badge-ghost">' + item.s + '</div>' +
        '</a>';
      }).join("");
    }

    results.classList.remove("hidden");

    if (typeof lucide !== "undefined" && lucide.createIcons) {
      lucide.createIcons();
    }
  },

  openModal() {
    var self = this;
    var featuredHtml = '';
    var template = document.getElementById("gs-featured-template");
    if (template && template.innerHTML.trim()) featuredHtml = template.innerHTML;

    var body =
      '<div class="min-h-[200px]">' +
        '<h3 class="text-lg font-bold mb-3">' + getTranslation('texts.search').replace(/\.+$/, '') + '</h3>' +
        '<input id="gs-modal-input" type="search" placeholder="' + getTranslation('texts.searchBrands') + '" class="input w-full bg-base-100 pl-4 pr-4 text-base md:text-lg border-2 border-base-content/30" autocomplete="off" />' +
        (featuredHtml ? '<div id="gs-modal-featured" class="mt-3">' + featuredHtml + '</div>' : '') +
        '<div id="gs-modal-results" data-no-results="' + getTranslation('texts.searchNoResults') + '" class="hidden mt-2 bg-base-100 border border-base-300 dark:border-gray-700 rounded-box shadow-xl z-[60] max-h-96 overflow-y-auto"></div>' +
      '</div>';

    window.BZ.modal.show({ title: '', body: body }, true, false);

    var input = document.getElementById("gs-modal-input");
    var resultsEl = document.getElementById("gs-modal-results");
    var featuredEl = document.getElementById("gs-modal-featured");
    if (!input || !resultsEl) return;

    input.addEventListener("input", function (e) {
      clearTimeout(self.debounceTimer);
      var q = e.target.value;
      if (q.length === 0) {
        if (featuredEl) featuredEl.classList.remove("hidden");
        resultsEl.classList.add("hidden");
        return;
      }
      if (featuredEl) featuredEl.classList.add("hidden");
      self.debounceTimer = setTimeout(function () {
        self.search(q, resultsEl);
      }, self.debounceDelay);
    });

    input.addEventListener("keydown", function (e) {
      self.handleKeyboard(e, resultsEl);
    });

    setTimeout(function () { input.focus(); }, 100);
  },

  fuzzyMatch(query, text) {
    if (!query) return true;
    if (!text) return false;
    var queryIndex = 0;
    for (var i = 0; i < text.length && queryIndex < query.length; i++) {
      if (text[i] === query[queryIndex]) {
        queryIndex++;
      }
    }
    return queryIndex === query.length;
  },

  getInitials(name) {
    if (!name) return "?";
    return name.trim().split(/\s+/).slice(0, 2).map(function (w) { return w[0].toUpperCase(); }).join("") || "?";
  },

  close() {
    var results = document.getElementById("global-search-results");
    if (results) results.classList.add("hidden");
    this.selectedIndex = -1;
  }
};
