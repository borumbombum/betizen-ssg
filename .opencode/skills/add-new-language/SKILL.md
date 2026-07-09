---
name: add-new-language
description: Complete workflow for adding a new language to the Betizen SSG, from data setup through translating a starter casino.
---

## Overview

Adding a new language involves:

1. **Flag setup** — ensure the country flag SVG exists
2. **Data layer** — add translations and navigation in `_data/` files
3. **Content scaffolding** — create `/content/{lang}/` directory with `.11tydata.js`
4. **Translate a starter casino** — e.g., 1xBet, to validate the setup
5. **Build and verify**

**Related skills:** This skill focuses on language infrastructure and casino translation. For reputation codes, score guidelines, blacklist rules, and frontmatter schema conventions, see the [content-guidelines](../content-guidelines/SKILL.md) skill.

## Before You Start

This skill is generic for any language. Determine these values before beginning:

- **`{lang}`** — language code (e.g., `cs` for Czech, `fr` for French)
- **`{lang_name}`** — how the language says its own name (e.g., `Čeština`, `Français`, `Deutsch`)
- **`{flag_path}`** — the flag SVG path (e.g., `cz.svg`, `fr.svg`, `de.svg`)
- **`{url_prefix}`** — URL path prefix, usually `/{lang}/`

Then validate:

```bash
# Check the flag SVG exists
ls public/imgs/flags/svg/{flag_path}
# If missing, download or create it
```

**Determine content path patterns** by examining existing non-default languages:

```bash
# See existing language URL paths for reference
ls _site/en/
ls _site/pt-br/
```

## URL Pattern Rules

There are two patterns based on whether the language is the **default** or not:

| Aspect | Default (`es`) | Non-default (`en`, `pt-br`, new `{lang}`) |
|--------|---------------|-------------------------------------------|
| Homepage URL | `/` | `/{url_prefix}/` |
| Casino URL | `/casino/{slug}/` | `/{url_prefix}/casino-slug/{slug}/` |
| Casino list | `/casinos/` | `/{url_prefix}/casino-list-slug/` |
| `locale_links` | Links from default | Links TO default and others |
| `{lang}.11tydata.js` permalink | `/${slug}/` | `/${data.lang}/{slug}/` |

This is controlled by `eleventy.config.js`:

```js
eleventyConfig.addPlugin(EleventyI18nPlugin, {
  defaultLanguage: "es",
  errorMode: "never",
});
```

All content pages in non-default languages must set `lang` to the language code in their `.11tydata.js` file. The `locale_url` and `locale_links` filters (from EleventyI18nPlugin) automatically map URLs between languages based on matching content paths.

## Step-by-Step Workflow

### Step 1: Ensure flag SVG exists

```bash
ls public/imgs/flags/svg/{flag_path}
# If missing, copy from an existing SVG or add the flag
cp public/imgs/flags/svg/un.svg public/imgs/flags/svg/{flag_path}
```

### Step 2: Add language data to `_data/languages.js`

Add a new block keyed by `{lang}` (modeled on the `en` block). All values must be translated:

```js
{lang}: {
  footerNav: {
    blog: { name: "Blog", slug: "/{url_prefix}/blog/" },
    games: { name: "{translated_games_name}", slug: "/{url_prefix}/{games_slug}/" },
  },
  dir: "",  // empty = LTR, use "rtl" for Arabic/Hebrew
  menu: {
    name: "{lang_name}",
    flagClass: "flag-icon-{lang}",
  },
  top: {
    text: "{translated_add_site_text}",
    url: "https://forms.gle/vMpnv4cFgccHYNp56",
  },
  promo: {
    // Copy from EN initially — banners, CTAs, casino promos
    // Translate CTA text, update image references if language-specific banners exist
  },
  categories: {
    slot: { name: "{translated_slots}", url: "/{url_prefix}/{games_slug}/{slot_slug}/" },
    bingo: { name: "{translated_bingo}", url: "/{url_prefix}/{games_slug}/{bingo_slug}/" },
    roulette: { name: "{translated_roulette}", url: "/{url_prefix}/{games_slug}/{roulette_slug}/" },
    blackjack: { name: "{translated_blackjack}", url: "/{url_prefix}/{games_slug}/{blackjack_slug}/" },
    instant: { name: "{translated_instant_win}", url: "/{url_prefix}/{games_slug}/{instant_slug}/" },
    baccarat: { name: "{translated_baccarat}", url: "/{url_prefix}/{games_slug}/{baccarat_slug}/" },
    poker: { name: "{translated_video_poker}", url: "/{url_prefix}/{games_slug}/{poker_slug}/" },
  },
  texts: { ... },  // all ~150 translatable strings
}
```

