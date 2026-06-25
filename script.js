/* ══════════════════════════════════
   PORTFOLIO — script.js
   ══════════════════════════════════ */

// ── MOBILE NAV TOGGLE ──
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', navLinks.classList.contains('open'));
});

// Close mobile nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});


// ── ACTIVE NAV HIGHLIGHT ON SCROLL ──
const allNavLinks = document.querySelectorAll('.nav-links a');
const sections    = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 80) {
      current = section.id;
    }
  });

  allNavLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === '#' + current
      ? 'var(--accent)'
      : '';
  });
}, { passive: true });


// ── CONTACT FORM HANDLER ──
function kirimPesan() {
  const nama  = document.getElementById('nama').value.trim();
  const email = document.getElementById('email').value.trim();
  const pesan = document.getElementById('pesan').value.trim();

  if (!nama || !email || !pesan) {
    alert('Mohon lengkapi semua kolom terlebih dahulu.');
    return;
  }

  // Validasi format email sederhana
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Format email tidak valid.');
    return;
  }

  alert(`Terima kasih, ${nama}! Pesan Anda telah terkirim. Saya akan segera menghubungi ${email}.`);
  document.getElementById('nama').value  = '';
  document.getElementById('email').value = '';
  document.getElementById('pesan').value = '';
}


// ── SCROLL REVEAL (ringan, tanpa library) ──
const revealTargets = document.querySelectorAll('.skill-card, .project-card, .stat-card');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity  = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealTargets.forEach(el => {
  el.style.opacity   = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  observer.observe(el);
});
