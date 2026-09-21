document.addEventListener('DOMContentLoaded', () => {

  /* 1. Плавный скролл (Lenis) */
  if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  /* 2. Бургер-меню */
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  if (burger && nav) {
    burger.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      burger.classList.toggle('is-open', isOpen);
      burger.setAttribute('aria-expanded', isOpen);
    });
  }

  /* 3. Фильтрация карточек */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const carCards = document.querySelectorAll('.car-card');

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((btn) => btn.classList.remove('is-active'));
      button.classList.add('is-active');

      const selectedCategory = button.getAttribute('data-filter');

      carCards.forEach((card) => {
        const cardCategory = card.getAttribute('data-category');
        card.classList.remove('is-filtered-in');

        if (selectedCategory === 'all' || cardCategory === selectedCategory) {
          card.classList.remove('is-hidden');
          setTimeout(() => card.classList.add('is-filtered-in'), 30);
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  });

  /* 4. Появление элементов при скролле (Scroll Reveal) */
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealElements.forEach((el) => observer.observe(el));
  }

  /* 5. Эффект прожектора (Spotlight) */
  const text = document.querySelector('.spotlight-text');
  if (text) {
    let targetX = 0, targetY = 0, currentX = 0, currentY = 0;

    window.addEventListener('mousemove', (e) => {
      const rect = text.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
    });

    function animateSpotlight() {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      text.style.setProperty('--mouse-x', `${currentX.toFixed(2)}px`);
      text.style.setProperty('--mouse-y', `${currentY.toFixed(2)}px`);
      requestAnimationFrame(animateSpotlight);
    }
    animateSpotlight();
  }

});