const metadata = require("../metadata.js");

module.exports = {
  footerNav: {
    blog: {
      name: "Blog",
      slug: "/cs/clanky/",
    },
    games: {
      name: "Hry",
      slug: "/cs/hry/",
    },
  },
  menu: {
    name: "Čeština",
    flagClass: "flag-icon-cz",
    flagSvg: "/assets/imgs/flags/svg/cz.svg",
  },
  top: {
    text: "Přidat web",
    url: "https://forms.gle/vMpnv4cFgccHYNp56",
  },
  promo: {
    url: "https://mu.fastmui.com/redirect.aspx?pid=101348&bid=2036&lpid=502",
    cta: "👉 NÁROKOVAT 100 ZATOČENÍ ZDARMA?",
    image: metadata.images.banners + "national-en-1176x264.png",
    carrouselBonus: {
      image: "/assets/imgs/site/bonus-bg-2-en.png",
      url: "https://url.hk/i/en/exptf",
      cta: "Zaregistrujte se a získejte $5 zdarma",
    },
    casino: {
      logo: "/assets/imgs/casinos/1xbet-logo.webp",
      name: "1xBet",
      title: "100% VÍTACÍ BONUS AŽ €100 🤯 V 1XBET!",
      cta: "ZÍSKEJTE SVŮJ BONUS V 1XBET!",
      url: "https://reffpa.com/L?tag=d_5827615m_97c_&site=5827615&ad=97",
    },
    casino2: {
      logo: "/assets/imgs/casinos/national-argentina-logo.webp",
      name: "National",
      title: "AŽ 100 ZATOČENÍ ZDARMA 🤯 V NATIONAL!",
      cta: "AŽ 100 ZATOČENÍ ZDARMA 🤯 V NATIONAL!",
      url: "https://media.toxtren.com/redirect.aspx?pid=101348&bid=2036&redirectURL=https://natregs.com",
    },
    external_250x250: metadata.images.banners + "coinsgame-300x300.png",
  },
  categories: {
    slot: { name: "Online automaty", url: "/cs/hry/online-automaty/" },
    bingo: { name: "Online bingo", url: "/cs/hry/online-bingo/" },
    roulette: { name: "Ruleta", url: "/cs/hry/ruleta/" },
    blackjack: { name: "Blackjack", url: "/cs/hry/blackjack/" },
    instant: { name: "Okamžité výhry", url: "/cs/hry/okamzite-vyhry/" },
    baccarat: { name: "Baccarat", url: "/cs/hry/baccarat/" },
    poker: { name: "Video poker", url: "/cs/hry/video-poker/" },
  },
  texts: {
    nostrLoginFailed:
      "Přihlášení přes Nostr selhalo. Ujistěte se, že máte signer.",
    poweredBy: "Poháněno",
    karmaEarnRedirecting: "Přesměrování...",
    karmaPoints: "karma bodů",
    youEarned: "Získali jste",
    cooldownTime: "Časový limit",
    karmaEarned: "Gratulujeme! Získali jste karmu",
    karmaEarnCooldown:
      "Musíte počkat, než budete moci znovu získat karmu za tuto návštěvu",
    karmaEarnError: "Chyba při získávání karmy",
    earningKarma: "Získávání karmy...",
    latestCommits: "Nejnovější commity kódu",
    viewOnGitHub: "Zobrazit na GitHubu",
    or: "nebo",
    close: "Zavřít",
    bad: "Špatné",
    average: "Průměrné",
    good: "Dobré",
    positive: "Pozitivní",
    readMore: "Číst více",
    readLess: "Číst méně",
    slot: "Automaty",
    loadMore: "Načíst více",
    viewAllCasinos: "Zobrazit všechna kasina",
    overallSentiment: "Celkový dojem",
    aiOverview: "AI Přehled",
    back: "Zpět",
    backToList: "Zpět na seznam",
    changeBanner: "Změnit banner",
    earn: "Získejte",
    points: "karma",
    vote: "Hlasovat",
    votes: "hlasů",
    howWorks: "Jak to funguje?",

    orderNewer: "Nejnovější",
    orderMostVoted: "Nejvíce hlasované",
    orderAlphabetical: "Abecedně",
    orderLicensed: "Licencované",
    orderBlacklisted: "Černá listina",
    orderShutdown: "Uzavřené",

    gamesBy: "Hry od",
    benefits: "Výhody",
    search: "Hledat...",
    noItemToList: "Žádné položky k zobrazení.",
    spreadKarma: "Rozšiřujme karmu! 🤪",
    login: "Vstup",
    loginWithNostr: "Přihlásit se přes Nostr (NIP-07)",
    loginWithEmail: "Odeslat přihlašovací kód",
    logout: "Odhlásit se",
    news: "Novinky",
    quickInfo: "Rychlé info",
    founded: "Založeno",
    headquarters: "Sídlo",
    officialSite: "Oficiální stránky",
    welcome: "Vítejte!",
    logoutMessage: "Nashledanou!",
    supporters: "Podporovatelé",
    reputationText: "Reputace",
    reputation: {
      fair: "Spravedlivé",
      acceptable: "Přijatelné",
      caution: "Opatrnost",
      dangerous: "Nebezpečné",
    },
    tagline:
      "První web s listingy kasin, binárních opcí a Forex s těmi správnými pobídkami",
    tagline2: "karma, zásluhy a proof-of-work",
    tagline3:
      "Extrémní transparentnost pro uživatele, provozovatele a regulátory ;)",
    taglineHome:
      "Šiřte karmu hlasováním o stránkách, stoupejte v žebříčku lídrů a získejte přístup k exkluzivním výhodám!",
    karma: {
      title: "Vaše karma!",
      content: `
        <p><strong>Co je karma?</strong> Karma je to, co pohání žebříčky (a život!). Použijte ji k hlasování a ovlivňování pořadí značek kasin, forexu a binárních opcí, takže jen ty nejlepší se dostanou na vrchol a jen ti nejlepší uživatelé se dostanou do Leaderboardu.</p>
        <br />
        <p>
        <strong>Jak získat karmu?</strong> Každý den, stačí navštívit stránky a značky, které uvádíme (pomocí tlačítka "Navštívit stránky"). Můžete ji také získat komentováním svých zkušeností se značkami, když ostatní uživatelé hlasují pro vaše komentáře, získáváním sledujících nebo jednoduše jejím nákupem pomocí kryptoměn.
        </p>
        <br />
        <p>
          <strong>Jak použít karmu?</strong> Karma se používá přechodem na listingy značek a kliknutím na možnosti 👍 nebo 🖕. Každý hlas zvyšuje nebo snižuje karmu značky o 21 bodů.
          Všechny hlasy jsou auditovatelné a jsou zaznamenány v historii značky.
          <strong>S každou použitou karmou získáváte 👑 Body vedení</strong>
        </p>
        <div class="divider my-5"></div>
        <p>
          <strong>Jste značka?</strong> Použijte body karmy k posílení své značky v žebříčcích.
        </p>          
      `,
    },
    levels: {
      title: "Vaše vedení",
      content: `
        <div class="pb-3 mb-2 border-b border-gray-100 dark:border-gray-600">
          <button class="btn btn-logout">Odhlásit se</button>
        </div>        
        <p>
          <strong>Jak získat úroveň?</strong> Získáváte úroveň pokaždé, když použijete svou karmu sdílením svých zkušeností se značkami, hlasováním, hodnocením nových stránek a obecně prospíváním komunitě.
        </p>
        <br />
        <p>
          <strong>Proč získávat úroveň?</strong> Jako odměnu za prospívání komunitě svými akcemi a karmou získávají uživatelé s vyšší úrovní v leaderboardu přístup k exkluzivním VIP bonusům, free spinům (pouze pro lídry) a většímu vlivu v komunitě (jejich komentáře se zobrazují jako první, mohou propagovat své vlastní stránky, sítě a streamy atd.).
        </p>  
        <div class="divider my-5"></div>
        <p>
          <strong>Přístup k úplnému seznamu výhod na stránce "O nás".</strong>
        </p>                            
      `,
    },
    featured: "Doporučené",
    votingFailed: "Hlasování selhalo! Nedostatek karmy?",
    votingSuccess: "Děkujeme za hlasování! Listy se aktualizují jednou denně.",
    heartVoteLabel: "Darovat karmu",
    heartVotedLabel: "Karma darována!",
    heartVoteAgainLabel: "Darovat karmu znovu!",

    visit: "Navštívit",
    visitCasino: "Navštívit kasino",
    visitSite: "Navštívit&nbsp;stránky",
    leaveOpinion: "Zanechat názor",
    detailsText: "Podrobnosti",
    bonus: "Bonus",
    tryBonus: "Získat tento bonus",
    freePlay: "Hrát&nbsp;zdarma",
    realPlay: "Hrát&nbsp;v&nbsp;kasinu",
    addCasino: "Přidat kasino",
    slogan: {
      firstLine: "Extrémní transparentnost v online sázení 🧘‍♂️",
      secondLine:
        "Nové platformy s bonusy bez vkladu, jackpotovými hrami a affiliates programy!",
    },
    protectingPlayersSince:
      "Chráníme hráče transparentní technologií od roku 2018",
    searchBrands: "Hledat všechny značky...",
    searchNoResults: "Žádné značky neodpovídají vašemu vyhledávání",
    latestGames: "Nejnovější hry",
    latestGamesTeaser: "Nejnovější sloty, binga a stolní hry uvedené na trh!",
    featuredProviders: "Doporučení poskytovatelé",
    featuredProvidersText:
      "Prozkoumejte nejlepší tvůrce slotů, binga a plinko her",
    seeAll: "Zobrazit vše",
    createdBy: "Vytvořeno",
    home: "Domů",
    games: "Hry",
    promotionsAndPayments: "Promoakce a platby",
    customerSupport: "Zákaznická podpora",
    designAndUsability: "Design a použitelnost",
    affiliateProgram: "Affiliate program",
    license: "Licence",
    casinos: "Kasina",
    bonuses: "Bonusy",
    aboutUs: "F.A.Q",
    glossary: "Slovník",
    providers: "Poskytovatelé",
    provider: "Poskytovatel",
    affiliates: "Affiliates",
    others: "Ostatní",
    transparency: "Transparentnost",
    rankings: "Žebříčky",
    ranking: "Žebříček",
    leaderboardRank: "Pořadí",
    leaderboardUser: "Uživatel",
    leaderboardKarma: "Karma",
    leaderboard: "Žebříčku",
    volatility: "Volatilita",
    minMaxBets: "Min/Max sázky",
    maxWin: "Max. výhra",
    paylines: "Výherní linie",
    hands: "Ruce",
    type: "Typ",
    maxWithdrawal: "Max. výběr",
    minDeposit: "Min. vklad",
    minWithdrawal: "Min. výběr",
    category: "Kategorie",
    launch: "Spuštění",
    since: "Od",
    details: {
      prizes: "Ceny, RTP a volatilita",
      functions: "Funkce a mechanika",
      theme: "Téma a design",
    },
    otherFreeGamesBy: "Další bezplatné hry od",
    moreAbout: "Více o",
    reputationDetails: "Podrobnosti o reputaci",
    operatedBy: "Provozováno",
    reviewOf: "Recenze",
    rateOnInstagram: "Hodnotit na Instagramu!",
    questions: "Otázky?",
    contactUs: "Kontaktujte nás",
    founded: "Založeno",
    cookiesMessage:
      "Používáme cookies pro zlepšení vašeho zážitku na Betizen. Pokračováním v používání tohoto webu souhlasíte s jejich používáním podle našich zásad cookies.",
    accept: "Přijmout",
    code: "Kód",
    bonusDetailsTitle: "Podrobnosti o podmínkách bonusu",
    binaryRegulation: "Regulace a bezpečnost",
    binaryPlatform: "Obchodní platforma",
    binaryAssets: "Dostupná aktiva",
    binaryFees: "Poplatky a provize",
    binaryPayments: "Vklady a výběry",
    binaryDemo: "Demo účet",
    binarySupport: "Zákaznická podpora",
    binaryEducation: "Vzdělávací zdroje",
    blacklistReason:
      "Důrazně doporučujeme nehrát v tomto kasinu kvůli nevyřešeným stížnostem, špatným praktikám nebo jiným vážným problémům.",
    supportersText:
      "Nic nenahrazuje sílu kolektivního poznání, rozhodování trhu. Pojďme zlepšit online hraní. Sponzorujte nás a objevíte se na předních pozicích v listinzích!",
    becomeSponsor: "Staňte se sponzorem",
    soon: "Již brzy...",
    selectLanguage: "Vyberte jazyk",
    viewGames: "Zobrazit hry",

    forexRegulation: "Regulace a bezpečnost",
    forexPlatforms: "Obchodní platformy",
    forexSpreads: "Spready a provize",
    forexAccounts: "Typy účtů",
    forexInstruments: "Měnové páry a nástroje",
    forexLeverage: "Páka a marže",
    forexPayments: "Vklady a výběry",
    forexResearch: "Výzkum a analýza",
    forexDemo: "Demo účet",
    forexSupport: "Zákaznická podpora",
    forexEducation: "Vzdělávací zdroje",

    writeComment: "Napište svůj komentář...",
    commentPublished: "Komentář úspěšně publikován",
    comments: "Komentáře",
    noComments: "Zatím žádné komentáře. Buďte první a získejte karmu!",
    commentsError: "Nepodařilo se načíst komentáře.",
  },
};
