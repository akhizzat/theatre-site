/* ===== Mobile menu ===== */
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('show');
    toggle.setAttribute('aria-expanded', String(open));
  });
  // закрывать меню по клику на ссылку
  nav.addEventListener('click', e => {
    if (e.target.closest('a')) {
      nav.classList.remove('show');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ===== Smooth scroll (only in-page anchors) ===== */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (!id || id === '#') return;
    const t = document.querySelector(id);
    if (!t) return;
    e.preventDefault();
    t.scrollIntoView({ behavior: 'smooth' });
    nav?.classList.remove('show');
    toggle?.setAttribute('aria-expanded', 'false');
  });
});

/* ===== Year in footer ===== */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ===== Lightbox with arrows ===== */
(() => {
  let overlay = document.getElementById('lightbox');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'lightbox';
    overlay.className = 'lightbox';
    overlay.innerHTML = `
      <button class="lb-btn lb-prev" aria-label="Previous">‹</button>
      <img alt="Preview">
      <button class="lb-btn lb-next" aria-label="Next">›</button>`;
    document.body.appendChild(overlay);
  }
  const imgEl = overlay.querySelector('img');
  const btnPrev = overlay.querySelector('.lb-prev');
  const btnNext = overlay.querySelector('.lb-next');

  let list = [];
  let current = -1;

  const collect = () => {
    list = Array.from(document.querySelectorAll('.card img')).map((img, i) => {
      img.dataset.lbIndex = String(i);
      return img.src;
    });
  };
  collect();

  // если DOM позже меняется — пересоберём
  const mo = new MutationObserver(() => collect());
  mo.observe(document.body, { childList: true, subtree: true });

  const open = (idx) => {
    if (!list.length) return;
    current = ((idx % list.length) + list.length) % list.length;
    imgEl.src = list[current];
    overlay.classList.add('active');
    document.body.classList.add('noscroll');
  };
  const close = () => {
    overlay.classList.remove('active');
    document.body.classList.remove('noscroll');
    imgEl.src = '';
    current = -1;
  };
  const next = () => open(current + 1);
  const prev = () => open(current - 1);

  document.addEventListener('click', (e) => {
    const img = e.target.closest('.card img');
    if (img && img.dataset.lbIndex) open(parseInt(img.dataset.lbIndex, 10));
  });
  overlay.addEventListener('click', (e) => {
    if (e.target === btnPrev) prev();
    else if (e.target === btnNext) next();
    else if (e.target !== imgEl) close();
  });
  document.addEventListener('keydown', (e) => {
    if (!overlay.classList.contains('active')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });
})();

