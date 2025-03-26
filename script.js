document.addEventListener('DOMContentLoaded', () => {
    // Инициализация страницы
    let currentActiveTab = null;
    const tabContents = document.querySelectorAll('.tab-content');
    const navLinks = document.querySelectorAll('.nav-link');
    const logoContainer = document.querySelector('.logo-container');

    // Функция активации вкладки
    function activateTab(tabId) {
        // Скрыть все вкладки
        tabContents.forEach(content => {
            content.classList.remove('active');
            content.style.opacity = 0;
        });

        // Показать целевую вкладку
        const targetTab = document.getElementById(tabId);
        if (targetTab) {
            targetTab.classList.add('active');
            setTimeout(() => {
                targetTab.style.opacity = 1;
            }, 50);
        }

        // Обновить URL
        window.history.replaceState(null, null, `#${tabId}`);
        currentActiveTab = tabId;

        // Прокрутка вверх с задержкой для корректной работы анимации
        setTimeout(() => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }, 300);
    }

    // Обработчик кликов по навигации
    function handleNavigationClick(e) {
        e.preventDefault();
        const tabId = this.getAttribute('href').substring(1);
        if (tabId !== currentActiveTab) {
            activateTab(tabId);
        }
    }

    // Инициализация карты
    function initMap() {
        const map = document.getElementById('world-map');
        if (!map) return;

        // Координаты меток (x%, y%, название)
        const markers = [
            [25, 40, 'Замок Акаги'],
            [60, 30, 'Деревня Сирануи'],
            [45, 70, 'Священная гора']
        ];

        markers.forEach(([x, y, title]) => {
            const marker = document.createElement('div');
            marker.className = 'map-marker';
            marker.style.left = `${x}%`;
            marker.style.top = `${y}%`;
            marker.innerHTML = `
                <div class="marker-pin"></div>
                <div class="marker-tooltip">${title}</div>
            `;
            
            marker.addEventListener('click', (e) => {
                e.stopPropagation();
                showLocationPopup(title);
            });
            map.appendChild(marker);
        });
    }

    // Показ попапа локации
    function showLocationPopup(title) {
        const popup = document.createElement('div');
        popup.className = 'location-popup';
        popup.innerHTML = `
            <h4>${title}</h4>
            <p>Описание локации...</p>
            <button class="close-popup">&times;</button>
        `;
        
        popup.querySelector('.close-popup').addEventListener('click', () => {
            popup.remove();
        });
        
        document.body.appendChild(popup);
    }

    // Обработчики событий
    function setupEventListeners() {
        // Навигационные ссылки
        navLinks.forEach(link => {
            link.addEventListener('click', handleNavigationClick);
        });

        // Логотип
        logoContainer.addEventListener('click', (e) => {
            e.preventDefault();
            activateTab('home');
        });

        // Карточки глав
        document.querySelectorAll('.chapter-card').forEach(card => {
            card.addEventListener('click', () => {
                window.location.href = `#chapter-${card.dataset.chapter}`;
            });
        });

        // Интерактивные кнопки
        document.querySelectorAll('.samurai-btn').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.style.transform = 'translateY(-3px) scale(1.05)';
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translateY(0) scale(1)';
            });
            
            btn.addEventListener('click', () => {
                // Реализация действий для кнопок
                switch(btn.textContent.trim()) {
                    case 'Читать онлайн':
                        window.open('read.html', '_blank');
                        break;
                    case 'Купить книгу':
                        window.open('purchase.html', '_blank');
                        break;
                    case 'Отзывы':
                        document.querySelector('#reviews').scrollIntoView();
                        break;
                }
            });
        });
    }

    // Обработчик изменения хеша
    window.addEventListener('hashchange', () => {
        const tabId = window.location.hash.substring(1) || 'home';
        activateTab(tabId);
    });

    // Первоначальная загрузка
    const initialTab = window.location.hash.substring(1) || 'home';
    activateTab(initialTab);
    initMap();
    setupEventListeners();

    // Анимация загрузки
    setTimeout(() => {
        document.body.style.opacity = 1;
    }, 100);
});
