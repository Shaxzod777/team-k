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

  /* 2. Ховер видео и клик по всей карточке для перехода в конфигуратор */
  const carCards = document.querySelectorAll('.car-card');

  carCards.forEach((card) => {
    card.style.cursor = 'pointer';

    const video = card.querySelector('.car-card__video');
    if (video) {
      card.addEventListener('mouseenter', () => {
        video.currentTime = 0;
        video.play().catch(() => {});
      });

      card.addEventListener('mouseleave', () => {
        video.pause();
      });
    }

    // Переход в конфигуратор при клике на карточку
    card.addEventListener('click', () => {
      const modelSlug = card.getAttribute('data-model') || 'e-class-sedan';
      window.location.href = `configurator.html?model=${modelSlug}`;
    });
  });

  /* Предотвращаем клик карточки при нажатии на "Test Drive" */
  const stopPropagationElements = document.querySelectorAll('.js-stop-propagation');
  stopPropagationElements.forEach((element) => {
    element.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  });

  /* 3. Бургер-меню */
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  if (burger && nav) {
    burger.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      burger.classList.toggle('is-open', isOpen);
      burger.setAttribute('aria-expanded', isOpen);
    });
  }

/* 4. Фильтрация с эффектом приплыва */
  const filterButtons = document.querySelectorAll('.filter-btn');

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((btn) => btn.classList.remove('is-active'));
      button.classList.add('is-active');

      const selectedCategory = button.getAttribute('data-filter');

      carCards.forEach((card) => {
        const cardCategory = card.getAttribute('data-category');
        const shouldShow = selectedCategory === 'all' || cardCategory === selectedCategory;

        // Сбрасываем класс анимации для перезапуска
        card.classList.remove('is-filtered-in');

        if (shouldShow) {
          card.style.display = 'flex';
          
          // Запускаем анимацию приплыва
          requestAnimationFrame(() => {
            card.classList.add('is-filtered-in');
          });
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* 5. Появление элементов при скролле (Scroll Reveal) */
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

  /* 6. Эффект прожектора (Spotlight) */
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