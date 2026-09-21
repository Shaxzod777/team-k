document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    form.addEventListener('submit', (e) => {
        // Отменяем стандартную перезагрузку страницы
        e.preventDefault();

        // Собираем данные из полей (для будущей интеграции с бэкендом)
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        // Имитация отправки на сервер
        console.log('Данные к отправке:', formData);

        // Плавная смена формы на сообщение об успехе
        form.style.display = 'none';
        successMessage.classList.remove('hidden');
    });
});