/* ===== i18n ===== */
const translations = {
  uz: {
    meta: { title: 'Teatr "Diydor"', desc: 'Teatr Diydor rasmiy sayti: afisha, repertuar, aloqa.' },
    brand: 'Teatr "Diydor"',
    nav: { performances: 'Spektakllar', artists: 'Aktyorlar', playbill: 'Afisha', about: 'Teatr haqida', contacts: 'Aloqa' },
    hero: { title: 'Teatr "Diydor"', subtitle: 'Klassika va zamonaviylik bir sahnada', cta: 'Afishani tomosha qiling' },
    rep: { title: 'Bizning spektakllar' },
    sched: { title: 'Jadval' },
    tbl: { date: 'Sana', time: 'Vaqt', title: 'Nomi', author: 'Muallif', director: 'Rejissyor', genre: 'Janr' },
    about: {
      title: 'Teatr haqida',
      lead: 'Teatrning qisqacha tarixi, truppa, mukofotlar.',
      li1: 'Asoslangan: 1989', li2: 'Sahna: 50 o‘rin', li3: 'Yo‘nalish: dramatik va musiqiy'
    },
    contacts: { title: 'Biz bilan bog\'lanish', phoneLabel: 'Telefon:', addrLabel: 'Manzil:' },
    form: { name: 'F.I.O.', msg: 'Xabar', send: 'Xabar jo\'natish' },
    footer: { up: 'Yuqoriga ↑' },

    /* Страницы */
    actors:  {
      title: 'Spektakllar',
      desc:  "Bu erda teatr guruhi haqidagi fotosuratlar va ma'lumotlar keltirilgan."
    },
    artists: {
      title: 'Aktyorlar',
      desc:  "Teatr truppasi: foto, F.I.Sh, tug‘ilgan sanasi va yutuqlar."
    },

    label: { dob: 'Tug‘ilgan sana:', ach: 'Yutuqlar:' },
    artistsList: [
      { name: 'Bobur Yuldashev', ach: 'Badiiy rahbar' },
      { name: 'Farhod Abdullayev', ach: 'O‘zbekiston xalq artisti. Diydor teatr-studiyasi oliy toifali aktyori' },
      { name: 'Karim Mirxadiyev', ach: 'O‘zbekiston xalq artisti. Diydor teatr-studiyasi oliy toifali aktyori' },
      { name: 'Egamberdi Rahimov', ach: 'O‘zbekistonda xizmat ko‘rsatgan madaniyat hodimi. Diydor teatr-studiyasi oliy toifali aktyori' },
      { name: 'Ruslan Haydarov', ach: 'Sahnalashtiruvchi rejissyor. “Shuhrat” medali sovrindori' },
      { name: 'Yulduz Rajabova', ach: 'Diydor teatr-studiyasi oliy toifali aktrisasi. “Do‘stlik” medali sovrindori' },
      { name: 'Iroda Kosimova', ach: 'Diydor teatr-studiyasi aktrisasi. “Kelajak bunyodkori” medali sovrindori' },
      { name: 'Sevinch Allaberganova', ach: 'Diydor teatr-studiyasi aktrisasi' },
      { name: 'Umid Uzoqov', ach: 'Diydor teatr-studiyasi aktyori' },
      { name: 'Otabek Iskandarov', ach: 'Diydor teatr-studiyasi aktyori' },
    ],
  },
  ru: {
    meta: { title: 'Театр «Дийдор»', desc: 'Официальный сайт театра: афиша, репертуар, контакты.' },
    brand: 'Театр «Дийдор»',
    nav: { performances: 'Наши выступления', artists: 'Актеры', playbill: 'Афиша', about: 'О театре', contacts: 'Контакты' },
    hero: { title: 'Театр «Дийдор»', subtitle: 'Классика и современность на одной сцене', cta: 'Смотреть афишу' },
    rep: { title: 'Наши спектакли' },
    sched: { title: 'Расписание' },
    tbl: { date: 'Дата', time: 'Время', title: 'Название', author: 'Автор', director: 'Режиссёр', genre: 'Жанр' },
    about: {
      title: 'О театре',
      lead: 'Краткая история театра, труппа, награды.',
      li1: 'Основан: 1989', li2: 'Сцена: 50 мест', li3: 'Направление: драматический и музыкальный'
    },
    contacts: { title: 'Контакты', phoneLabel: 'Телефон:', addrLabel: 'Адрес:' },
    form: { name: 'Ф.И.О.', msg: 'Сообщение', send: 'Отправить сообщение' },
    footer: { up: 'Наверх ↑' },

    actors:  {
      title: 'Наши выступления',
      desc:  'Здесь представлены фотографии и информация о труппе театра.'
    },
    artists: {
      title: 'Актеры',
      desc:  'Труппа театра: фото, Ф.И.О., дата рождения и достижения.'
    },

    label: { dob: 'Дата рождения:', ach: 'Достижения:' },
    artistsList: [
      { name: 'Бобур Юлдашев', ach: 'Художественный руководитель' },
      { name: 'Фарход Абдуллаев', ach: 'Народный артист Узбекистана. Актёр высшей категории театра-студии «Дийдор»' },
      { name: 'Карим Мирхадиев', ach: 'Народный артист Узбекистана. Актёр высшей категории театра-студии «Дийдор»' },
      { name: 'Эгамберди Рахимов', ach: 'Заслуженный работник культуры Республики Узбекистан. Актёр высшей категории театра-студии «Дийдор»' },
      { name: 'Руслан Хайдаров', ach: 'Режиссёр-постановщик. Кавалер медали «Шухрат»' },
      { name: 'Юлдуз Раджабова', ach: 'Актриса высшей категории театра-студии «Дийдор». Лауреат медали «Дустлик»' },
      { name: 'Ирода Косимова', ach: 'Актриса театра-студии «Дийдор». Лауреат медали «Келажак бунёдкори»' },
      { name: 'Севинч Аллаберганова', ach: 'Актриса театра-студии «Дийдор»' },
      { name: 'Умид Узоков', ach: 'Актёр театра-студии «Дийдор»' },
      { name: 'Отабек Искандаров', ach: 'Актёр театра-студии «Дийдор»' },
    ],
  },
  en: {
    meta: { title: '"Diydor" Theatre', desc: 'Official theatre website: playbill, repertoire, contacts.' },
    brand: '"Diydor" Theatre',
    nav: { performances: 'Performances', artists: 'Actors', playbill: 'Playbill', about: 'About', contacts: 'Contacts' },
    hero: { title: '"Diydor" Theatre', subtitle: 'Classics and modernity on one stage', cta: 'View playbill' },
    rep: { title: 'Our Performances' },
    sched: { title: 'Schedule' },
    tbl: { date: 'Date', time: 'Time', title: 'Title', author: 'Author', director: 'Director', genre: 'Genre' },
    about: {
      title: 'About the Theatre',
      lead: 'A brief history of the theatre, troupe, awards.',
      li1: 'Founded: 1989', li2: 'Stage: 50 seats', li3: 'Focus: drama and musical'
    },
    contacts: { title: 'Contacts', phoneLabel: 'Phone:', addrLabel: 'Address:' },
    form: { name: 'Full name', msg: 'Message', send: 'Send message' },
    footer: { up: 'Back to top ↑' },

    actors:  {
      title: 'Performances',
      desc:  'Here you can find photos and information about the theatre troupe.'
    },
    artists: {
      title: 'Actors',
      desc:  'The troupe: photos, full name, date of birth and achievements.'
    },

    label: { dob: 'Date of birth:', ach: 'Achievements:' },
    artistsList: [
      { name: 'Bobur Yuldashev', ach: 'Artistic Director' },
      { name: 'Farhod Abdullayev', ach: 'People’s Artist of Uzbekistan. Top-category actor of the Diydor theatre-studio' },
      { name: 'Karim Mirkhadiev', ach: 'People’s Artist of Uzbekistan. Top-category actor of the Diydor theatre-studio' },
      { name: 'Egamberdi Rahimov', ach: 'Honored Worker of Culture of Uzbekistan. Top-category actor of the Diydor theatre-studio' },
      { name: 'Ruslan Haydarov', ach: 'Stage director. “Shukhrat” medal laureate' },
      { name: 'Yulduz Rajabova', ach: 'Top-category actress of the Diydor theatre-studio. “Dostlik” medal laureate' },
      { name: 'Iroda Kosimova', ach: 'Actress of the Diydor theatre-studio. “Kelajak bunyodkori” medal laureate' },
      { name: 'Sevinch Allaberganova', ach: 'Actress of the Diydor theatre-studio' },
      { name: 'Umid Uzoqov', ach: 'Actor of the Diydor theatre-studio' },
      { name: 'Otabek Iskandarov', ach: 'Actor of the Diydor theatre-studio' },
    ],
  }
};

