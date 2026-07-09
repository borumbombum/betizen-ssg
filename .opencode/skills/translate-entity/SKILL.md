---
name: translate-entity
description: Translate casino, forex, or binary entity reviews between any language pair. Handles internal links, currency conversion, cross-sell cards, and recursive translation of linked content.
---

## Overview

Translates a casino, forex, or binary entity review from a source language to a target language. The skill handles:

- Full frontmatter and body translation
- Internal link resolution (and creates missing linked pages if needed)
- Automated currency conversion via live exchange rates
- Entity-specific rules (hardcoded anchor IDs, detail fields, CTAs)
- Dynamic cross-sell cards (casinos only)
- `aiOverview` field preservation

## Prerequisites

- Identify the source entity file path: `content/{srcLang}/{entityDir}/{filename}.njk`
- Identify the source and target language codes (e.g., `es` → `en`, `es` → `cs`)
- No prior setup needed — the skill checks everything as it goes

## Entity Reference

| Entity type | Content directory | Detail fields prefix | Has `aiOverview`? | Body CTA? |
|-------------|-------------------|---------------------|-------------------|-----------|
| Casino | `casinos/` | `games`, `promotions`, `customerSupport`, `design`, `license`, `affiliateProgram` | Only in newer files | No |
| Forex | `forex/` | `regulamentacao`, `plataformas`, `spreads`, `contas`, `instrumentos`, `alavancagem`, `pagamentos`, `pesquisa`, `conta_demo`, `suporte`, `educacao` | Always | Yes ("Open account" link) |
| Binary | `binaries/` | Same as forex + `ativos`, `taxas` | Always | Yes ("Open account" link) |

## Step-by-Step Workflow

### Step 1: Identify the Translation Task

Ask the user:

- **Entity type**: casino / forex / binary
- **Source file**: find the exact path (use `grep` or `ls` if needed)
- **Source language**: language code of the source file
- **Target language**: language code to translate into

For casinos only, also ask:

- **Cross-sell casino**: "Which casino should the cross-sell card promote? (default: National Casino)"

### Step 2: Read Source File

Read the full source file. Understand:

- **Frontmatter** — each field and its purpose
- **Anchor IDs** — which `h2` sections exist (must be preserved)
- **Internal links** — `/juegos/...`, `/proveedor/...`, `/casino/...`, `/blog/...`, `/casinos/`, etc.
- **Badge labels** — the text inside `<span class="badge badge-*">` tags
- **Currency values** — in `maxWidthdrawal`, `minDeposit`, `minWidthdrawal` and in body text

### Step 3: Build the Site

```bash
npm run build
```

### Step 4: Resolve Target URLs

For each internal link found in the source, determine the target language URL:

```bash
# Check casino slugs in target
ls _site/{tgtLang}/online-casino/
ls _site/{tgtLang}/{casino_list_slug}/

# Check forex slugs
ls _site/{tgtLang}/forex/

# Check binary slugs
ls _site/{tgtLang}/{binary_slug}/

# Check game slugs
ls _site/{tgtLang}/game/
ls _site/{tgtLang}/{games_slug}/

# Check provider slugs
ls _site/{tgtLang}/game-provider/
ls _site/{tgtLang}/{provider_slug}/

# Check blog slugs
ls _site/{tgtLang}/{blog_slug}/
```

For each internal link, record whether a target equivalent exists.

**URL pattern reference** (non-default languages like `en`, `cs`, `pt-br`):

| Source pattern | Target pattern |
|---------------|----------------|
| `/juegos/{slug}/` | `/{tgtLang}/game/{slug}/` (if exists) |
| `/proveedor/{slug}/` | `/{tgtLang}/game-provider/{slug}/` (if exists) |
| `/casino/{slug}/` | `/{tgtLang}/online-casino/{slug}/` |
| `/casinos/` | `/{tgtLang}/{casino_list_slug}/` |
| `/blog/{slug}/` | `/{tgtLang}/{blog_slug}/{slug}/` |
| `/proveedores/` | `/{tgtLang}/{providers_list_slug}/` |
| `/forex/` (ES) | `/{tgtLang}/forex/` |

