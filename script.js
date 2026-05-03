/* ============================================================
   script.js — Thiago Dias Gomes Portfolio
   Etapa 6: Interações com JavaScript
   • Menu Mobile (Hambúrguer)
   • Accordion (FAQ)
   • Botão Voltar ao Topo
   • Extras: cursor customizado, fade-in no scroll, tabs
   ============================================================ */

// ── 1. MENU MOBILE (HAMBÚRGUER) ─────────────────────────────
(function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks  = document.querySelector('.nav-links');

  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', function () {
    const isOpen = navLinks.classList.toggle('nav-open');
    hamburger.classList.toggle('is-active', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    hamburger.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  });

  // Fecha o menu ao clicar em um link
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('nav-open');
      hamburger.classList.remove('is-active');
      hamburger.setAttribute('aria-expanded', false);
      hamburger.setAttribute('aria-label', 'Abrir menu');
    });
  });

  // Fecha ao pressionar Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navLinks.classList.contains('nav-open')) {
      navLinks.classList.remove('nav-open');
      hamburger.classList.remove('is-active');
      hamburger.setAttribute('aria-expanded', false);
      hamburger.setAttribute('aria-label', 'Abrir menu');
      hamburger.focus();
    }
  });
})();


// ── 2. ACCORDION ────────────────────────────────────────────
(function initAccordion() {
  const items = document.querySelectorAll('.accordion-item');

  items.forEach(function (item) {
    const trigger = item.querySelector('.accordion-trigger');
    const content = item.querySelector('.accordion-content');

    if (!trigger || !content) return;

    // Inicializa: fechado
    content.style.maxHeight = '0px';
    content.style.overflow  = 'hidden';

    trigger.addEventListener('click', function () {
      const isOpen = item.classList.contains('is-open');

      // Fecha todos os outros (comportamento exclusivo opcional)
      // items.forEach(function (other) {
      //   if (other !== item) closeItem(other);
      // });

      if (isOpen) {
        closeItem(item);
      } else {
        openItem(item);
      }
    });
  });

  function openItem(item) {
    const content = item.querySelector('.accordion-content');
    item.classList.add('is-open');
    content.style.maxHeight = content.scrollHeight + 'px';
    item.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'true');
  }

  function closeItem(item) {
    const content = item.querySelector('.accordion-content');
    item.classList.remove('is-open');
    content.style.maxHeight = '0px';
    item.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'false');
  }
})();


// ── 3. BOTÃO VOLTAR AO TOPO ──────────────────────────────────
(function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  // Mostra o botão depois de rolar 400px
  window.addEventListener('scroll', function () {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


// ── 4. TABS (habilidades) ────────────────────────────────────
function showTab(btn, id) {
  document.querySelectorAll('.tab-btn').forEach(function (b) { b.classList.remove('on'); });
  btn.classList.add('on');
  ['hard', 'soft', 'tech'].forEach(function (tab) {
    var el = document.getElementById(tab);
    if (el) el.style.display = (tab === id) ? 'grid' : 'none';
  });
}


// ── 5. FADE-IN AO ROLAR ──────────────────────────────────────
(function initFadeScroll() {
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade').forEach(function (el) {
    observer.observe(el);
  });
})();


// ── 6. CURSOR CUSTOMIZADO ────────────────────────────────────
(function initCursor() {
  var cur     = document.getElementById('cur');
  var curRing = document.getElementById('curRing');
  if (!cur || !curRing) return;

  var mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', function (e) {
    mx = e.clientX;
    my = e.clientY;
    cur.style.left = mx + 'px';
    cur.style.top  = my + 'px';
  });

  (function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    curRing.style.left = rx + 'px';
    curRing.style.top  = ry + 'px';
    requestAnimationFrame(animateRing);
  })();

  document.querySelectorAll('a, button, .proj, .soc-link').forEach(function (el) {
    el.addEventListener('mouseenter', function () { curRing.classList.add('expand'); });
    el.addEventListener('mouseleave', function () { curRing.classList.remove('expand'); });
  });
})();
