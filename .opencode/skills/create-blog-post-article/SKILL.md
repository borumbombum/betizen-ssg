---
name: create-blog-post-article
description: Complete workflow for creating a new blog post across all supported languages in the Betizen SSG. Asks for article content in Spanish, then creates all language variants with correct currency conversions, internal links, affiliate tracking, and featured images.
---

## Overview

This skill creates a new blog post across **all configured languages** in the Betizen SSG. The workflow:

1. The user provides the article topic in **Spanish**
2. The agent writes the **ES source file** (project default language)
3. Creates a **shared featured image**
4. **Translates** into each other language (EN, CS, PT-BR)
5. Adjusts **currencies**, **internal links**, **tags**, and affiliate `data-earnurl`
6. **Builds** and verifies

## Language Configuration

**Current languages:** ES (default), EN, CS, PT-BR

The language list is defined in `_data/languages.js` and the workflow applies to **any language** present there. If a new language is added to that file (with its corresponding `_data/l10n/{lang}.js` and `content/{lang}/` directories), this workflow extends automatically.

When adding a new language, first run the `add-new-language` skill to set up infrastructure before using this skill.

## Prerequisites

- **Build works:** `npm run build` passes without errors
- **All target languages exist** in `_data/languages.js` with their `_data/l10n/{lang}.js` translations
- **Each target language** has a `content/{lang}/blog/blog.11tydata.js` and `content/{lang}/blog/blog.njk`
- **AGENTS.md** guidelines are followed (version bump, commit format, git pull first)

## Step-by-Step Workflow

### Step 1: Gather Article Specification

Ask the user for the following:

- **Topic** — what the article is about
- **Key points** — main sections/arguments to include
- **Target casino/brand/product** — e.g., National Casino, PlayAmo, XM, IQ Option
- **Gradient color** — hex color for the CTA banner (use brand color, e.g., `#252122` for National Casino)
- **Affiliate URLs** — which affiliate links to promote (with correct `bid` and `redirectURL` parameters)
- **Currencies** — any specific amounts (bonus values, deposit thresholds)
- **Target audience notes** — any region-specific details (e.g., Argentina for ES, Brazil for PT-BR)

### Step 2: Create the Spanish Source File

Create `content/es/blog/{filename}.njk`.

**Filename rules:**
- Must be **identical** across all language directories (EleventyI18nPlugin links translations by relative file path)
- Use kebab-case (e.g., `national-casino-crypto-bonus.njk`)
- Keep short but descriptive

**Front matter:**

```yaml
---
title: "Article title in Spanish"
description: "Meta description in Spanish"
gradientColor: "#hexcolor"
author: "Betizen"
date: YYYY-MM-DDTHH:MM:SS+00:00
slugOverride: spanish-url-slug
tags:
  - tag1
  - tag2
  - tag3
---
```

- `date`: Use today's date in ISO 8601 format
- `slugOverride`: The URL slug for ES (e.g., `bono-cripto-national-casino`). Can differ from filename.
- `tags`: Spanish keywords. Include at least:
  - The casino/brand name (e.g., `national-casino`)
  - A category tag (e.g., `bono`, `kryptomeny`, `bonus`)
  - Topic tags (e.g., `primer-deposito`, `crypto-bonus`)

**Body structure:**

```html
<!-- CTA Banner (top) -->
<div style="text-align: center; margin: 2rem 0; padding: 1.5rem; background: linear-gradient(to right, {gradientColor}, {lighter}); border-radius: 12px; color: white;">
  <h2 style="margin: 0 0 1rem 0; color: white;">{Spanish CTA heading}</h2>
  <p style="margin: 0 0 1.5rem 0; font-size: 1.1rem;">{Spanish CTA subtext}</p>
  <a data-earnurl="{affiliate-url}"
     href="{affiliate-url}"
     style="display: inline-block; padding: 14px 32px; background: white; color: {gradientColor}; font-weight: bold; text-decoration: none; border-radius: 50px; font-size: 1.2rem; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
     {Spanish CTA text} →
  </a>
</div>

<p>Article body paragraphs in Spanish...</p>

<h3>{Section heading}</h3>
<p>More content...</p>

<!-- CTA Banner (bottom) -->
<div style="text-align: center; margin: 3rem 0 1rem 0; padding: 2rem; background: #f8f9fa; border-radius: 12px; border: 2px dashed {gradientColor};">
  <h3 style="margin: 0 0 1.2rem 0; color: #222;">{Spanish bottom CTA heading}</h3>
  <a data-earnurl="{affiliate-url}"
     href="{affiliate-url}"
     style="display: inline-block; padding: 16px 40px; background: {gradientColor}; color: white; font-weight: bold; text-decoration: none; border-radius: 50px; font-size: 1.3rem; box-shadow: 0 6px 20px rgba(0,0,0,0.3); transition: all 0.3s;">
     {Spanish bottom CTA text} →
  </a>
  <p style="margin: 1.5rem 0 0 0; font-size: 0.95rem; color: #555;">{Spanish footer disclaimer}</p>
</div>
```

