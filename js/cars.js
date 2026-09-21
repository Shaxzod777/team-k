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
      // 0.08 — коэффициент плавности (чем меньше число, тем плавнее и «тяжелее» следование)
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

document.addEventListener('DOMContentLoaded', () => {

  /* ===========================================================
     0. Lenis Smooth Scroll (Плавный скролл как у Bugatti)
     =========================================================== */
  if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
      duration: 1.2,      // Длительность инерции (чем больше, тем плавнее)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Экспоненциальная плавноcть
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,  // Включает плавный скролл для колесика мыши
      wheelMultiplier: 1, // Скорость прокрутки колесика
      touchMultiplier: 2, // Чувствительность на тач-устройствах
    });

    // Связываем Lenis с циклом анимации браузера
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }

  // ... Твой остальной JS код (бургер, прожектор, фильтры и т.д.)
});