document.addEventListener('DOMContentLoaded', () => {
    // Элементы управления
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.menu-link');
    const logoLink = document.querySelector('.logo-link');
    const body = document.body;

    // Настройки анимации
    const animationConfig = {
        duration: 400,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        scrollBehavior: 'smooth'
    };

    // Инициализация состояния
    let currentSection = null;
    let isAnimating = false;

    // Функция активации секции
    const activateSection = (sectionId) => {
        if (isAnimating) return;
        isAnimating = true;

        const targetSection = document.getElementById(sectionId);
        if (!targetSection) {
            console.error(`Section ${sectionId} not found!`);
            isAnimating = false;
            return;
        }

        // Анимация перехода
        requestAnimationFrame(() => {
            // Скрытие текущей секции
            if (currentSection) {
                currentSection.style.opacity = '0';
                currentSection.style.transform = 'translateY(20px)';
            }

            // Показать целевую секцию после задержки
            setTimeout(() => {
                sections.forEach(section => {
                    section.classList.remove('active');
                    section.style.opacity = '0';
                });

                targetSection.classList.add('active');
                targetSection.style.opacity = '1';
                targetSection.style.transform = 'translateY(0)';
                currentSection = targetSection;

                // Обновление истории браузера
                history.pushState({ section: sectionId }, '', `#${sectionId}`);
                
                // Обновление активных ссылок
                updateActiveNav(sectionId);
                
                // Прокрутка к началу
                window.scrollTo({
                    top: 0,
                    behavior: animationConfig.scrollBehavior
                });

                isAnimating = false;
            }, animationConfig.duration);
        });
    };

    // Обновление активной навигации
    const updateActiveNav = (sectionId) => {
        navLinks.forEach(link => {
            const linkSection = link.getAttribute('href').substring(1);
            link.classList.toggle('active', linkSection === sectionId);
        });
    };

    // Обработчик кликов по навигации
    const handleNavClick = (e) => {
        e.preventDefault();
        const sectionId = e.currentTarget.getAttribute('href').substring(1);
        if (sectionId === currentSection?.id) return;
        activateSection(sectionId);
    };

    // Обработчик истории браузера
    const handlePopState = (e) => {
        const sectionId = e.state?.section || 'main';
        activateSection(sectionId);
    };

    // Инициализация событий
    const init = () => {
        // Навигационные ссылки
        navLinks.forEach(link => {
            link.addEventListener('click', handleNavClick);
        });

        // Логотип
        logoLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentSection?.id === 'main') return;
            activateSection('main');
        });

        // История браузера
        window.addEventListener('popstate', handlePopState);

        // Первоначальная загрузка
        const initialSection = window.location.hash.substring(1) || 'main';
        activateSection(initialSection);
    };

    // Запуск инициализации
    init();

    // Дополнительные функции
    // Автоматическая прокрутка для главных кнопок
    document.querySelectorAll('.main-btn').forEach(button => {
        button.addEventListener('click', () => {
            window.scrollTo({
                top: document.getElementById('main').offsetTop,
                behavior: animationConfig.scrollBehavior
            });
        });
    });

    // Адаптивная коррекция высоты
    const adjustContentHeight = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    window.addEventListener('resize', adjustContentHeight);
    adjustContentHeight();

    // Обработка клавиатуры
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            activateSection('main');
        }
    });
});
