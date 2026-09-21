/* ===========================================================
   index.js — home page behaviour
   =========================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- 1. Mobile menu ------------------------------ */
  var burger = document.getElementById('burger');
  var nav    = document.getElementById('nav');

  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      burger.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
    });

    // close the menu after tapping any link inside it
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        burger.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });

    // close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        burger.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- 2. Mark the current page in the nav --------- */
  var current = location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav__link').forEach(function (link) {
    var target = link.getAttribute('href');
    if (target === current) {
      link.classList.add('is-active');
    } else {
      link.classList.remove('is-active');
    }
  });

  /* ---------- 3. Reveal blocks on scroll ------------------ */
  var revealItems = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    revealItems.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        el.style.transitionDelay = (i * 70) + 'ms';
        el.classList.add('is-visible');
        observer.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealItems.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- 4. Drop real photos into the placeholders ----
     Replace the paths below with your own images and the grey
     blocks turn into pictures automatically.
     Example: 'hero': 'img/hero.jpg'
  --------------------------------------------------------- */
  var images = {
    // 'Hero image — 1312 × 620' : 'img/hero.jpg',
    // 'Image — 640 × 440'       : 'img/showroom.jpg'
  };

  document.querySelectorAll('.media').forEach(function (box) {
    var src = images[box.dataset.label];
    if (!src) return;
    var img = new Image();
    img.src = src;
    img.alt = box.dataset.label;
    box.appendChild(img);
  });

});




document.addEventListener('DOMContentLoaded', () => {

  const section = document.querySelector('.spotlight-section');
  const text = document.querySelector('.spotlight-text');

  if (section && text) {
    // Реальные координаты мыши
    let targetX = 0;
    let targetY = 0;

    // Текущие координаты пятна (которые будут плавно стремиться к target)
    let currentX = 0;
    let currentY = 0;

    // Инициализация по центру при старте
    const rect = text.getBoundingClientRect();
    targetX = rect.width / 2;
    targetY = rect.height / 2;
    currentX = targetX;
    currentY = targetY;

    // Отслеживаем движение мыши по секции (или по всему окну)
    window.addEventListener('mousemove', (e) => {
      const textRect = text.getBoundingClientRect();
      // Вычисляем координаты относительно текста
      targetX = e.clientX - textRect.left;
      targetY = e.clientY - textRect.top;
    });

    // Функция плавной анимации (каждый кадр)
   function animateSpotlight() {
    const ease = 0.08;

    currentX += (targetX - currentX) * ease;
    currentY += (targetY - currentY) * ease;

    text.style.setProperty('--mouse-x', `${currentX.toFixed(2)}px`);
    text.style.setProperty('--mouse-y', `${currentY.toFixed(2)}px`);

    requestAnimationFrame(animateSpotlight);
}

    // Запускаем бесконечный цикл анимации
    animateSpotlight();
  }

});