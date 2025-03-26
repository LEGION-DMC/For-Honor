document.addEventListener('DOMContentLoaded', () => {
    // Инициализация состояния
    let currentActiveTab = null;
    let scale = 1;
    let translateX = 0;
    let translateY = 0;
    let isDragging = false;
    let startX, startY;

    // Элементы DOM
    const tabContents = document.querySelectorAll('.tab-content');
    const navLinks = document.querySelectorAll('.nav-link');
    const logoContainer = document.querySelector('.logo-container');
    const map = document.getElementById('world-map');

    // Основная функция активации вкладок
    const activateTab = (tabId) => {
        // Скрытие всех вкладок
        tabContents.forEach(content => {
            content.style.opacity = 0;
            content.classList.remove('active');
        });

        // Показ целевой вкладки
        const targetTab = document.getElementById(tabId);
        if (targetTab) {
            targetTab.classList.add('active');
            setTimeout(() => {
                targetTab.style.opacity = 1;
            }, 50);
        }

        // Обновление истории браузера
        window.history.replaceState(null, null, `#${tabId}`);
        currentActiveTab = tabId;

        // Сброс анимаций карточек
        document.querySelectorAll('.chapter-card, .material-card').forEach(card => {
            card.style.animation = 'none';
            void card.offsetWidth; // Принудительный перезапуск анимации
            card.style.animation = '';
        });

        // Прокрутка вверх с анимацией
        setTimeout(() => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }, 300);
    };

    // Система навигации
    const handleNavigation = (e) => {
        e.preventDefault();
        const tabId = e.target.closest('a').hash.substring(1);
        if (tabId !== currentActiveTab) activateTab(tabId);
    };

    // Инициализация интерактивной карты
    const initInteractiveMap = () => {
        if (!map) return;

        // Добавление меток
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

        // Обработчики зума
        const updateMapTransform = () => {
            const maxTranslate = (scale - 1) * 100;
            translateX = Math.min(Math.max(-maxTranslate, translateX), maxTranslate);
            translateY = Math.min(Math.max(-maxTranslate, translateY), maxTranslate);
            
            map.style.transform = `
                scale(${scale})
                translate(${translateX}px, ${translateY}px)
            `;
        };

        // Зум колесом мыши
        map.addEventListener('wheel', (e) => {
            e.preventDefault();
            scale = Math.min(Math.max(1, scale * (e.deltaY > 0 ? 0.9 : 1.1)), 3);
            updateMapTransform();
        });

        // Перемещение карты
        map.addEventListener('mousedown', (e) => {
            isDragging = true;
            map.classList.add('zooming');
            startX = e.clientX - translateX;
            startY = e.clientY - translateY;
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            translateX = e.clientX - startX;
            translateY = e.clientY - startY;
            updateMapTransform();
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
            map.classList.remove('zooming');
        });

        // Кнопки зума
        const zoomControls = document.createElement('div');
        zoomControls.className = 'zoom-controls';
        zoomControls.innerHTML = `
            <button class="zoom-btn" data-action="in">+</button>
            <button class="zoom-btn" data-action="out">−</button>
        `;
        map.parentElement.appendChild(zoomControls);

        document.querySelectorAll('.zoom-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                scale = btn.dataset.action === 'in' 
                    ? Math.min(3, scale + 0.2) 
                    : Math.max(1, scale - 0.2);
                updateMapTransform();
            });
        });
    };

    // Всплывающее окно локации
    const showLocationPopup = (title) => {
        const popup = document.createElement('div');
        popup.className = 'location-popup';
        popup.innerHTML = `
            <h4>${title}</h4>
            <p>Описание локации...</p>
            <button class="close-popup">&times;</button>
        `;
        
        popup.querySelector('.close-popup').addEventListener('click', () => popup.remove());
        document.body.appendChild(popup);
    };

    // Обработчики событий
    const initEventHandlers = () => {
        // Навигация
        navLinks.forEach(link => link.addEventListener('click', handleNavigation));
        logoContainer.addEventListener('click', (e) => {
            e.preventDefault();
            activateTab('home');
        });

        // Интерактивные элементы
        document.querySelectorAll('.samurai-btn').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.style.transform = 'translateY(-3px) scale(1.05)';
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translateY(0) scale(1)';
            });

            btn.addEventListener('click', () => {
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

        // Обработка изменений хеша
        window.addEventListener('hashchange', () => {
            activateTab(window.location.hash.substring(1) || 'home');
        });
    };

    // Первоначальная инициализация
    const initialTab = window.location.hash.substring(1) || 'home';
    activateTab(initialTab);
    initInteractiveMap();
    initEventHandlers();

    // Анимация загрузки страницы
    setTimeout(() => {
        document.body.style.opacity = 1;
    }, 100);
});
