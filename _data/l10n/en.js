const metadata = require("../metadata.js");

module.exports = {
  footerNav: {
    blog: {
      name: "Blog",
      slug: "/en/articles/",
    },
    games: {
      name: "Games",
      slug: "/en/games/",
    },
  },
  menu: {
    name: "English",
    flagClass: "flag-icon-gb",
    flagSvg: "/assets/imgs/flags/svg/un.svg",
  },
  top: {
    text: "Get listed",
    url: "https://forms.gle/vMpnv4cFgccHYNp56",
  },
  promo: {
    url: "https://mu.fastmui.com/redirect.aspx?pid=101348&bid=2036&lpid=502",
    cta: "👉 CLAIM 100 FREE SPINS?",
    image: metadata.images.banners + "national-en-1176x264.png",
    carrouselBonus: {
      image: "/assets/imgs/site/bonus-bg-2-en.png",
      url: "https://url.hk/i/en/exptf",
      cta: "Register and get $5 free",
    },
    casino: {
      logo: "/assets/imgs/casinos/1xbet-logo.webp",
      name: "1xBet",
      title: "100% WELCOME BONUS UP TO €100 🤯 AT 1XBET!",
      cta: "CLAIM YOUR BONUS AT 1XBET!",
      url: "/casino/1xbet/",
    },
    casino2: {
      logo: "/assets/imgs/casinos/national-argentina-logo.webp",
      name: "National",
      title: "UP TO 100 FREE SPINS 🤯 AT NATIONAL!",
      cta: "UP TO 100 FREE SPINS 🤯 AT NATIONAL!",
      url: "https://media.toxtren.com/redirect.aspx?pid=101348&bid=2036&redirectURL=https://natregs.com",
    },
    external_250x250: metadata.images.banners + "coinsgame-300x300.png",
  },
  categories: {
    slot: { name: "Online Slots", url: "/en/games/free-slots/" },
    bingo: { name: "Online Bingo", url: "/en/games/online-bingo/" },
    roulette: { name: "Roulette", url: "/en/games/online-roulette/" },
  },
  texts: {
    poweredBy: "Powered by",
    karmaEarnRedirecting: "Redirecting...",
    karmaPoints: "karma points",
    youEarned: "You earned",
    cooldownTime: "Cooldown time",
    karmaEarned: "Congratulations! You earned karma",
    karmaEarnCooldown:
      "You must wait before earning karma again for this visit",
    karmaEarnError: "Error earning karma",
    earningKarma: "Earning karma...",
    viewOnGitHub: "View on GitHub",
    latestCommits: "Latest Code Commits",
    or: "or",
    close: "Close",
    bad: "Bad",
    average: "Average",
    good: "Good",
    positive: "Positive",
    readMore: "Read more",
    readLess: "Read less",
    slot: "Slots",
    loadMore: "Load more",
    viewAllCasinos: "View all casinos",
    overallSentiment: "Overall sentiment",
    aiOverview: "AI Overview",
    back: "Go back",
    backToList: "Go back to list",
    changeBanner: "Change banner",
    earn: "Earn",
    points: "karma",
    vote: "Vote",
    howWorks: "How does it work?",

    orderNewer: "Newest",
    orderMostVoted: "Most voted",
    orderAlphabetical: "Alphabetical",
    orderBlacklisted: "Blacklisted",
    orderLicensed: "Licensed",
    orderShutdown: "Shutdown",

    benefits: "Benefits",
    since: "Since",
    gamesBy: "Games by",
    search: "Search...",
    noItemToList: "No items to list.",
    spreadKarma: "Let's spread karma! 🤪",
    login: "Access",
    loginWithNostr: "Log in with Nostr (NIP-07)",
    loginWithEmail: "Send login code",
    logout: "Logout",
    news: "News",
    quickInfo: "Quick info",
    founded: "Founded",
    headquarters: "Headquarters",
    officialSite: "Official Website",
    welcome: "Welcome!",
    logoutMessage: "Adieeeu!",
    supporters: "Supporters",

    reputationText: "Reputation",
    reputation: {
      fair: "Fair",
      acceptable: "Acceptable",
      caution: "Caution",
      dangerous: "Dangerous",
    },
    tagline:
      "The first Casino, Binary & Forex listing site with the right incentives",
    tagline2: "karma, merit & proof-of-work",
    tagline3: "Extreme transparency for users, operators, and regulators ;)",
    karma: {
      title: "Your karma!",
      content: `
        <p><strong>What is karma?</strong> Karma is what drives rankings (and life!) Use it to vote and influence casino, forex, and binary options brands rankings, so only the bests rise to the top and only the best users make it to the Leaderboard.</p>
        <br />
        <p>
        <strong>How to earn karma?</strong> Every day, just by accessing the site and visiting the brands we list (using the "Visit site" button). You can also earn it by commenting on your experiences with brands, when other users vote on your comments, gaining followers, or simply buying it with cryptocurrencies.
        </p>
        <br />
        <p>
          <strong>How to use your karma?</strong> Karma is used by going to brand listings and clicking the 👍 or 🖕 options. Each vote increases or decreases a brand's karma by 21 points.
          All karma votes are auditable and are recorded in the brand's history.
          <strong>With each karma used you earn 👑 Leadership Points</strong>
        </p>
        <div class="divider my-5"></div>
        <p>
          <strong>Are you a brand?</strong> Use karma points to boost your brand in the rankings.
        </p>          
      `,
    },
    levels: {
      title: "Your leadership",
      content: `
        <div class="pb-3 mb-2 border-b border-gray-100 dark:border-gray-600">
          <button class="btn btn-logout">Logout</button>
        </div>        
        <p>
          <strong>How to gain level?</strong> You gain level every time you use your karma by sharing your experiences with brands, voting, reviewing new sites, and generally benefiting the community.
        </p>
        <br />
        <p>
          <strong>Why gain level?</strong> As a reward for benefiting the community with your actions and karma, users with higher levels on the leaderboard get access to exclusive VIP bonuses, free spins (leaders only), and greater influence in the community (their comments appear first, they can promote their own sites, networks, and streams, etc).
        </p>  
        <div class="divider my-5"></div>
        <p>
          <strong>Access the full list of benefits on the "About Us" page.</strong>
        </p>                            
      `,
    },
    featured: "Featured",
    votingFailed: "Voting failed! Insufficient karma?",
    votingSuccess: "Thanks for voting! Listings update once a day.",
    heartVoteLabel: "Give karma",
    heartVotedLabel: "Karma given!",
    heartVoteAgainLabel: "Give karma again!",

    visit: "Visit",
    visitCasino: "Visit casino",
    visitSite: "Visit&nbsp;site",
    leaveOpinion: "Leave opinion",
    detailsText: "Details",
    bonus: "Bonus",
    tryBonus: "Claim this bonus",
    freePlay: "Play&nbsp;for&nbsp;free",
    realPlay: "Play&nbsp;in&nbsp;casino",
    addCasino: "Include casino",
    slogan: {
      firstLine: "Extreme Transparency in Online Betting 🧘‍♂️",
      secondLine:
        "New platforms with their no deposit bonuses, jackpot games and affiliate programs!",
    },
    protectingPlayersSince:
      "Protecting players with transparent technology since 2018",
    searchBrands: "Search all brands...",
    searchNoResults: "No brands match your search",
    latestGames: "Latest Games",
    latestGamesTeaser:
      "The latest slots, bingos and table games launched on the market!",
    featuredProviders: "Featured Providers",
    featuredProvidersText:
      "Explore the best slots, bingo and plinko game creators",
    seeAll: "See All",
    createdBy: "Created by",
    home: "Home",
    games: "Games",
    promotionsAndPayments: "Promotions & Payments",
    customerSupport: "Customer Support",
    designAndUsability: "Design & Usability",
    affiliateProgram: "Affiliate Program",
    license: "Licenses",
    casinos: "Casinos",
    bonuses: "Bonuses",
    aboutUs: "F.A.Q",
    glossary: "Glossary",
    providers: "Providers",
    provider: "Provider",
    affiliates: "Affiliates",
    others: "Others",
    transparency: "Transparency",
    rankings: "Rankings",
    ranking: "Ranking",
    volatility: "Volatility",
    minMaxBets: "Min/Max Bets",
    maxWin: "Max Win",
    paylines: "Paylines",
    hands: "Hands",
    type: "Type",
    maxWithdrawal: "Max withdrawal",
    minDeposit: "Min deposit",
    minWithdrawal: "Min withdrawal",
    category: "Category",
    launch: "Launch",
    details: {
      prizes: "Prizes, RTP and Volatility",
      functions: "Functions and Mechanics",
      theme: "Theme and Design",
    },
    otherFreeGamesBy: "Other free games by",
    moreAbout: "More about",
    reputationDetails: "Reputation Details",
    operatedBy: "Operated by",
    reviewOf: "Review of",
    rateOnInstagram: "Rate on Instagram!",
    questions: "Questions?",
    contactUs: "Get in touch",
    founded: "Founded",
    cookiesMessage:
      "We use cookies to improve your site experience, by continuing to use this website you accept such use as outlined in our cookie policy.",
    accept: "Accept",
    code: "Code",
    bonusDetailsTitle: "Bonus Terms Details",
    binaryRegulation: "Regulation & Security",
    binaryPlatform: "Trading Platform",
    binaryAssets: "Available Assets",
    binaryFees: "Fees & Commissions",
    binaryPayments: "Deposits & Withdrawals",
    binaryDemo: "Demo Account",
    binarySupport: "Customer Support",
    binaryEducation: "Educational Resources",
    blacklistReason:
      "We strongly advise against playing at this casino due to unresolved complaints, poor practices, or other serious issues.",
    supportersText:
      "Nothing replaces the power of collective knowledge, of the market deciding. Let's improve online gaming. Sponsor us and you will appear in the top positions of the listings!",
    becomeSponsor: "Become a sponsor",
    soon: "Soon...",
    selectLanguage: "Select a language",
    viewGames: "View games",

    forexRegulation: "Regulation & Security",
    forexPlatforms: "Trading Platforms",
    forexSpreads: "Spreads & Commissions",
    forexAccounts: "Account Types",
    forexInstruments: "Currency Pairs & Instruments",
    forexLeverage: "Leverage & Margin",
    forexPayments: "Deposits & Withdrawals",
    forexResearch: "Research & Analysis",
    forexDemo: "Demo Account",
    forexSupport: "Customer Support",
    forexEducation: "Educational Resources",

    writeComment: "Write your comment...",
    commentPublished: "Comment published successfully",
    comments: "Comments",
    noComments: "No comments yet. Be the first and earn karma!",
    commentsError: "Could not load comments."
  },
};