**Affiliate link rules:**
- Add `data-earnurl="{url}"` **and** `href="{url}"` on the same `<a>` tag
- `data-earnurl` enables click tracking via `voting.js`
- Always include **both** attributes (the `href` is used as fallback redirect target)

**Currency for ES:**
- Argentina-focused content → ARS (Argentine Peso), e.g., `500.000 ARS`
- General content → USD, e.g., `$10`
- Format: use the locale format for the country

**Internal links for ES:**
- Casino: `/casino/{slug}/`
- Casino list: `/casinos/`
- Blog: `/blog/{slug}/`
- Forex: `/forex/{slug}/`
- Binary options: `/opciones-binarias/{slug}/`

### Step 3: Create the Featured Image

Create `public/imgs/posts/{filename-stem}-featured.webp`

- The filename stem is the **file name without extension** (e.g., `national-casino-crypto-bonus`)
- This is the same across all languages — the layout in `_includes/layouts/single-post.njk:37` loads it as `{{ page.fileSlug }}-featured.webp`
- All language variants **share** this single image
- Ask the user to provide the image or create a suitable one

### Step 4: Create the English Version

Create `content/en/blog/{filename}.njk` (same filename as ES).

**Changes from ES:**
- Translate `title`, `description` to English
- Update `slugOverride` to English if desired (can differ from ES)
- Translate `tags` to English keywords
- Translate all body content to English
- Update currency: EUR or USD (use `EUR/$` when both apply, e.g., `€/$ 5`)
- Update all internal links to EN URLs:

| ES | EN |
|---|---|
| `/casino/{slug}/` | `/en/online-casino/{slug}/` |
| `/casinos/` | `/en/online-casinos/` |
| `/blog/{slug}/` | `/en/articles/{slug}/` |
| `/forex/{slug}/` | `/en/forex/{slug}/` |
| `/opciones-binarias/{slug}/` | `/en/binary-options/{slug}/` |
| `/casinos/criptomonedas/` | `/en/online-casinos/crypto/` |

- Keep `data-earnurl` URLs **unchanged** (affiliate links are language-agnostic)
- Keep the same `date` field

**Don't add an explicit `permalink`** — the `blog.11tydata.js` for EN generates it from `slugOverride` as `/{lang}/articles/{slugOverride}/`.

### Step 5: Create the Czech Version

Create `content/cs/blog/{filename}.njk` (same filename).

**Changes from ES:**
- Translate all text to Czech
- Update `slugOverride` to Czech if desired
- Translate `tags` to Czech keywords
- Currency: EUR or CZK (e.g., `500 EUR`, `500 Kč`)
- Update all internal links to CS URLs:

| ES | CS |
|---|---|
| `/casino/{slug}/` | `/cs/online-kasino/{slug}/` |
| `/casinos/` | `/cs/online-kasina/` |
| `/blog/{slug}/` | `/cs/clanky/{slug}/` |
| `/forex/{slug}/` | `/cs/forex/{slug}/` |
| `/opciones-binarias/{slug}/` | `/cs/binarni-opce/{slug}/` |
| `/casinos/criptomonedas/` | `/cs/online-kasina/krypto/` |

- Keep `data-earnurl` unchanged
- CS uses a **closure pattern** in `blog.11tydata.js` (`module.exports = function () { var LANG = "cs"; ... }`) — no change needed in your file
- No explicit `permalink` — the 11tydata handles it: `/cs/clanky/{slugOverride}/`

