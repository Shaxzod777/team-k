document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Получаем элементы
        const nameInput = document.getElementById('name');
        const phoneInput = document.getElementById('phone');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        const nameError = document.getElementById('nameError');
        const phoneError = document.getElementById('phoneError');
        const emailError = document.getElementById('emailError');
        const messageError = document.getElementById('messageError');

        // Сбрасываем старые ошибки перед новой проверкой
        let isValid = true;
        [nameInput, phoneInput, emailInput, messageInput].forEach(input => input.classList.remove('invalid'));
        [nameError, phoneError, emailError, messageError].forEach(error => error.textContent = '');

        // Проверка Имени
        if (!nameInput.value.trim()) {
            nameInput.classList.add('invalid');
            nameError.textContent = 'Пожалуйста, укажите ваше имя';
            isValid = false;
        }

        // Проверка Телефона
        if (!phoneInput.value.trim()) {
            phoneInput.classList.add('invalid');
            phoneError.textContent = 'Укажите ваш номер телефона';
            isValid = false;
        }

        // Проверка Email
        if (!emailInput.value.trim()) {
            emailInput.classList.add('invalid');
            emailError.textContent = 'Заполните это поле';
            isValid = false;
        } else if (!emailInput.value.includes('@')) {
            emailInput.classList.add('invalid');
            emailError.textContent = 'Введите корректный email адрес';
            isValid = false;
        }

        // Проверка Сообщения
        if (!messageInput.value.trim()) {
            messageInput.classList.add('invalid');
            messageError.textContent = 'Напишите текст сообщения';
            isValid = false;
        }

        // Если всё заполнено верно
        if (isValid) {
            const formData = {
                name: nameInput.value,
                phone: phoneInput.value,
                email: emailInput.value,
                message: messageInput.value
            };
            console.log('Данные формы:', formData);

            form.style.display = 'none';
            successMessage.classList.remove('hidden');
        }
    });
});
