document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    const inputs = [
        document.getElementById('name'),
        document.getElementById('phone'),
        document.getElementById('email'),
        document.getElementById('message')
    ];

    // Убираем ошибку плавно при вводе текста
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            input.classList.remove('invalid');
            const errorSpan = document.getElementById(`${input.id}Error`);
            if (errorSpan) {
                errorSpan.style.opacity = '0';
                errorSpan.style.transform = 'translateY(4px)';
            }
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('name');
        const phoneInput = document.getElementById('phone');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        const nameError = document.getElementById('nameError');
        const phoneError = document.getElementById('phoneError');
        const emailError = document.getElementById('emailError');
        const messageError = document.getElementById('messageError');

        let isValid = true;

        const showError = (input, errorSpan, text) => {
            input.classList.add('invalid');
            errorSpan.textContent = text;
            errorSpan.style.opacity = '1';
            errorSpan.style.transform = 'translateY(0)';
            isValid = false;
        };

        if (!nameInput.value.trim()) {
            showError(nameInput, nameError, 'Пожалуйста, укажите ваше имя');
        }

        if (!phoneInput.value.trim()) {
            showError(phoneInput, phoneError, 'Укажите контактный номер телефона');
        }

        if (!emailInput.value.trim()) {
            showError(emailInput, emailError, 'Укажите ваш электронный адрес');
        } else if (!emailInput.value.includes('@')) {
            showError(emailInput, emailError, 'Введен некорректный адрес почты');
        }

        if (!messageInput.value.trim()) {
            showError(messageInput, messageError, 'Напишите детали вашего запроса');
        }

        if (isValid) {
            form.style.opacity = '0';
            form.style.transition = 'opacity 0.4s ease';
            
            setTimeout(() => {
                form.style.display = 'none';
                successMessage.classList.remove('hidden');
            }, 400);
        }
    });
});
