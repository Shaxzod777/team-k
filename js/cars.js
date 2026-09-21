document.addEventListener('DOMContentLoaded', () => {

  /* ===========================================================
     1. Мобильное меню (Burger Navigation)
     =========================================================== */
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');

  if (burger && nav) {
    burger.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      burger.classList.toggle('is-open', isOpen);
      burger.setAttribute('aria-expanded', isOpen);
    });
  }

  /* ===========================================================
     2. Фильтрация моделей (Category Filter)
     =========================================================== */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const carCards = document.querySelectorAll('.car-card');

  if (filterButtons.length > 0 && carCards.length > 0) {
    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        // Переключение активной кнопки
        filterButtons.forEach((btn) => btn.classList.remove('is-active'));
        button.classList.add('is-active');

        const selectedCategory = button.getAttribute('data-filter');

        // Фильтрация карточек
        carCards.forEach((card) => {
          const cardCategory = card.getAttribute('data-category');

          if (selectedCategory === 'all' || cardCategory === selectedCategory) {
            card.classList.remove('is-hidden');
          } else {
            card.classList.add('is-hidden');
          }
        });
      });
    });
  }

  /* ===========================================================
     3. Анимация появления при скролле (Scroll Reveal)
     =========================================================== */
  const revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Отключаем наблюдение после того, как элемент появился
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach((el) => revealObserver.observe(el));
  }

});