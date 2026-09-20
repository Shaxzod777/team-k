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