**Required sub-fields in `texts`:** All keys present in `en.texts` must exist. Missing keys will cause rendering errors. Common ones: `readMore`, `visit`, `bonus`, `login`, `logout`, `search`, `reputation`, `karma`, `voting`, etc.

**Copy-paste tip:** Duplicate the `en` block, then translate each string value. Leave technical fields unchanged (e.g., `promo.url`, image paths).

### Step 3: Add navigation to `_data/nav.js`

```js
{lang}: [
  { text: "{translated_casinos}", url: "/{url_prefix}/{casino_list_slug}/", id: "term-id-5" },
  { text: "{translated_crypto}",  url: "/{url_prefix}/{crypto_slug}/",       id: "term-crypto" },
  { text: "Forex",                url: "/{url_prefix}/forex/",               id: "term-forex" },
  { text: "{translated_binary}",  url: "/{url_prefix}/{binary_slug}/",       id: "term-binary" },
],
```

The `id` field must match existing IDs from other languages.

### Step 4: Categories auto-populate

`_data/categories.js` reads from `languages.js` automatically. Add a new entry:

```js
module.exports = function () {
  return {
    es: buildGameCategoriesFromLanguage("es"),
    "pt-br": buildGameCategoriesFromLanguage("pt-br"),
    en: buildGameCategoriesFromLanguage("en"),
    "{lang}": buildGameCategoriesFromLanguage("{lang}"),
  };
};
```

### Step 5: Fix hardcoded flag images

The flag SVG mapping is currently hardcoded as `if/elif/else` in **3 template files**:

| File | Lines |
|------|-------|
| `_includes/components/bz-message.njk` | 69-75 |
| `_includes/locale-fix.njk` | 15-21 |
| `_includes/templates/languages-modal.template.njk` | 9-15 |

Each has a pattern like:

```njk
{% if languages[link.lang].menu.flagClass == "flag-icon-es" %}
  <img src="/assets/imgs/flags/svg/ar.svg" ... />
{% elif languages[link.lang].menu.flagClass == "flag-icon-br" %}
  <img src="/assets/imgs/flags/svg/br.svg" ... />
{% else %}
  <img src="/assets/imgs/flags/svg/un.svg" ... />
{% endif %}
```

**Minimal approach:** Add an `elif` branch for the new `flagClass` in all 3 files:

```njk
{% elif languages[link.lang].menu.flagClass == "flag-icon-{lang}" %}
  <img src="/assets/imgs/flags/svg/{flag_path}" ... />
```

**Recommended approach — refactor to data-driven:** Add a `flagSvg` field to each language entry in `_data/languages.js`:

```js
menu: {
  name: "{lang_name}",
  flagClass: "flag-icon-{lang}",
  flagSvg: "/assets/imgs/flags/svg/{flag_path}",
},
```

Then all 3 templates simplify to a single line:

```njk
<img src="{{ languages[link.lang].menu.flagSvg }}" class="..." alt="{{ languages[link.lang].menu.name }}" />
```

This makes all future language additions pure data changes — no template edits needed.

### Step 6: Create language content directory

Create `content/{lang}/` with the following minimum files:

**`{lang}.11tydata.js`** (root directory data):

```js
module.exports = {
  lang: "{lang}",
  layout: "layouts/base.njk",
  permalink: function (data) {
    if (data.slugOverride) {
      return `/${data.lang}/${this.slugify(data.slugOverride)}/`;
    }
  },
};
```