### Step 5: Create Missing Linked Content (Batch)

After identifying all internal links that lack a target-language version, present the list to the user:

> "These N linked pages don't exist in {tgtLang}:"
> - `/es/juegos/video-bingo/` (game)
> - `/es/proveedor/gamebeat-studio/` (provider)
> - `/es/blog/que-es-el-rtp/` (blog post)
>
> "Auto-translate all of them now? (Y/n)"

If YES, use this same skill's workflow recursively for each missing page (same rules: full frontmatter + body translation, currency conversion if applicable, etc.).

If NO (or skip individual items), set those links to fall back to the English version or keep the source language URL.

### Step 6: Currency Conversion

Ask the user:

> "What is the source currency for the frontmatter values? (default: USD)"
> "What is the target currency? (default: USD)"

Fetch today's exchange rate:

```bash
# Use websearch to get the rate
# e.g., "USD to EUR exchange rate today 2026-07-09"
```

Then convert these frontmatter fields:

- `maxWidthdrawal` — e.g., `"$9500"` → convert amount, keep formatting
- `minDeposit` — e.g., `"$10"` → convert amount, keep formatting
- `minWidthdrawal` — e.g., `"$10"` → convert amount, keep formatting

Handle special values:
- `"?"` — keep as-is (unknown)
- `"No"` or `"None"` — keep as-is (unlimited)
- Range values like `"$5-$10"` — convert both bounds

**Body text currency mentions**: Flag for the user but do not auto-convert (free-text amounts are context-dependent). Present as:

> "Body text mentions $ amounts — review manually and update if needed."

### Step 7: Image Handling

Images in entity files are rare but follow these rules:

**Entity logos** — Template-driven by `slugOverride`. Always shared across all languages. Never change image paths.

**`bonus.image` / `bonus.noHtmlImage`** (frontmatter) — These are bonus-themed images (e.g., `"axe-casino-bonus.webp"`). They are generic images without text overlay and are shared across all languages (same filename in ES, EN, PT-BR, CS). Keep the filename unchanged.

**Inline `<img>` tags** in body content — Rare (only seen in `national-argentina.njk`). If present:

1. Translate the `alt` attribute
2. Check if the image contains embedded text in the source language:
   - If text-free (e.g., just a logo or decorative graphic): keep the path unchanged
   - If it has language-specific text overlay: flag for the user — a localized image version may be needed
3. Image paths using `{{ metadata.images.* }}` refer to shared directories — the path template stays unchanged

**Promo/banner images** (`_data/l10n/{lang}.js` `promo.image`) — These are **not** in entity files. They are language-specific and handled by the language data setup, not by entity translation. No action needed.

> **General principle**: Most images in this project are shared across languages and identified by brand slug. Only promotional banners with embedded text are language-specific.

### Step 8: Create the Translated File

Write `content/{tgtLang}/{entityDir}/{sourceFilename}`.

#### Frontmatter Rules

