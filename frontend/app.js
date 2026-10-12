document.addEventListener('DOMContentLoaded', () => {
    const menuButtons = document.querySelectorAll('.menu-btn[data-tab]');
    const tabSections = document.querySelectorAll('.tab-section');

    menuButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTabId = button.getAttribute('data-tab');

            // Скрываем все вкладки
            tabSections.forEach(section => {
                section.style.display = 'none';
            });

            // Убираем активный класс со всех кнопок
            menuButtons.forEach(btn => btn.classList.remove('active'));

            // Показываем нужную вкладку
            const targetSection = document.getElementById(targetTabId);
            if (targetSection) {
                targetSection.style.display = 'block';
            }

            // Добавляем активный класс нажатой кнопке
            button.classList.add('active');
        });
    });
});