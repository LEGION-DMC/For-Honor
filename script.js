document.addEventListener('DOMContentLoaded', function() {
    // Элементы DOM
    const tabs = document.querySelectorAll('.menu-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    const homeTab = document.getElementById('home-tab');
    const readBtn = document.querySelector('.read-btn');
    document.querySelector('.menu-tab[data-tab="home"]').classList.add('active');
});
    // Анимация прокрутки к верху страницы
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // Переключение между вкладками
    function switchTab(tabId) {
        // Скрыть все вкладки
        
        tabContents.forEach(content => {
            content.classList.remove('active');
        });
        
        // Показать выбранную вкладку
        const activeTab = document.getElementById(tabId);
        if (activeTab) {
            activeTab.classList.add('active');
            scrollToTop();
        }
    }
    
    // Обработчики событий для вкладок меню
    tabs.forEach(tab => {
    tab.addEventListener('click', function() {
        // Удаляем класс active у всех вкладок
        tabs.forEach(t => t.classList.remove('active'));
        });
    });

    this.classList.add('active');
        
        const tabId = this.getAttribute('data-tab');
        switchTab(tabId);
    });
});

    // Обработчик для логотипа (главная страница)
    homeTab.addEventListener('click', function() {
        switchTab('home');
    });
    
    // Обработчик для кнопки "Читать"
    if (readBtn) {
        readBtn.addEventListener('click', function() {
            const chapter = this.getAttribute('data-chapter');
            switchTab('history');
            scrollToTop();
            
            // Прокрутка к выбранной главе (можно доработать)
            setTimeout(() => {
                const chapterElement = document.querySelector(`[data-image="${chapter}.jpg"]`);
                if (chapterElement) {
                    chapterElement.scrollIntoView({ behavior: 'smooth' });
                }
            }, 500);
        });
    }
    
    // По умолчанию показываем главную страницу
    switchTab('home');
    
    // Анимация при загрузке страницы
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});