| Field | Action |
|-------|--------|
| `date` | Set to current ISO date (e.g., `"2026-07-09T12:00:00+00:00"`) |
| `slugOverride` | Keep **exactly** as-is (cross-language identifier) |
| `title` | Translate |
| `description` | Translate |
| `excerpt` | Translate |
| `operator` | Keep unchanged |
| `gradient.start`, `gradient.end` | Keep unchanged |
| `bonus.title` | Translate |
| `bonus.text` | Translate |
| `bonus.link` | Keep unchanged (or update if a target-language affiliate link exists) |
| `bonus.image` | Keep unchanged (shared image filename, no text overlay) |
| `bonus.noHtmlImage` | Keep unchanged (shared image filename, no text overlay) |
| `details.*` | Keep unchanged (score values like `"good"`, `"average"`, `"bad"`) |
| `maxWidthdrawal` | Converted currency value from Step 6 |
| `minDeposit` | Converted currency value from Step 6 |
| `minWidthdrawal` | Converted currency value from Step 6 |
| `license` | Keep unchanged (e.g., "Curaçao", "CySEC") |
| `reputation.code` | Keep unchanged (maps to badge color) |
| `reputation.text` | Translate |
| `ranking` | Keep unchanged |
| `score` | Keep unchanged |
| `featured` | Keep unchanged (if present) |
| `blacklisted` | Keep unchanged (if present) |
| `youtube` (binaries) | Keep unchanged, or update if a language-specific video exists |
| `aiOverview` | **Must be present if source has it.** Translate `reason`, keep `count` unchanged. |
| `layout` | Do not include (handled by `.11tydata.js`) |

#### Body Rules

**Anchor IDs** — Must be preserved exactly:

| Entity | Must-preserve IDs |
|--------|------------------|
| Casino | `juegos`, `bonos`, `atencion-al-cliente`, `usabilidad`, `licenses`, `affiliateprogram` (hardcoded in `_includes/components/casinos/casino-details.njk`) |
| Forex | Keep whatever IDs the source uses (not system-referenced, but maintain consistency) |
| Binary | Keep whatever IDs the source uses |

**Badge labels** — The `<span class="badge badge-*">` color classes stay unchanged. The label text must be translated per language:

| `details.*` value | ES badge | EN badge | CS badge | PT-BR badge |
|-------------------|----------|----------|----------|-------------|
| `"good"` | Bueno | Good | Dobré | Bom |
| `"average"` | Medio/Regular | Average | Průměrné | Médio |
| `"bad"` | Malo | Bad | Špatné | Ruim |

**Headings** — The `h2` text after the anchor ID must be translated:

```njk
{# ES original #}
<h2 id="juegos" class="contentIndexTitle">Juegos en el casino Bodog&nbsp;<span class="badge badge-success badge-pill">&#10003; Bueno</span></h2>

{# EN translation #}
<h2 id="juegos" class="contentIndexTitle">Games at Bodog Casino&nbsp;<span class="badge badge-success badge-pill">&#10003; Good</span></h2>
```

**Internal links** — Replace with target language URLs found in Step 4. For links without a target equivalent (and user chose not to auto-translate), fall back to:

- English version if available: `/en/game/{slug}/`
- Source language version as last resort

**External links** (Curaçao eGaming, phone numbers, emails, affiliate links) — Keep unchanged.

**CTA buttons** (forex/binary only) — The `btn btn-log btn-secondary w-full` button and its text must be translated:

```njk
{# ES #}
<a class="btn btn-log btn-secondary w-full" href="{{ bonus.link }}">
    ¡Abrir cuenta gratuita ahora!
</a>

{# EN #}
<a class="btn btn-log btn-secondary w-full" href="{{ bonus.link }}">
    Open free account now!
</a>
```

**Country/locale-specific sections** (primarily in binary files like IQ Option) — These sections talk about the platform in a specific country context. Translate and adapt:

- `id="para-traders-en-mexico"` → `id="for-mexican-traders"` (but keep ID from source unless it makes sense to change)
- `id="para-traders-en-argentina"` → adapt to the target language's equivalent region if applicable

### Step 9: Insert Cross-Sell Card (Casinos Only)

After the promotions section (`id="bonos"` or `Promotions & Payments` heading), insert a cross-sell card promoting the casino chosen in Step 1:

```njk
<div class="card bg-base-200 border border-base-300 compact p-4">
  <div class="card-body p-0 flex-row items-center gap-3">
    <span class="text-2xl">🎰</span>
    <p class="text-sm">Looking for more options? Don't miss our <a href="/{tgtLang}/online-casino/{crossell-slug}/" class="link link-primary font-semibold">{crossell-name} review</a> - a top-rated choice with thousands of games and excellent bonuses.</p>
  </div>
</div>
```

