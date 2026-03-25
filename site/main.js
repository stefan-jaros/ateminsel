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

// Kurse laden
fetch('kurse.json')
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
