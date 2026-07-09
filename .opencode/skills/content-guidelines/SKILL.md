# Skill: Content Guidelines

Project-local guidelines for creating and editing casino content in the Betizen SSG.

## Multi-Language Support

The site supports 3 languages (ES, EN, PT-BR) with **Czech (cs)** being added soon. All content files must exist for every supported language:

- `content/es/casinos/<slug>.njk`
- `content/en/casinos/<slug>.njk`
- `content/pt-br/casinos/<slug>.njk`
- `content/cs/casinos/<slug>.njk` (new)

When adding a new language, create the full directory structure matching existing patterns.

## Currency Conversion

When a casino has deposit/withdrawal values in USD/EUR and the target language uses a different currency (e.g. PT-BR → BRL, CS → CZK):

1. Look up the current exchange rate for the day
2. Convert the exact value
3. Use locale-appropriate formatting (R$ for BRL, Kč for CZK, etc.)

Example: `minDeposit: "$10"` → `minDeposit: "R$ 52"` at 5.17 USD/BRL

## Frontmatter Structure

```yaml
---
date: "YYYY-MM-DDTHH:MM:SS+00:00"
crypto: true/false
slugOverride: <custom-slug>       # Optional, override auto-slug
title: "<Casino Name>"
description: "<Meta description>"
excerpt: "<Short summary>"
operator: "<Company Name>"
gradient:
    start: "#hex"
    end: "#hex"
bonus:
    link: "<affiliate-url or /lang/casino/slug/>"
details:
    games: "excellent|very good|good|average|bad"
    promotions: "excellent|very good|good|average|bad"
    customerSupport: "excellent|very good|good|average|bad"
    design: "excellent|very good|good|average|bad"
    license: "good|average|bad"
    affiliateProgram: "good|average|bad"  # optional
maxWidthdrawal: "<amount>"
minDeposit: "<amount>"
minWidthdrawal: "<amount>"
license: "<Regulator>"
reputation:
    code: "fair|acceptable|caution|dangerous"
    text: "<Detailed reputation description>"
featured: true/false              # optional
blacklisted: true/false            # optional
ranking: <number>
score: <number>
---
```

## Reputation Codes

| Code | Meaning | When to Use |
|------|---------|-------------|
| `fair` | Trusted, well-regulated, positive reviews | Casinos with good standing, proper licensing, transparent operations |
| `acceptable` | Mostly good but minor concerns | Casinos with some issues but actively improving |
| `caution` | Notable risks or complaints | Casinos with unresolved complaints or questionable practices |
| `dangerous` | Serious issues, blacklisted | Casinos with fraud, unpaid winnings, unlicensed games |

## Blacklisted Field

- `blacklisted: true` hides the "Visit Site" button, shows a red warning banner, and adds the casino to the blacklist collection
- Only use for casinos with serious unresolved complaints

## Featured Field

- `featured: true` adds the casino to the `featuredCasinos` collection
- Does NOT affect listing sort order (sort is by `score` only)
- Currently only CasinoStars uses this flag

## Score Guidelines

- Scores range from 0-10
- The highest score currently is 10 (1xBet — manually set)
- Scores must reflect the honest review tone
- The `sortByOrder` filter sorts descending by score

## Affiliate Link Convention

- `bonus.link` is used for "Visit Site" buttons and bonus CTAs
- Can be an internal link (`/casino/1xbet/`) or an external affiliate URL
- If not set, falls back to `languages[page.lang].promo.url`

## Body Content Structure

The body HTML after frontmatter must follow a strict structure with `<h2>` heading IDs that match the anchor links in `_includes/components/casinos/casino-details.njk`.

### Required Sections (in order)

Each section uses the following pattern:

```html
<br>
<h2 id="juegos" class="contentIndexTitle">Section Title&nbsp;<span class="badge badge-{color} badge-pill">&#10003; Label</span></h2>
<h3 class="contentIndexSubTitle">Subtitle description</h3>
<p>Content paragraphs...</p>
```

### Section ID-to-Field Mapping

| Section | `<h2 id="">` | `details` field |
|---------|-------------|-----------------|
| Games & Slots | `juegos` | `details.games` |
| Promotions & Payments | `bonos` | `details.promotions` |
| Customer Support | `atencion-al-cliente` | `details.customerSupport` |
| Design & Usability | `usabilidad` | `details.design` |
| Licenses | `licenses` | `details.license` |
| Affiliate Program | `affiliateprogram` | `details.affiliateProgram` |

### Badge Values by Language

The badge label and color are rendered by `fieldScore(details.<field>)` based on the English value from frontmatter:

| frontmatter value | Badge color | EN label | ES label | PT-BR label |
|------------------|-------------|----------|----------|-------------|
| `"excellent"` | success | Excellent | Excelente | Excelente |
| `"very good"` | success | Very Good | Muy Bueno | Muito Bom |
| `"good"` | success | Good | Bueno | Bom |
| `"average"` | warning | Average | Medio | Médio |
| `"bad"` | error | Bad | Malo | Ruim |

### License Section

The `details.license` field accepts only: `"good"`, `"average"`, `"bad"`.

### Optional Sections

`details.affiliateProgram` is optional. If present, the Affiliate Program section must be included.

### Example (from `bodog-casino.njk`)

```html
<br>
<h2 id="juegos" class="contentIndexTitle">Juegos en el casino Bodog&nbsp;<span class="badge badge-success badge-pill">&#10003; Bueno</span></h2>
<h3 class="contentIndexSubTitle">Bodog cuenta con los juegos y tragamonedas de algunos de los estudios de creación mas populares...</h3>
<p>Content...</p>

<h2 id="bonos" class="contentIndexTitle">Promociones y pagos&nbsp;<span class="badge badge-success badge-pill">&#10003; Bueno</span></h2>
<h3 class="contentIndexSubTitle">Bodog cuenta con una promoción de bienvenida...</h3>
<p>Content...</p>

<h2 id="atencion-al-cliente" class="contentIndexTitle">Atención al cliente&nbsp;<span class="badge badge-success badge-pill">&#10003; Bueno</span></h2>
<h3 class="contentIndexSubTitle">Bodog nos ofrece dos opciones...</h3>
<p>Content...</p>

<h2 id="usabilidad" class="contentIndexTitle">Diseño y usabilidad&nbsp;<span class="badge badge-success badge-pill">&#10003; Bueno</span></h2>
<h3 class="contentIndexSubTitle">Si ser deslumbrante, el casino Bodog presenta un diseño...</h3>
<p>Content...</p>

<h2 id="licenses" class="contentIndexTitle">Licencias&nbsp;<span class="badge badge-warning badge-pill font-weight-bold">∼ Medio</span></h2>
<h3 class="contentIndexSubTitle">Para América Latina el casino Bodog es operado por la empresa Connaught Media BV...</h3>
<p>Content...</p>

<h2 id="affiliateprogram" class="contentIndexTitle">Programa de Afiliados&nbsp;<span class="badge badge-success badge-pill">&#10003; Bueno</span></h2>
<h3 class="contentIndexSubTitle">El programa de afiliados de Bodog opera bajo la red Revenue Network Affiliates...</h3>
```