The exact text should be translated to the target language (e.g., Czech: "Hledáte další možnosti? Nezmeškejte...").

### Step 10: Rebuild and Verify

```bash
npm run build
```

Checklist:

- [ ] Translated page renders at `_site/{tgtLang}/{entity_section}/{slug}/index.html`
- [ ] Internal links point to correct target language URLs
- [ ] No broken `locale_url` errors
- [ ] Badge colors match `details.*` values
- [ ] Cross-sell card renders correctly (casinos only)
- [ ] Currency values are converted and formatted properly
- [ ] `aiOverview` is present if source had it
- [ ] No Eleventy build errors

## Reputation Code Reference

Each entity file has a `reputation.code` field that controls the badge displayed:

| Code | Badge Color | ES Label | PT-BR Label | EN Label | CS Label |
|------|-------------|----------|-------------|----------|----------|
| `fair` | Green (btn-success) | Justo | Justo | Fair | Spravedlivé |
| `acceptable` | Blue (btn-info) | Aceptable | Aceitável | Acceptable | Přijatelné |
| `caution` | Yellow (btn-warning) | Precaución | Cuidado | Caution | Opatrnost |
| `dangerous` | Red (btn-danger) | Peligroso | Perigoso | Dangerous | Nebezpečné |

The `reputation.code` field in frontmatter is always kept unchanged during translation. The `reputation.text` field is the full description that gets translated.

## Reference: Entity File Locations

| Language | Casinos | Forex | Binaries |
|----------|---------|-------|----------|
| `es` | `content/es/casinos/{slug}.njk` | `content/es/forex/{slug}.njk` | `content/es/binaries/{slug}.njk` |
| `en` | `content/en/casinos/{slug}.njk` | `content/en/forex/{slug}.njk` | `content/en/binaries/{slug}.njk` |
| `pt-br` | `content/pt-br/casinos/{slug}.njk` | `content/pt-br/forex/{slug}.njk` | `content/pt-br/binaries/{slug}.njk` |
| `cs` | `content/cs/casinos/{slug}.njk` | `content/cs/forex/{slug}.njk` | `content/cs/binaries/{slug}.njk` |

## Reference: URL Path Segments by Language

| Purpose | ES | EN | PT-BR | CS |
|---------|----|----|-------|----|
| Casino detail | `casino/` | `online-casino/` | `cassino/` | `online-kasino/` |
| Casino listing | `casinos/` | `online-casinos/` | `cassinos/` | `online-kasina/` |
| Game detail | `juego/` | `game/` | `jogo/` | not done yet |
| Game listing | `juegos/` | `games/` | `jogos/` | not done yet |
| Provider detail | `proveedor/` | `game-provider/` | `fornecedor/` | not done yet |
| Provider listing | `proveedores/` | `providers/` | `fornecedores/` | not done yet |
| Blog post | `blog/` | `articles/` | `colunas/` | `clanky/` |
| Blog listing | `blog/` | `articles/` | `colunas/` | `clanky/` |
| Binary listing | `opciones-binarias/` | `binary-options/` | `opcoes-binarias/` | `binarni-opce/` |
| Forex | `forex/` | `forex/` | `forex/` | `forex/` |

## Notes

- URL slugs in `_site/` may differ from source filenames (Eleventy generates them via `slugify`)
- Always build first (`npm run build`) to get accurate `_site/` URLs
- The `slugOverride` field is the authoritative slug — never change it during translation
- When the source file has `aiOverview` but the target file won't be an AI review (unlikely), keep it anyway for consistency
- The `youtube` field in binary files is optional — if no language-specific video exists, keep the original
- Cross-sell cards for casinos should always link to a real casino review that exists in the target language
