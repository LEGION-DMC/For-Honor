document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');
    const sections = {
        home: `
            <section class="home-section">
                <div class="hero">
                    <h1>For Honor</h1>
                </div>
                <div class="divider"></div>
                <p>Эпическая сага о пути самурая...</p>
            </section>
        `,
        chapters: `
            <section class="chapters-section">
                <h2>Главы</h2>
                <div class="divider"></div>
                <div class="chapters-grid">
                    ${Array.from({length: 9}, (_, i) => `
                        <div class="chapter-card">
                            <img src="chapter${i+1}.jpg" alt="Глава ${i+1}">
                            <div class="chapter-title">Глава ${i+1}</div>
                        </div>
                    `).join('')}
                </div>
            </section>
        `,
        materials: `
            <section class="materials-section">
                <div class="hero">
                    <h1>Доп. материалы</h1>
                </div>
                <div class="divider"></div>
                <p>Эпическая сага о пути самурая...</p>
            </section>
        `,
        author: `
            <section class="author-section">
                <div class="hero">
                    <h1>Автор</h1>
                </div>
                <div class="divider"></div>
                <p>Эпическая сага о пути самурая...</p>
            </section>
        `,
        map: `
            <section class="map-section">
                <div class="hero">
                    <h1>Карта</h1>
                </div>
                <div class="divider"></div>
                <p>Эпическая сага о пути самурая...</p>
            </section>
        `,
    };

    // Навигация
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = e.target.getAttribute('href').slice(1);
            loadSection(section);
        });
    });

    function loadSection(section) {
        content.innerHTML = sections[section] || '<h2>Страница в разработке</h2>';
        window.scrollTo(0, 0);
    }

    // Загрузка главной страницы по умолчанию
    loadSection('home');
});