**`index.njk`** (home page — translate from `en/index.njk`):

```markdown
---
title: "Extreme transparency: karma, merit & proof-of-work"
layout: layouts/home.njk
---
```

**`casinos/casinos.11tydata.js`** (casino directory data):

```js
const metadata = require("../../../_data/metadata.js");
const languages = require("../../../_data/languages.js");
module.exports = {
  lang: "{lang}",
  tags: ["casinos"],
  layout: "layouts/single-casino.njk",
  permalink: function (data) {
    if (data.slugOverride) {
      return `${data.lang}/{casino_slug}/${this.slugify(data.slugOverride)}/`;
    }
  },
  eleventyComputed: {
    pageTitle: (data) => {
      return data.title + " | {review_label} - " + metadata.title;
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
```

Where `{casino_slug}` is the URL path segment for casino details (e.g., `online-casino` for EN, `cassino` for PT-BR) and `{review_label}` is "Honest review" in the target language.

**`casinos/casinos.njk`** (casino listing page — translate from `es/casinos/casinos.njk` or `en/casinos/casinos.njk`):

```markdown
---
title: "{translated_title}"
description: "{translated_description}"
permalink: /{url_prefix}/{casino_list_slug}/
eleventyComputed:
  pageTitle: "{translated_page_title} - {{metadata.title}}"
layout: layouts/casinos.njk
---
```

Where `{casino_list_slug}` is the listing page slug (e.g., `online-casinos` for EN, `cassinos` for PT-BR).

**`casinos/blacklisted.njk`** (blacklist page):

```markdown
---
title: "Blacklisted Casinos"
description: "{translated_description}"
permalink: /{url_prefix}/{casino_list_slug}/blacklist/
layout: layouts/casinos.njk
---
```

### Step 7: Translate a starter casino (1xBet reference)

Create `content/{lang}/casinos/1xbet.njk`. Use the Spanish version as source for structure, the English version as source for translation style.

**Frontmatter rules:**

| Field | Action |
|-------|--------|
| `date` | Keep or update to current date |
| `slugOverride` | Same as EN (`1xbet`) |
| `title` | Translate to target language (keep brand name "1xBet") |
| `description` | Translate to target language |
| `excerpt` | Translate to target language |
| `operator` | Keep unchanged (company name) |
| `gradient` | Keep unchanged (brand colors) |
| `bonus.link` | Use internal URL: `/{url_prefix}/{casino_slug}/1xbet/` |
| `details.*` | Keep unchanged (score values like `"good"`, `"average"`) |
| `maxWidthdrawal` | Translate label; convert currency if needed |
| `minDeposit` | Translate label; convert currency if needed |
| `minWidthdrawal` | Translate label; convert currency if needed |
| `license` | Keep unchanged (e.g., "Curaçao") |
| `reputation.code` | Follow the `content-guidelines` skill for code usage |
| `reputation.text` | Translate to target language |
| `featured`, `ranking`, `score` | Keep unchanged |

**Body rules:**

1. **Translate all paragraphs** to the target language (preserve meaning, adapt naturally)
2. **Keep `h2` anchor IDs unchanged** — they must match the Spanish IDs:
   - `juegos`, `bonos`, `atencion-al-cliente`, `usabilidad`
   - These are hardcoded in `_includes/components/casinos/casino-details.njk`
3. **Translate heading text** after the anchor but before the badge:
   - `<h2 id="juegos" class="contentIndexTitle">Juegos&nbsp;...` → `<h2 id="juegos" class="contentIndexTitle">{translated_games}&nbsp;...`
4. **Translate badge labels** using the `languages.{lang}.texts` values you set in Step 2:
   - Map `"good"` / `"average"` / `"bad"` from frontmatter `details.*` to the translated label
   - E.g., for PT-BR: `"good"` → `Bom`, `"average"` → `Médio`, `"bad"` → `Ruim`
   - Keep the badge color classes (`badge-success`, `badge-warning`, `badge-error`)
