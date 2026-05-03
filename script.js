// ── 1. MENU MOBILE ──────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('nav-menu');

hamburger.addEventListener('click', function () {
  navMenu.classList.toggle('nav-open');
  hamburger.classList.toggle('is-active');
});

// Fecha o menu ao clicar em um link
navMenu.querySelectorAll('a').forEach(function (link) {
  link.addEventListener('click', function () {
    navMenu.classList.remove('nav-open');
    hamburger.classList.remove('is-active');
  });
});


// ── 2. ACCORDION ────────────────────────────────────────────
document.querySelectorAll('.accordion-trigger').forEach(function (btn) {
  btn.addEventListener('click', function () {
    const item    = btn.parentElement;
    const content = item.querySelector('.accordion-content');
    const isOpen  = item.classList.contains('is-open');

    if (isOpen) {
      item.classList.remove('is-open');
      content.style.maxHeight = '0';
    } else {
      item.classList.add('is-open');
      content.style.maxHeight = content.scrollHeight + 'px';
    }
  });
});


// ── 3. VOLTAR AO TOPO ───────────────────────────────────────
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', function () {
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

backToTop.addEventListener('click', function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


// ── 4. TABS (habilidades) ────────────────────────────────────
function showTab(btn, id) {
  document.querySelectorAll('.tab-btn').forEach(function (b) {
    b.classList.remove('on');
  });
  btn.classList.add('on');

  ['hard', 'soft', 'tech'].forEach(function (tab) {
    document.getElementById(tab).style.display = tab === id ? 'grid' : 'none';
  });
}
