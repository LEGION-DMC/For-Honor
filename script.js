document.addEventListener('DOMContentLoaded', () => {
    // Переключение вкладок
    const navLinks = document.querySelectorAll('.nav-link');
    const contents = document.querySelectorAll('.content');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));

            // Удаление активных классов
            navLinks.forEach(l => l.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));

            // Добавление активных классов
            link.classList.add('active');
            target.classList.add('active');
        });
    });

    // Анимация карточек глав
    const chapterCards = document.querySelectorAll('.chapter-card');
    chapterCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.05)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
        });
    });
});