5. **Update internal links** to the target language's URLs:
   - `/blog/que-es-el-rtp-en-las-tragamonedas/` → `/{url_prefix}/{blog_slug}/{rtp_article_slug}/`
   - If no equivalent page exists yet, link to English as fallback: `/en/...`
   - Casino list links: `/casinos/` → `/{url_prefix}/{casino_list_slug}/`
6. **Keep external links** (Curaçao eGaming, phone numbers, emails) unchanged

### Step 8: Build and verify

```bash
npm run build
```

Checklist:

- [ ] `/{url_prefix}/index.html` renders at `_site/{url_prefix}/index.html`
- [ ] `/{url_prefix}/{casino_list_slug}/` renders at `_site/{url_prefix}/{casino_list_slug}/index.html`
- [ ] `/{url_prefix}/{casino_slug}/1xbet/` renders at `_site/{url_prefix}/{casino_slug}/1xbet/index.html`
- [ ] Language switcher modal shows the new flag + language name
- [ ] `locale_url` nav links work (Casinos → `/{url_prefix}/{casino_list_slug}/`, Forex → `/{url_prefix}/forex/`)
- [ ] hreflang tags in `<head>` include the new language alternate link
- [ ] No Eleventy build errors

### Step 9: Future content expansion

After the initial setup, add remaining content files in priority order:

1. Static pages: `pages/about.njk`, `pages/benefits.njk`, `pages/leaderboard.njk`, etc.
2. Blog posts (translate from ES or EN)
3. Remaining casino reviews
4. Game pages
5. Provider pages
6. Binary/Forex listings

## Reference: Permalink Pattern Quick Reference

| Content type | Default language (`es`) | Non-default (en/pt-br/{lang}) |
|-------------|------------------------|-------------------------------|
| Any page (via `{lang}.11tydata.js`) | `/{slug}/` | `/{lang}/{slug}/` |
| Casino detail (via `casinos.11tydata.js`) | `/casino/{slug}/` | `/{lang}/{casino_slug}/{slug}/` |
| Casino listing | `/casinos/` | `/{lang}/{casino_list_slug}/` |
| Game detail (via `games.11tydata.js`) | `/juego/{slug}/` | `/{lang}/{game_slug}/{slug}/` |
| Game listing | `/juegos/` | `/{lang}/{games_list_slug}/` |
| Provider (via `providers.11tydata.js`) | `/proveedor/{slug}/` | `/{lang}/{provider_slug}/{slug}/` |
| Provider listing | `/proveedores/` | `/{lang}/{providers_list_slug}/` |
| Blog post (via `blog.11tydata.js`) | `/blog/{slug}/` | `/{lang}/{blog_slug}/{slug}/` |
| Blog listing | `/blog/` | `/{lang}/{blog_list_slug}/` |
| Page (via `pages.11tydata.js`) | `/{slug}/` | `/{lang}/{slug}/` |

## Reference: Files to Create/Modify Summary

| Action | File | Notes |
|--------|------|-------|
| Modify | `_data/languages.js` | Add `{lang}: { ... }` block with all translations |
| Modify | `_data/nav.js` | Add `{lang}: [ ... ]` block with nav items |
| Modify | `_data/categories.js` | Add `{lang}: buildGameCategoriesFromLanguage("{lang}")` |
| Modify | `_includes/components/bz-message.njk` | Add `elif` for new `flagClass` (or refactor to `flagSvg`) |
| Modify | `_includes/locale-fix.njk` | Add `elif` for new `flagClass` (or refactor to `flagSvg`) |
| Modify | `_includes/templates/languages-modal.template.njk` | Add `elif` for new `flagClass` (or refactor to `flagSvg`) |
| Create | `content/{lang}/{lang}.11tydata.js` | Language config with correct permalink |
| Create | `content/{lang}/index.njk` | Home page |
| Create | `content/{lang}/casinos/casinos.11tydata.js` | Casino directory config |
| Create | `content/{lang}/casinos/casinos.njk` | Casino listing page |
| Create | `content/{lang}/casinos/blacklisted.njk` | Blacklist page |
| Create | `content/{lang}/casinos/1xbet.njk` | Starter casino review |
