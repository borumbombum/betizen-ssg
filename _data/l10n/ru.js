const metadata = require("../metadata.js");

module.exports = {
  footerNav: {
    blog: {
      name: "Блог",
      slug: "/ru/stati/",
    },
    games: {
      name: "Игры",
      slug: "/ru/igry/",
    },
  },
  menu: {
    name: "Русский",
    flagClass: "flag-icon-ru",
    flagSvg: "/assets/imgs/flags/svg/ru.svg",
  },
  top: {
    text: "Добавить сайт",
    url: "https://forms.gle/vMpnv4cFgccHYNp56",
  },
  promo: {
    url: "https://reffpa.com/L?tag=d_5827615m_97c_&site=5827615&ad=97&r=registration",
    cta: "👉 ЗАБРАТЬ 100 ФРИСПИНОВ?",
    image: metadata.images.banners + "1176x264-1xbet-en.png",
    carrouselBonus: {
      // image: "/assets/imgs/site/bonus-bg-2-en.png",
      image: "/assets/imgs/site/hunnyplay-bonus-en.png",
      // url: "https://url.hk/i/en/exptf",
      url: "https://hunnyplay.games/dbw3v7xvy",
      cta: "Призовой фонд $5000",
      badge: "HUNNYPLAY",
    },
    casino: {
      logo: "/assets/imgs/casinos/1xbet-logo.webp",
      name: "1xBet",
      title: "100% ПРИВЕТСТВЕННЫЙ БОНУС ДО €100 🤯 В 1XBET!",
      cta: "ЗАБЕРИ СВОЙ БОНУС В 1XBET!",
      url: "https://reffpa.com/L?tag=d_5827615m_97c_&site=5827615&ad=97",
    },
    casino2: {
      logo: "/assets/imgs/casinos/national-argentina-logo.webp",
      name: "National",
      title: "ДО 100 ФРИСПИНОВ 🤯 В NATIONAL!",
      cta: "ДО 100 ФРИСПИНОВ 🤯 В NATIONAL!",
      url: "https://media.toxtren.com/redirect.aspx?pid=101348&bid=2036&redirectURL=https://natregs.com",
    },
    external_250x250: metadata.images.banners + "coinsgame-300x300.png",
  },
  categories: {
    slot: { name: "Онлайн-слоты", url: "/ru/igry/onlayn-sloty/" },
    bingo: { name: "Онлайн-бинго", url: "/ru/igry/onlayn-bingo/" },
    roulette: { name: "Рулетка", url: "/ru/igry/ruletka/" },
    blackjack: { name: "Блэкджек", url: "/ru/igry/bledzhek/" },
    instant: { name: "Мгновенные выигрыши", url: "/ru/igry/mgnovennye-vyigryshi/" },
    baccarat: { name: "Баккара", url: "/ru/igry/bakkara/" },
    poker: { name: "Видео-покер", url: "/ru/igry/video-poker/" },
  },
  texts: {
    nostrLoginFailed:
      "Не удалось войти через Nostr. Убедитесь, что у вас есть signer.",
    noNostrSigner:
      "NIP-07 signer не найден. Установите расширение (например, Alby) или вставьте ваш nsec.",
    loginTimeout: "Вход отменён или превышено время ожидания",
    googleLoginFailed: "Не удалось войти через Google",
    invalidNsec: "Неверный nsec-ключ",
    poweredBy: "При поддержке",
    karmaEarnRedirecting: "Перенаправление...",
    karmaPoints: "очков кармы",
    youEarned: "Вы заработали",
    cooldownTime: "Время ожидания",
    karmaEarned: "Поздравляем! Вы заработали карму",
    karmaEarnCooldown:
      "Подождите, прежде чем снова зарабатывать карму за этот визит",
    karmaEarnError: "Ошибка начисления кармы",
    earningKarma: "Начисляем карму...",
    latestCommits: "Последние коммиты кода",
    viewOnGitHub: "Смотреть на GitHub",
    or: "или",
    close: "Закрыть",
    go: "Вперёд",
    bad: "Плохо",
    average: "Средне",
    good: "Хорошо",
    positive: "Позитивно",
    readMore: "Читать далее",
    readLess: "Свернуть",
    slot: "Слоты",
    loadMore: "Загрузить ещё",
    viewAllCasinos: "Все казино",
    overallSentiment: "Общее впечатление",
    aiOverview: "ИИ-обзор",
    back: "Назад",
    backToList: "Вернуться к списку",
    changeBanner: "Сменить баннер",
    earn: "Заработать",
    points: "карма",
    vote: "Голосовать",
    votes: "голосов",
    howWorks: "Как это работает?",

    orderNewer: "Новые",
    orderMostVoted: "Популярные",
    orderAlphabetical: "По алфавиту",
    orderLicensed: "Лицензированные",
    orderBlacklisted: "Чёрный список",
    orderShutdown: "Закрытые",

    gamesBy: "Игры от",
    benefits: "Преимущества",
    search: "Поиск...",
    noItemToList: "Нечего показать.",
    spreadKarma: "Давайте делиться кармой! 🤪",
    login: "Войти",
    requireLogin: "Войдите, чтобы получить свои преимущества",
    availablePromotions: "Доступные акции",
    loginWithNostr: "Войти через Nostr",
    loginWithEmail: "Отправить код входа",
    logout: "Выйти",
    news: "Новости",
    quickInfo: "Кратко",
    founded: "Основано",
    headquarters: "Штаб-квартира",
    officialSite: "Официальный сайт",
    welcome: "Добро пожаловать!",
    logoutMessage: "До свидания!",
    supporters: "Спонсоры",
    reputationText: "Репутация",
    reputation: {
      fair: "Честное",
      acceptable: "Приемлемое",
      caution: "Осторожно",
      dangerous: "Опасное",
    },
    tagline:
      "Первый сайт рейтингов казино, бинарных опционов и форекса с правильными стимулами",
    tagline2: "карма, заслуги и proof-of-work",
    tagline3:
      "Радикальная прозрачность для пользователей, операторов и регуляторов ;)",
    taglineHome:
      "Делитесь кармой, голосуя за сайты, поднимайтесь в рейтинге и получайте эксклюзивные преимущества!",
    karma: {
      title: "Ваша карма!",
      content: `
        <p><strong>Что такое карма?</strong> Карма движет рейтингами (и жизнью!) Используйте её, чтобы голосовать за бренды казино, форекса и бинарных опционов и влиять на их позиции, чтобы наверх выходили только лучшие, а в таблицу лидеров попадали только лучшие пользователи.</p>
        <br />
        <p>
        <strong>Как заработать карму?</strong> Каждый день — просто заходя на сайт и посещая бренды из нашего списка (через кнопку «Перейти на сайт»). Также карму можно заработать, комментируя свой опыт игры у брендов, когда другие пользователи голосуют за ваши комментарии, набирая подписчиков или просто купив её за криптовалюту.
        </p>
        <br />
        <p>
          <strong>Как использовать карму?</strong> Карма используется в списках брендов — нажимайте 👍 или 🖕. Каждый голос повышает или понижает карму бренда на 21 очко.
          Все голоса кармы проверяемы и записываются в историю бренда.
          <strong>За каждую потраченную карму вы получаете 👑 очки лидерства</strong>
        </p>
        <div class="divider my-5"></div>
        <p>
          <strong>Вы — бренд?</strong> Используйте очки кармы, чтобы поднять свой бренд в рейтингах.
        </p>          
      `,
    },
    levels: {
      title: "Ваше лидерство",
      content: `
        <div class="pb-3 mb-2 border-b border-gray-100 dark:border-gray-600">
          <button class="btn btn-logout">Выйти</button>
        </div>        
        <p>
          <strong>Как повысить уровень?</strong> Вы повышаете уровень каждый раз, когда используете свою карму: делитесь опытом игры у брендов, голосуете, оцениваете новые сайты и в целом приносите пользу сообществу.
        </p>
        <br />
        <p>
          <strong>Зачем повышать уровень?</strong> В награду за пользу сообществу пользователи с высоким уровнем в таблице лидеров получают доступ к эксклюзивным VIP-бонусам, фриспинам (только для лидеров) и большему влиянию в сообществе (их комментарии показываются первыми, они могут продвигать свои сайты, сети и стримы и т.д.).
        </p>  
        <div class="divider my-5"></div>
        <p>
          <strong>Полный список преимуществ — на странице «О нас».</strong>
        </p>                            
      `,
    },
    featured: "Рекомендуем",
    votingFailed: "Не удалось проголосовать! Не хватает кармы?",
    votingSuccess:
      "Спасибо за ваш голос! Списки обновляются раз в день.",
    heartVoteLabel: "Дать карму",
    heartVotedLabel: "Карма отдана!",
    heartVoteAgainLabel: "Дать карму ещё раз!",

    visit: "Перейти",
    visitCasino: "Перейти в казино",
    visitSite: "Перейти&nbsp;на&nbsp;сайт",
    leaveOpinion: "Оставить отзыв",
    detailsText: "Детали",
    bonus: "Бонус",
    tryBonus: "Забрать этот бонус",
    freePlay: "Играть&nbsp;бесплатно",
    realPlay: "Играть&nbsp;в&nbsp;казино",
    addCasino: "Предложить казино",
    slogan: {
      firstLine: "Радикальная прозрачность онлайн-ставок 🧘‍♂️",
      secondLine:
        "Новые платформы с бездепозитными бонусами, джекпот-играми и партнёрскими программами!",
    },
    protectingPlayersSince:
      "Защищаем игроков с помощью прозрачных технологий с 2018 года",
    searchBrands: "Поиск по всем брендам...",
    searchNoResults: "Ни один бренд не подошёл под поиск",
    latestGames: "Новые игры",
    latestGamesTeaser:
      "Новейшие слоты, бинго и настольные игры на рынке!",
    featuredProviders: "Лучшие провайдеры",
    featuredProvidersText:
      "Откройте для себя лучших создателей слотов, бинго и plinko-игр",
    seeAll: "Показать все",
    createdBy: "Создано",
    home: "Главная",
    games: "Игры",
    promotionsAndPayments: "Акции и платежи",
    customerSupport: "Поддержка",
    designAndUsability: "Дизайн и удобство",
    affiliateProgram: "Партнёрская программа",
    license: "Лицензии",
    casinos: "Казино",
    bonuses: "Бонусы",
    aboutUs: "F.A.Q",
    glossary: "Глоссарий",
    providers: "Провайдеры",
    provider: "Провайдер",
    affiliates: "Партнёры",
    others: "Прочее",
    transparency: "Прозрачность",
    rankings: "Рейтинги",
    ranking: "Рейтинг",
    leaderboardRank: "Место",
    leaderboardUser: "Пользователь",
    leaderboardKarma: "Карма",
    leaderboard: "Таблица лидеров",
    volatility: "Волатильность",
    minMaxBets: "Мин./макс. ставки",
    maxWin: "Макс. выигрыш",
    paylines: "Линии выплат",
    hands: "Руки",
    type: "Тип",
    maxWithdrawal: "Макс. вывод",
    minDeposit: "Мин. депозит",
    minWithdrawal: "Мин. вывод",
    category: "Категория",
    launch: "Запуск",
    since: "С",
    details: {
      prizes: "Призы, RTP и волатильность",
      functions: "Функции и механика",
      theme: "Тема и дизайн",
    },
    otherFreeGamesBy: "Другие бесплатные игры от",
    moreAbout: "Подробнее о",
    reputationDetails: "Детали репутации",
    operatedBy: "Оператор",
    reviewOf: "Обзор",
    rateOnInstagram: "Оцените в Instagram!",
    questions: "Вопросы?",
    contactUs: "Свяжитесь с нами",
    cookiesMessage:
      "Мы используем cookies, чтобы улучшить ваше впечатление от сайта. Продолжая пользоваться сайтом, вы соглашаетесь с таким использованием согласно нашей политике cookies.",
    accept: "Принять",
    code: "Код",
    bonusDetailsTitle: "Детали условий бонуса",
    binaryRegulation: "Регулирование и безопасность",
    binaryPlatform: "Торговая платформа",
    binaryAssets: "Доступные активы",
    binaryFees: "Комиссии и сборы",
    binaryPayments: "Ввод и вывод средств",
    binaryDemo: "Демо-счёт",
    binarySupport: "Поддержка",
    binaryEducation: "Обучающие ресурсы",
    blacklistReason:
      "Мы настоятельно не рекомендуем играть в этом казино из-за нерешённых жалоб, плохих практик или других серьёзных проблем.",
    supportersText:
      "Ничто не заменит силу коллективного знания и решения рынка. Давайте улучшим онлайн-гемблинг вместе. Станьте спонсором — и вы появитесь в топе наших списков!",
    becomeSponsor: "Стать спонсором",
    soon: "Скоро...",
    selectLanguage: "Выберите язык",
    viewGames: "Смотреть игры",

    forexRegulation: "Регулирование и безопасность",
    forexPlatforms: "Торговые платформы",
    forexSpreads: "Спреды и комиссии",
    forexAccounts: "Типы счетов",
    forexInstruments: "Валютные пары и инструменты",
    forexLeverage: "Кредитное плечо и маржа",
    forexPayments: "Ввод и вывод средств",
    forexResearch: "Исследования и аналитика",
    forexDemo: "Демо-счёт",
    forexSupport: "Поддержка",
    forexEducation: "Обучающие ресурсы",

    writeComment: "Напишите ваш комментарий...",
    commentPublished: "Комментарий успешно опубликован",
    comments: "Комментарии",
    noComments:
      "Комментариев пока нет. Станьте первым и заработайте карму!",
    commentsError: "Не удалось загрузить комментарии.",
  },
};
