const metadata = require("../metadata.js");

module.exports = {
  footerNav: {
    blog: {
      name: "Blog",
      slug: "/blog/",
    },
    games: {
      name: "Juegos",
      slug: "/juegos/",
    },
  },
  dir: "",
  menu: {
    name: "Español",
    flagClass: "flag-icon-es",
    flagSvg: "/assets/imgs/flags/svg/ar.svg",
  },
  top: {
    text: "Agregar un sitio",
    url: "https://forms.gle/vMpnv4cFgccHYNp56",
  },
  promo: {
    url: "https://mu.fastmui.com/redirect.aspx?pid=101348&bid=2036&lpid=502",
    cta: "👉 ¿100 GIROS GRATIS? AHORA!",
    image: metadata.images.banners + "national-es-1176x264.png",
    carrouselBonus: {
      image: "/assets/imgs/site/bonus-bg-2-es.png",
      url: "https://url.hk/i/en/exptf",
      cta: "Regístrate y obten $5 grátis",
    },
    casino: {
      logo: "/assets/imgs/casinos/1xbet-logo.webp",
      name: "1xBet",
      title: "100% BONO DE BIENVENIDA HASTA €100 🤯 EN 1XBET!",
      cta: "¡RECLAMA TU BONO EN 1XBET!",
      url: "https://reffpa.com/L?tag=d_5827615m_97c_&site=5827615&ad=97",
    },
    casino2: {
      logo: "/assets/imgs/casinos/national-argentina-logo.webp",
      name: "National",
      title: "HASTA 100 GIROS GRÁTIS 🤯 ¡En National!",
      cta: "¡RECLAMA TUS 100 GIROS GRATIS 🤯 ¡En National!",
      url: "https://media.toxtren.com/redirect.aspx?pid=101348&bid=2036&redirectURL=https://natregs.com",
    },
    external_250x250: metadata.images.banners + "banner_20bet_300x300.webp",
  },
  categories: {
    slot: { name: "Tragamonedas", url: "/juegos/tragamonedas/" },
    bingo: { name: "Bingo", url: "/juegos/video-bingo/" },
    roulette: { name: "Ruleta", url: "/juegos/ruleta/" },
    blackjack: { name: "Blackjack", url: "/juegos/blackjack/" },
    instant: {
      name: "Premios instantáneos",
      url: "/juegos/premios-instantaneos/",
    },
    baccarat: { name: "Baccarat", url: "/juegos/baccarat/" },
    poker: { name: "Video poker", url: "/juegos/video-poker/" },
  },
  texts: {
    nostrLoginFailed: "El login con Nostr falló. Asegurate de tener un signer.",
    loginTimeout: "Login cancelado o tiempo de espera agotado",
    googleLoginFailed: "El login con Google falló",
    invalidNsec: "Clave nsec inválida",
    poweredBy: "Con tecnología",
    karmaEarnRedirecting: "Redireccionado...",
    karmaPoints: "puntos de karma",
    youEarned: "Ganaste",
    cooldownTime: "Tiempo de espera",
    karmaEarned: "¡Felicitaciones! Ganaste karma",
    karmaEarnCooldown:
      "Debes esperar para volver a ganar karma por esta visita",
    karmaEarnError: "Error al acumular karma",
    earningKarma: "Acumulando karma...",
    latestCommits: "Últimos commits de código",
    viewOnGitHub: "Ver en Github",
    or: "ó",
    close: "Cerrar",
    go: "Ir",
    bad: "Malo",
    average: "Medio",
    good: "Bueno",
    positive: "Positivo",
    readMore: "Ver más",
    readLess: "Ver menos",
    slot: "Tragamonedas",
    loadMore: "Cargar mas",
    viewAllCasinos: "Ver todos los casinos",
    overallSentiment: "Sentimiento general",
    aiOverview: "Resumen de IA",
    back: "Volver",
    backToList: "Volver a la lista",
    changeBanner: "Cambiar banner",
    earn: "Gane",
    points: "karma",
    vote: "Votar",
    votes: "votos",
    howWorks: "¿Cómo funciona?",

    orderNewer: "Nuevos",
    orderMostVoted: "Mas votados",
    orderAlphabetical: "Alfabético",
    orderLicensed: "Licenciados",
    orderBlacklisted: "Lista negra",
    orderShutdown: "Cerrados",

    gamesBy: "Juegos de",
    benefits: "Beneficios",
    search: "Buscar...",
    noItemToList: "Ningún item para listar.",
    spreadKarma: "¡Vamos a esparcir karma! 🤪",
    login: "Acceder",
    loginWithNostr: "Acceder con Nostr",
    loginWithEmail: "Enviar código de acceso",
    logout: "Salir",
    news: "Noticias",
    quickInfo: "Quick Info",
    founded: "Fundado",
    headquarters: "Sede",
    officialSite: "Sitio oficial",
    welcome: "¡Bienvenido!",
    logoutMessage: "¡Adieeeu!",
    supporters: "Patrocinadores",
    reputationText: "Reputación",
    reputation: {
      fair: "Justo",
      acceptable: "Aceptable",
      caution: "Precaución",
      dangerous: "Peligroso",
    },
    tagline:
      "El primer sitio de listados de Casino, Binarias y Forex con los incentivos correctos",
    tagline2: "karma, mérito y proof-of-work",
    tagline3:
      "Transparencia extrema para usuarios, operadores y reguladores ;)",
    taglineHome:
      "¡Esparcí karma votando sitios, subí en la tabla de líderes y accedé a beneficios exclusivos!",
    karma: {
      title: "¡Tu karma!",
      content: `
        <p>
          <strong>¿Qué es el karma?</strong> Karma es lo que mueve los rankings (¡y la vida!) Úsalo para votar e incidir en los rankings de sitios de casino, forex y opciones binarias, de forma que sólo las mejores marcas suban al top de los rankings, y solo los mejores usarios al Leaderboard. 
        </p>
        <br />
        <p>
          <strong>¿Cómo ganar karma?</strong> Todos los días por acceder al sitio y visitar las marcas que vamos listando (botón "Visitar sitio"). Además gánalo comentando sobre tus experiencias con las marcas, también cuando otros usuários votan tus comentarios, consiguiendo seguidores o simplemente comprándolo con criptomonedas.
        </p>
        <br />
        <p>
          <strong>¿Cómo usar tu karma?</strong> El karma se utiliza accediendo a los listados de las marcas y haciendo click en las opciones 👍 ó 🖕. Cada voto aumenta o disminuye el karma de una marca en 21 puntos.
          Todos los votos son auditables y quedan registrado en el histórico de la marca (en el futuro en la blockchain). <strong>Con cada karma utilizado ganas 👑 Puntos de Liderazgo</strong>.
        </p>
        <div class="divider my-5"></div>
        <p>
          <strong>¿Eres una marca?</strong> Usa los puntos de karma para impulsar tu marca en las clasificaciones.
        </p>          
      `,
    },

    levels: {
      title: "Tu liderazgo",
      content: `
        <div class="pb-3 mb-2 border-b border-gray-100 dark:border-gray-600">
          <button class="btn btn-logout">Salir</button>
        </div>
        <p>
          <strong>¿Cómo ganar nivel?</strong> Ganas nivel cada vez que utilizas tu karma compartiendo tu experiencia sobre las marcas, votando, reseñando nuevos sitios y en general beneficiando a la comunidad.
        </p>
        <br />
        <p>
          <strong>¿Para qué ganar nivel?</strong> Como premio por haber beneficiado a la comunidad con sus acciones y karma, los usuários con mayor nivel en el leaderboard tienen acceso a bonos exclusivos VIP, giros gratuitos (sólo para líderes) y mayor influencia en la comunidad (sus comentário aparecen primeros, pueden promocionar sus propios sitios, redes y streamings, etc). 
        </p>  
        <div class="divider my-5"></div>
        <p>
          <strong>Accede a la lista completa de beneficios en la página "Nosotros".</strong>
        </p>                            
      `,
    },

    votingFailed: "¡El voto falló! Karma insuficiente?",
    votingSuccess:
      "¡Gracias por votar! Los listados se actualizan una vez al día.",
    heartVoteLabel: "Dar karma",
    heartVotedLabel: "¡Karma regalado!",
    heartVoteAgainLabel: "¡Dar karma otra vez!",

    featured: "Destacado",
    visit: "Visitar",
    visitCasino: "Visitar casino",
    visitSite: "Visitar&nbsp;sitio",
    leaveOpinion: "Dejar opinión",
    detailsText: "Detalles",
    bonus: "Bono",
    tryBonus: "Reclame este bono",
    freePlay: "Jugar&nbsp;gratis",
    realPlay: "Jugar&nbsp;de&nbsp;verdad",
    addCasino: "Agregar casino",
    slogan: {
      firstLine: "Transparencia extrema en Apuestas En Línea 🧘‍♂️",
      secondLine:
        "¡Nuevas plataformas con sus bonos sin depósito, juegos con acumulados y programas de afiliados!",
    },
    protectingPlayersSince:
      "Protegiendo a los jugadores con tecnología transparente desde 2018",
    searchBrands: "Buscar todas las marcas...",
    searchNoResults: "Ninguna marca coincide con tu búsqueda",
    latestGames: "Los últimos juegos",
    latestGamesTeaser:
      "¡Los últimos slots, bingos y juegos de mesa lanzados al mercado!",
    featuredProviders: "Proveedores destacados",
    featuredProvidersText:
      "Explora los mejores creadores juegos de tragamonedas, bingo y plinko",
    seeAll: "Ver todos",
    createdBy: "Creado por",
    home: "Inicio",
    games: "Juegos",
    promotionsAndPayments: "Promociones y pagos",
    customerSupport: "Atención al cliente",
    designAndUsability: "Diseño y usabilidad",
    affiliateProgram: "Programa de afiliados",
    license: "Licencias",
    casinos: "Casinos",
    bonuses: "Bonos",
    aboutUs: "F.A.Q",
    glossary: "Glosario",
    providers: "Proveedores",
    provider: "Proveedor",
    affiliates: "Afiliados",
    others: "Otros",
    transparency: "Transparencia",
    rankings: "Rankings",
    ranking: "Ranking",
    leaderboardRank: "Puesto",
    leaderboardUser: "Usuario",
    leaderboardKarma: "Karma",
    leaderboard: "Leaderboard",
    volatility: "Volatilidad",
    minMaxBets: "Min/Max Bets",
    maxWin: "Ganancia max.",
    paylines: "Líneas de pago",
    hands: "Manos",
    type: "Tipo",
    maxWithdrawal: "Retiro máximo",
    minDeposit: "Depósito mínimo",
    minWithdrawal: "Retiro mínimo",
    category: "Categoría",
    since: "Desde",
    launch: "Lanzamiento",
    details: {
      prizes: "Premios, RTP y volatilidad",
      functions: "Funciones y mecánica",
      theme: "Temática y diseño",
    },
    otherFreeGamesBy: "Otros juegos gratuitos de",
    moreAbout: "Más sobre",
    reputationDetails: "Detalles de la reputación",
    operatedBy: "Operado por",
    reviewOf: "Reseña de",
    rateOnInstagram: "¡Comente en Instagram!",
    questions: "¿Preguntas?",
    contactUs: "Contáctenos",
    founded: "Fundado",
    cookiesMessage:
      "Utilizamos cookies para mejorar su experiencia en Betizen, al continuar utilizando este sitio web, acepta dicho uso como se describe en nuestra pol\u00edtica de cookies.",
    accept: "Aceptar",
    code: "Código",
    bonusDetailsTitle: "Detalle de las condiciones del bono",
    binaryRegulation: "Regulación y Seguridad",
    binaryPlatform: "Plataforma de Negociación",
    binaryAssets: "Activos Disponibles",
    binaryFees: "Tasas y Comisiones",
    binaryPayments: "Depósitos y Retiros",
    binaryDemo: "Cuenta Demo",
    binarySupport: "Soporte al Cliente",
    binaryEducation: "Recursos Educativos",
    blacklistReason:
      "Aconsejamos encarecidamente no jugar en este casino debido a quejas no resueltas, malas prácticas u otros problemas graves.",
    supportersText:
      "Nada sustituye al poder del conocimiento colectivo, del mercado decidiendo. Mejoremos el juego online. ¡Patrocinanos y aparecerás en las primeras posiciones de los listados! ",
    becomeSponsor: "Sea patrocinador",
    soon: "En breve...",
    selectLanguage: "Selecciona un idioma",
    viewGames: "Ver juegos",
    forexRegulation: "Regulación y Seguridad",
    forexPlatforms: "Plataformas de Negociación",
    forexSpreads: "Spreads y Comisiones",
    forexAccounts: "Tipos de Cuenta",
    forexInstruments: "Pares de Divisas e Instrumentos",
    forexLeverage: "Apalancamiento y Margen",
    forexPayments: "Depósitos y Retiros",
    forexResearch: "Investigación y Análisis",
    forexDemo: "Cuenta Demo",
    forexSupport: "Soporte al Cliente",
    forexEducation: "Recursos Educativos",

    writeComment: "Escriba su comentario...",
    commentPublished: "Comentario publicado con éxito",
    comments: "Comentarios",
    noComments: "Todavía no hay comentarios. ¡Sé el primero y gana karma!",
    commentsError: "No se pudieron cargar los comentarios.",
  },
};
