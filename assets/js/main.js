// Мобильное меню
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('show');
    toggle.setAttribute('aria-expanded', String(open));
  });
}

// Плавный скролл по якорям ТОЛЬКО внутри этой страницы
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const id = a.getAttribute('href');
    if (!id || id === '#') return;
    const t = document.querySelector(id);
    if (!t) return;
    e.preventDefault();
    t.scrollIntoView({behavior:'smooth'});
    nav?.classList.remove('show');
    toggle?.setAttribute('aria-expanded','false');
  });
});

// Год в подвале (если элемент есть)
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== Lightbox (увеличение фото) =====
(function(){
  // создать контейнер, если его нет
  let lb = document.getElementById('lightbox');
  if (!lb){
    lb = document.createElement('div');
    lb.id = 'lightbox';
    lb.className = 'lightbox';
    lb.innerHTML = '<img alt="Просмотр">';
    document.body.appendChild(lb);
  }
  const imgEl = lb.querySelector('img');

  // делегирование клика по любому .card img
  document.addEventListener('click', (e)=>{
    const img = e.target.closest('.card img');
    if (!img) return;
    imgEl.src = img.src;
    lb.classList.add('active');
    document.body.classList.add('noscroll');
  });

  // закрытие по клику вне изображения
  lb.addEventListener('click', (e)=>{
    if (e.target !== imgEl){
      lb.classList.remove('active');
      document.body.classList.remove('noscroll');
      imgEl.src = '';
    }
  });

  // закрытие по Esc
  document.addEventListener('keydown', (e)=>{
    if (e.key === 'Escape'){
      lb.classList.remove('active');
      document.body.classList.remove('noscroll');
      imgEl.src = '';
    }
  });
})();
