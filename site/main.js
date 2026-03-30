// Theme toggle
const themeToggle = document.querySelector('.theme-toggle');
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
}

themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
    location.reload();
});

// Hero animation - alternates zoom direction between page loads
const hero = document.querySelector('.hero');
if (hero) {
    const heroDir = localStorage.getItem('heroDir') === 'out' ? 'out' : 'in';
    hero.classList.add('zoom-' + heroDir);
    localStorage.setItem('heroDir', heroDir === 'in' ? 'out' : 'in');

    document.querySelector('.nav-logo').addEventListener('click', () => {
        const cur = hero.classList.contains('zoom-in') ? 'in' : 'out';
        const next = cur === 'in' ? 'out' : 'in';
        hero.classList.remove('zoom-' + cur);
        void hero.offsetWidth;
        hero.classList.add('zoom-' + next);
    });
}

// Mobile navigation toggle
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');

toggle.addEventListener('click', () => {
    links.classList.toggle('active');
    toggle.classList.toggle('active');
});

// Close mobile nav on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        links.classList.remove('active');
        toggle.classList.remove('active');
    });
});

// Language dropdown toggle
const langDropdown = document.querySelector('.lang-dropdown');
const langBtn = document.querySelector('.lang-btn');

langBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    langDropdown.classList.toggle('open');
});

document.addEventListener('click', () => {
    langDropdown.classList.remove('open');
});

langDropdown.querySelector('.lang-menu').addEventListener('click', (e) => {
    e.stopPropagation();
});

// Active nav link based on scroll position
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

function updateActiveNav() {
    const scrollY = window.scrollY + 100;
    let current = '';

    sections.forEach(section => {
        if (scrollY >= section.offsetTop) {
            current = section.getAttribute('id');
        }
    });

    navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav();

// Scroll-Animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 80);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Kontaktformular
const form = document.getElementById('kontakt-form');
if (form) {
    // Zeitstempel setzen beim Laden
    form.querySelector('[name="_ts"]').value = Math.floor(Date.now() / 1000);

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const status = document.getElementById('form-status');
        const btn = form.querySelector('button[type="submit"]');
        btn.disabled = true;
        btn.textContent = 'Wird gesendet...';
        status.textContent = '';
        status.className = 'form-status';

        fetch(basePath + 'kontakt.php', {
            method: 'POST',
            body: new FormData(form)
        })
        .then(r => r.json())
        .then(data => {
            if (data.ok) {
                status.textContent = 'Vielen Dank! Ihre Nachricht wurde gesendet.';
                status.className = 'form-status success';
                form.reset();
                form.querySelector('[name="_ts"]').value = Math.floor(Date.now() / 1000);
            } else {
                status.textContent = data.fehler || 'Ein Fehler ist aufgetreten.';
                status.className = 'form-status error';
            }
            btn.disabled = false;
            btn.textContent = 'Nachricht senden';
        })
        .catch(() => {
            status.textContent = 'Verbindungsfehler. Bitte versuchen Sie es telefonisch.';
            status.className = 'form-status error';
            btn.disabled = false;
            btn.textContent = 'Nachricht senden';
        });
    });
}

// Map overlay – prevents map from capturing scroll on touch devices
document.querySelectorAll('.map-overlay').forEach(overlay => {
    const wrapper = overlay.parentElement;
    overlay.addEventListener('click', () => wrapper.classList.add('active'));
    wrapper.addEventListener('mouseleave', () => wrapper.classList.remove('active'));
});

// Kurse laden
var basePath = document.querySelector('link[rel="stylesheet"][href*="style.css"]').href.replace(/style\.css.*$/, '');
var lang = document.documentElement.lang || 'de';
var t = {
    de: { leer: 'Momentan sind keine Kurse geplant. Schauen Sie bald wieder vorbei.', frei: 'Plätze frei', voll: 'Ausgebucht', wann: 'Wann', wo: 'Wo', kosten: 'Kosten', lektionen: 'Lektionen', anmelden: 'Anmelden' },
    en: { leer: 'No courses currently scheduled. Please check back soon.', frei: 'Places available', voll: 'Fully booked', wann: 'When', wo: 'Where', kosten: 'Cost', lektionen: 'Lessons', anmelden: 'Sign up' },
    fr: { leer: 'Aucun cours prévu pour le moment. Revenez bientôt.', frei: 'Places disponibles', voll: 'Complet', wann: 'Quand', wo: 'Où', kosten: 'Prix', lektionen: 'Leçons', anmelden: 'S\'inscrire' },
    es: { leer: 'No hay cursos programados actualmente. Vuelva pronto.', frei: 'Plazas disponibles', voll: 'Completo', wann: 'Cuándo', wo: 'Dónde', kosten: 'Precio', lektionen: 'Lecciones', anmelden: 'Inscribirse' }
}[lang] || t.de;
fetch(basePath + 'kurse.json')
    .then(r => r.json())
    .then(kurse => {
        const liste = document.getElementById('kurse-liste');
        if (!liste) return;

        if (kurse.length === 0) {
            liste.innerHTML = '<p class="kurse-leer">' + t.leer + '</p>';
            return;
        }

        liste.innerHTML = kurse.map(k => `
            <div class="kurs-card">
                <div class="kurs-header">
                    <h3>${k.titel}</h3>
                    <span class="kurs-badge ${k.plaetze_frei ? 'badge-frei' : 'badge-voll'}">${k.plaetze_frei ? t.frei : t.voll}</span>
                </div>
                <div class="kurs-details">
                    <div class="kurs-detail"><strong>${t.wann}</strong>${k.tag}, ${k.uhrzeit}<br>${k.lektionen} ${t.lektionen}: ${k.start} – ${k.ende}</div>
                    <div class="kurs-detail"><strong>${t.wo}</strong>${k.ort}</div>
                    <div class="kurs-detail"><strong>${t.kosten}</strong>${k.kosten}</div>
                </div>
                ${k.plaetze_frei ? '<a href="#kontakt" class="btn btn-small btn-kurs">' + t.anmelden + '</a>' : ''}
            </div>
        `).join('');
    });

// Statistik-Tracking
var gesehen = new Set();
var trackObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
        if (e.isIntersecting && e.target.id) gesehen.add(e.target.id);
    });
}, { threshold: 0.3 });
document.querySelectorAll('section[id]').forEach(function(s) { trackObserver.observe(s); });

window.addEventListener('beforeunload', function() {
    if (gesehen.size === 0) return;
    navigator.sendBeacon(basePath + 'track.php', JSON.stringify({
        lang: lang,
        sektionen: Array.from(gesehen)
    }));
});
