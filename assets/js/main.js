/* ===== Mobile menu ===== */
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('show');
    toggle.setAttribute('aria-expanded', String(open));
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

/* ===== Lightbox ===== */
(() => {
  let lb = document.getElementById('lightbox');
  if (!lb) {
    lb = document.createElement('div');
    lb.id = 'lightbox';
    lb.className = 'lightbox';
    lb.innerHTML = '<img alt="Preview">';
    document.body.appendChild(lb);
  }
  const imgEl = lb.querySelector('img');

  document.addEventListener('click', e => {
    const img = e.target.closest('.card img');
    if (!img) return;
    imgEl.src = img.src;
    lb.classList.add('active');
    document.body.classList.add('noscroll');
  });

  lb.addEventListener('click', e => {
    if (e.target !== imgEl) {
      lb.classList.remove('active');
      document.body.classList.remove('noscroll');
      imgEl.src = '';
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      lb.classList.remove('active');
      document.body.classList.remove('noscroll');
      imgEl.src = '';
    }
  });
})();

/* ===== i18n ===== */
const translations = {
  uz: {
    meta: { title: 'Teatr "Diydor"', desc: 'Teatr Diydor rasmiy sayti: afisha, repertuar, aloqa.' },
    brand: 'Teatr "Diydor"',
    nav: {
      performances: 'Spektakllar',
      artists: 'Artistlar',
      playbill: 'Afisha',
      about: 'Teatr haqida',
      contacts: 'Aloqa'
    },
    hero: { title: 'Teatr "Diydor"', subtitle: 'Klassika va zamonaviylik bir sahnada', cta: 'Afishani tomosha qiling' },
    rep: { title: 'Bizning spektakllar' },
    sched: { title: 'Jadval' },
    tbl: { date: 'Sana', time: 'Vaqt', title: 'Nomi', author: 'Muallif', director: 'Rejissyor', genre: 'Janr' },
    about: { title: 'Teatr haqida', lead: 'Teatrning qisqacha tarixi, truppa, mukofotlar.' },
    contacts: { title: 'Biz bilan bog\'lanish', phoneLabel: 'Telefon:', addrLabel: 'Manzil:' },
    form: { name: 'F.I.Sh', msg: 'Xabar', send: 'Xabar jo\'natish' },
    footer: { up: 'Yuqoriga ↑' },
    actors: { title: 'Spektakllar', desc: 'Bu erda teatr guruhi haqidagi fotosuratlar va ma\'lumotlar keltirilgan.' },
    artists: { title: 'Artistlar', desc: 'Teatr truppasi: foto, F.I.Sh, tug‘ilgan sanasi va yutuqlar.' }
  },
  ru: {
    meta: { title: 'Театр «Дийдор»', desc: 'Официальный сайт театра: афиша, репертуар, контакты.' },
    brand: 'Театр «Дийдор»',
    nav: {
      performances: 'Наши выступления',
      artists: 'Артисты',
      playbill: 'Афиша',
      about: 'О театре',
      contacts: 'Контакты'
    },
    hero: { title: 'Театр «Дийдор»', subtitle: 'Классика и современность на одной сцене', cta: 'Смотреть афишу' },
    rep: { title: 'Наши спектакли' },
    sched: { title: 'Расписание' },
    tbl: { date: 'Дата', time: 'Время', title: 'Название', author: 'Автор', director: 'Режиссёр', genre: 'Жанр' },
    about: { title: 'О театре', lead: 'Краткая история театра, труппа, награды.' },
    contacts: { title: 'Контакты', phoneLabel: 'Телефон:', addrLabel: 'Адрес:' },
    form: { name: 'Ф.И.О.', msg: 'Сообщение', send: 'Отправить сообщение' },
    footer: { up: 'Наверх ↑' },
    actors: { title: 'Наши выступления', desc: 'Здесь представлены фотографии и информация о труппе театра.' },
    artists: { title: 'Артисты', desc: 'Труппа театра: фото, Ф.И.О., дата рождения и достижения.' }
  },
  en: {
    meta: { title: '"Diydor" Theatre', desc: 'Official theatre website: playbill, repertoire, contacts.' },
    brand: '"Diydor" Theatre',
    nav: {
      performances: 'Performances',
      artists: 'Artists',
      playbill: 'Playbill',
      about: 'About',
      contacts: 'Contacts'
    },
    hero: { title: '"Diydor" Theatre', subtitle: 'Classics and modernity on one stage', cta: 'View playbill' },
    rep: { title: 'Our Performances' },
    sched: { title: 'Schedule' },
    tbl: { date: 'Date', time: 'Time', title: 'Title', author: 'Author', director: 'Director', genre: 'Genre' },
    about: { title: 'About the Theatre', lead: 'A brief history of the theatre, troupe, awards.' },
    contacts: { title: 'Contacts', phoneLabel: 'Phone:', addrLabel: 'Address:' },
    form: { name: 'Full name', msg: 'Message', send: 'Send message' },
    footer: { up: 'Back to top ↑' },
    actors: { title: 'Performances', desc: 'Here you can find photos and information about the theatre troupe.' },
    artists: { title: 'Artists', desc: 'The troupe: photos, full name, date of birth and achievements.' }
  }
};

/* helpers */
const isActorsPage  = /actors\.html(\?|#|$)/i.test(location.pathname) || document.body.classList.contains('page-actors');
const isArtistsPage = /artists\.html(\?|#|$)/i.test(location.pathname) || document.body.classList.contains('page-artists');

const getByPath = (obj, path) => path.split('.').reduce((o,k)=> (o && k in o) ? o[k] : undefined, obj);

/* apply translations for [data-i18n] */
function applyI18n(lang) {
  const dict = translations[lang];
  if (!dict) return;

  // fill any node with data-i18n
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

  // legacy fallbacks (if на странице нет data-i18n)
  // header brand
  const brand = document.querySelector('.logo span');
  if (brand && !brand.hasAttribute('data-i18n')) brand.textContent = dict.brand;

  // nav (если ссылки без data-i18n)
  const navMap = [
    ['[href$="actors.html"]',       dict.nav.performances],
    ['[href$="artists.html"]',      dict.nav.artists],
    ['a[href*="#repertoire"]',      dict.nav.playbill],
    ['a[href*="#about"]',           dict.nav.about],
    ['a[href*="#contacts"]',        dict.nav.contacts],
  ];
  navMap.forEach(([sel, text]) => {
    const a = document.querySelector(`.nav ${sel}`);
    if (a && !a.hasAttribute('data-i18n')) a.textContent = text;
  });

  // page-specific fallbacks
  if (isActorsPage) {
    const h1 = document.querySelector('.section-header h1, section.section h1');
    const p  = document.querySelector('.section-header .section-sub, section.section p.section-sub, section.section p.muted, section.section p');
    if (h1 && !h1.hasAttribute('data-i18n')) h1.textContent = dict.actors.title;
    if (p  && !p.hasAttribute('data-i18n'))  p.textContent  = dict.actors.desc;
  }
  if (isArtistsPage) {
    const h1 = document.querySelector('.section-header h1, h1');
    const p  = document.querySelector('.section-sub, p.section-sub, .section p');
    if (h1 && !h1.hasAttribute('data-i18n')) h1.textContent = dict.artists.title;
    if (p  && !p.hasAttribute('data-i18n'))  p.textContent  = dict.artists.desc;
  }

  // mark active language button
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
