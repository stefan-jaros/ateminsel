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

// Kurse laden
var basePath = document.querySelector('link[rel="stylesheet"]').href.replace('style.css', '');
fetch(basePath + 'kurse.json')
    .then(r => r.json())
    .then(kurse => {
        const liste = document.getElementById('kurse-liste');
        if (!liste) return;

        if (kurse.length === 0) {
            liste.innerHTML = '<p class="kurse-leer">Momentan sind keine Kurse geplant. Schauen Sie bald wieder vorbei.</p>';
            return;
        }

        liste.innerHTML = kurse.map(k => `
            <div class="kurs-card">
                <div class="kurs-header">
                    <h3>${k.titel}</h3>
                    <span class="kurs-badge ${k.plaetze_frei ? 'badge-frei' : 'badge-voll'}">${k.plaetze_frei ? 'Plätze frei' : 'Ausgebucht'}</span>
                </div>
                <div class="kurs-details">
                    <div class="kurs-detail"><strong>Wann</strong>${k.tag}, ${k.uhrzeit}<br>${k.lektionen} Lektionen: ${k.start} – ${k.ende}</div>
                    <div class="kurs-detail"><strong>Wo</strong>${k.ort}</div>
                    <div class="kurs-detail"><strong>Kosten</strong>${k.kosten}</div>
                </div>
                ${k.plaetze_frei ? '<a href="#kontakt" class="btn btn-small btn-kurs">Anmelden</a>' : ''}
            </div>
        `).join('');
    });