/* helpers */
const isActorsPage  = /actors\.html(\?|#|$)/i.test(location.pathname) || document.body.classList.contains('page-actors');
const isArtistsPage = /artists\.html(\?|#|$)/i.test(location.pathname) || document.body.classList.contains('page-artists');
const getByPath = (obj, path) => path.split('.').reduce((o,k)=> (o && k in o) ? o[k] : undefined, obj);

/* apply translations for [data-i18n] + page specifics */
function applyI18n(lang) {
  const dict = translations[lang];
  if (!dict) return;

  // общие [data-i18n]
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = getByPath(dict, key);
    if (val == null) return;
    if (el.tagName === 'TITLE') {
      document.title = String(val);
    } else if (el.tagName === 'META' && el.name === 'description') {
      el.setAttribute('content', String(val));
    } else {
      el.textContent = String(val);
    }
  });

  // бренд (если без data-i18n)
  const brand = document.querySelector('.logo span');
  if (brand && !brand.hasAttribute('data-i18n')) brand.textContent = dict.brand;

  // меню (если где-то нет data-i18n)
  const setText = (sel, text) => {
    const a = document.querySelector(`.nav ${sel}`);
    if (a && !a.hasAttribute('data-i18n')) a.textContent = text;
  };
  setText('[href$="actors.html"]',  dict.nav.performances);
  setText('[href$="artists.html"]', dict.nav.artists);
  setText('a[href*="#repertoire"]', dict.nav.playbill);
  setText('a[href*="#about"]',      dict.nav.about);
  setText('a[href*="#contacts"]',   dict.nav.contacts);

  // Страница Актеры: имена/достижения (даты не трогаем)
  if (isArtistsPage) {
    const cards = Array.from(document.querySelectorAll('.actors-grid .card'));
    const list = dict.artistsList || [];
    cards.forEach((card, i) => {
      const meta = list[i];
      if (!meta) return;
      const nameEl = card.querySelector('.artist-name');
      if (nameEl) nameEl.textContent = meta.name;
      const pAll = card.querySelectorAll('.card__body p');
      if (pAll.length >= 2) {
        const achP = pAll[1];
        achP.textContent = meta.ach;
      }
      // первый абзац (дата) может быть размечен data-i18n, но если нет — проставим метку
      if (pAll.length >= 1 && !pAll[0].querySelector('strong')) {
        pAll[0].innerHTML = `<strong>${dict.label.dob}</strong> ${pAll[0].textContent.trim()}`;
      }
    });

    // fallback для заголовков на странице
    const h1 = document.querySelector('.section-header h1');
    const sub= document.querySelector('.section-header .section-sub');
    if (h1 && !h1.hasAttribute('data-i18n'))  h1.textContent  = dict.artists.title;
    if (sub && !sub.hasAttribute('data-i18n')) sub.textContent = dict.artists.desc;
  }

  // Страница Выступления: fallback для заголовков
  if (isActorsPage) {
    const h1 = document.querySelector('.section-header h1, section.section h1');
    const p  = document.querySelector('.section-header .section-sub, section.section p.section-sub, section.section p.muted, section.section p');
    if (h1 && !h1.hasAttribute('data-i18n')) h1.textContent = dict.actors.title;
    if (p  && !p.hasAttribute('data-i18n'))  p.textContent  = dict.actors.desc;
  }

  // подсветка активного языка
  document.querySelectorAll('.btn-lang, .lang-switcher button').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === lang);
  });

  localStorage.setItem('lang', lang);
}

/* language buttons */
document.querySelectorAll('.btn-lang, .lang-switcher button').forEach(btn => {
  btn.addEventListener('click', () => applyI18n(btn.dataset.lang));
});

/* initial language */
applyI18n(localStorage.getItem('lang') || 'uz');

/* Подсветка активного пункта меню */
(function () {
  const here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.nav a').forEach(a => {
    const href = (a.getAttribute('href') || '').toLowerCase();
    if (!href) return;
    if (href.endsWith(here)) a.classList.add('active');
    // На главной подсветим якоря при нахождении на index.html
    if ((here === 'index.html' || here === '') && href.startsWith('#')) {
      if (href.includes('#repertoire')) a.classList.add('active');
    }
  });
})();