**Login button:** The CS login button is `"Vstup"` in `_data/l10n/cs.js:103` (single word, no wrapping issues).

### Step 6: Create the PT-BR Version

Create `content/pt-br/blog/{filename}.njk` (same filename).

**Changes from ES:**
- Translate all text to Portuguese
- Update `slugOverride` to Portuguese if desired
- Translate `tags` to Portuguese keywords
- Currency: BRL (Brazilian Real), e.g., `R$ 3.000`
- Update all internal links to PT-BR URLs:

| ES | PT-BR |
|---|---|
| `/casino/{slug}/` | `/pt-br/cassino/{slug}/` |
| `/casinos/` | `/pt-br/cassinos/` |
| `/blog/{slug}/` | `/pt-br/colunas/{slug}/` |
| `/forex/{slug}/` | `/pt-br/forex/{slug}/` |
| `/opciones-binarias/{slug}/` | `/pt-br/opcoes-binarias/{slug}/` |
| `/casinos/criptomonedas/` | `/pt-br/cassinos/criptomoedas/` |

- Keep `data-earnurl` unchanged
- No explicit `permalink` — 11tydata handles it: `/{lang}/colunas/{slugOverride}/`

### Step 7: Build and Verify

```bash
npm run build
```

**Checklist:**
- [ ] Build completes with **no errors** (expect ~965 files)
- [ ] ES page renders at `/blog/{slugOverride}/`
- [ ] EN page renders at `/en/articles/{slugOverride}/`
- [ ] CS page renders at `/cs/clanky/{slugOverride}/`
- [ ] PT-BR page renders at `/pt-br/colunas/{slugOverride}/`
- [ ] Featured image loads on all variants
- [ ] Affiliate links have `data-earnurl` attribute
- [ ] Internal links point to correct language URLs
- [ ] Currencies match the target locale
- [ ] Tags use language-specific keywords

## Reference Tables

### Complete URL Mapping

| Content | ES | EN | CS | PT-BR |
|---------|----|----|----|-------|
| Casino detail | `/casino/{slug}/` | `/en/online-casino/{slug}/` | `/cs/online-kasino/{slug}/` | `/pt-br/cassino/{slug}/` |
| Casino list | `/casinos/` | `/en/online-casinos/` | `/cs/online-kasina/` | `/pt-br/cassinos/` |
| Blog post | `/blog/{slug}/` | `/en/articles/{slug}/` | `/cs/clanky/{slug}/` | `/pt-br/colunas/{slug}/` |
| Blog list | `/blog/` | `/en/articles/` | `/cs/clanky/` | `/pt-br/colunas/` |
| Forex detail | `/forex/{slug}/` | `/en/forex/{slug}/` | `/cs/forex/{slug}/` | `/pt-br/forex/{slug}/` |
| Binary options | `/opciones-binarias/{slug}/` | `/en/binary-options/{slug}/` | `/cs/binarni-opce/{slug}/` | `/pt-br/opcoes-binarias/{slug}/` |
| Crypto casinos | `/casinos/criptomonedas/` | `/en/online-casinos/crypto/` | `/cs/online-kasina/krypto/` | `/pt-br/cassinos/criptomoedas/` |

### Blog Permalink Patterns

These are defined in each language's `blog.11tydata.js`. **Do not add explicit `permalink`** in front matter unless overriding the default.

| Lang | 11tydata pattern | Example output |
|------|-----------------|----------------|
| ES | `return \`/blog/${slugOverride}/\`;` | `/blog/bono-cripto-national/` |
| EN | `return \`/${data.lang}/articles/${slugOverride}/\`;` | `/en/articles/crypto-bonus-national/` |
| CS | `return LANG + "/clanky/" + slugOverride + "/";` (closure) | `/cs/clanky/krypto-bonus-national/` |
| PT-BR | `return \`/${data.lang}/colunas/${slugOverride}/\`;` | `/pt-br/colunas/bonus-cripto-national/` |

### Currency by Language

| Lang | Primary Currency | Format Examples | Use Case |
|------|-----------------|----------------|----------|
| ES | ARS (Argentine Peso) | `500.000 ARS`, `$10` | Argentina-focused content |
| EN | EUR and USD (EUR/$) | `500 EUR`, `$5`, `€/$ 5` | Global audience |
| CS | EUR or CZK | `500 EUR`, `500 Kč` | Czech audience |
| PT-BR | BRL (Brazilian Real) | `R$ 3.000` | Brazil-focused content |

