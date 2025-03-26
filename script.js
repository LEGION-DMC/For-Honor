document.addEventListener('DOMContentLoaded', () => {
    // Переключение вкладок
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.nav-link');

    function activateSection(sectionId) {
        sections.forEach(section => {
            section.classList.remove('active');
            if(section.id === sectionId) {
                setTimeout(() => section.classList.add('active'), 10);
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if(link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('href').slice(1);
            activateSection(sectionId);
        });
    });

    // По умолчанию активируем главную страницу
    activateSection('home');
    
    // Анимация карточек глав
    document.querySelectorAll('.chapter-card').forEach(card => {
        card.addEventListener('click', () => {
            // Здесь можно добавить переход к полной главе
            alert('Переход к полной главе');
        });
    });
});