When converting currencies for a specific article, use the current exchange rate. For general bonus amounts (e.g., "200% up to 500 EUR"), keep EUR and convert only regional currency references.

### Common Tag Translations

| English | Spanish | Czech | Portuguese |
|---------|---------|-------|------------|
| `bonus` | `bono` | `bonus` | `bônus` |
| `cryptocurrency` | `criptomonedas` | `kryptomeny` | `criptomoedas` |
| `first-deposit` | `primer-deposito` | `prvni-vklad` | `primeiro-deposito` |
| `review` | `resena` | `recenze` | `analise` |
| `affiliate-programs` | `programas-afiliados` | `programy-afiliaci` | `programas-afiliados` |
| `casino` | `casino` | `kasino` | `cassino` |
| `forex` | `forex` | `forex` | `forex` |
| `trading` | `trading` | `trading` | `trading` |
| `safe` | `seguro` | `bezpecny` | `seguro` |
| `guide` | `guia` | `pruvodce` | `guia` |
| `promotion` | `promocion` | `promoakce` | `promocao` |

For **brand names** (e.g., `national-casino`, `playamo`, `iq-option`), keep the same tag across all languages.

### Front Matter Template (ES source)

```yaml
---
title: "Title in Spanish"
description: "Meta description in Spanish"
gradientColor: "#hexcolor"
author: "Betizen"
date: 2026-07-09T12:00:00+00:00
slugOverride: spanish-url-slug
tags:
  - casino-brand-name
  - category-tag
  - topic-tag
---
```

**Per-language modifications:**

| Field | ES | EN | CS | PT-BR |
|-------|----|----|----|-------|
| `title` | Spanish | English | Czech | Portuguese |
| `description` | Spanish | English | Czech | Portuguese |
| `slugOverride` | Spanish | English/any | Czech/any | Portuguese/any |
| `tags` | Spanish | English | Czech | Portuguese |
| `gradientColor` | Keep | Keep | Keep | Keep |
| `author` | Keep | Keep | Keep | Keep |
| `date` | Keep | Keep | Keep | Keep |

## Affiliate Link Pattern

```html
<a data-earnurl="https://media.toxtren.com/redirect.aspx?pid=101348&bid=XXXX&redirectURL=https://..."
   href="https://media.toxtren.com/redirect.aspx?pid=101348&bid=XXXX&redirectURL=https://..."
   style="display: inline-block; padding: 14px 32px; background: white; color: {gradientColor}; font-weight: bold; text-decoration: none; border-radius: 50px; font-size: 1.2rem; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
   CTA text →
</a>
```

- `data-earnurl` must match `href` exactly
- Top banner: white button on gradient background
- Bottom banner: gradient-colored button on light background with dashed border
- CTA text is translated per language
- **All affiliate links across all languages share the same URL** (redirect URL is language-agnostic)

## External References

- **`content-guidelines` skill** — for casino frontmatter schema, reputation codes, badge values
- **`add-new-language` skill** — for adding infrastructure when a new language is needed
- **`translate-casino-to-english` skill** — for casino-specific translation patterns
- **`AGENTS.md`** — project-wide guidelines (git workflow, version bump, build commands)

## Notes

- The `e.preventDefault()` in `public/js/core/voting.js:15` already handles `data-earnurl` on `<a>` tags — no JS changes needed
- If a linked page doesn't exist in the target language yet, use the **English version** as fallback (e.g., `/en/online-casino/{slug}/`)
- Keep `h2` anchor IDs unchanged when translating casino review content (they match `casino-details.njk`)
- Featured images use the **filename stem**, not `slugOverride` — changing `slugOverride` doesn't affect the image path
- Always bump `package.json` version before committing
- Commit message format: `"AGENT: add {article topic} blog post"`

### Adding a New Language in the Future

When a new language is added to `_data/languages.js`:

1. Update the URL Mapping table above to include the new column
2. Add a currency row to the Currency table
3. The blog.11tydata.js for the new language will define its permalink pattern
4. The same workflow applies — create the same filename in the new language directory
