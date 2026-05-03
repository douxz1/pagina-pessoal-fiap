/* ============================================================
   script.js — Etapa 6: Interações com JavaScript
   Implementa:
     1. Menu mobile (hamburguer toggle)
     2. Accordion (perguntas frequentes)
     3. Botão "Voltar ao Topo"
   ============================================================ */

// ─── 1. MENU MOBILE ─────────────────────────────────────────
(function initMobileMenu() {
  const nav      = document.querySelector('nav');
  const navLinks = document.querySelector('.nav-links');

  // Cria o botão hamburguer dinamicamente se não existir
  if (!document.querySelector('.hamburger')) {
    const btn = document.createElement('button');
    btn.className   = 'hamburger';
    btn.setAttribute('aria-label', 'Abrir menu');
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML =
      '<span></span><span></span><span></span>';
    nav.appendChild(btn);

    btn.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('nav-open');
      btn.classList.toggle('is-active', isOpen);
      btn.setAttribute('aria-expanded', String(isOpen));
      btn.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
    });

    // Fecha o menu ao clicar em qualquer link
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('nav-open');
        btn.classList.remove('is-active');
        btn.setAttribute('aria-expanded', 'false');
        btn.setAttribute('aria-label', 'Abrir menu');
      });
    });

    // Fecha o menu ao clicar fora
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target)) {
        navLinks.classList.remove('nav-open');
        btn.classList.remove('is-active');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }
})();


// ─── 2. ACCORDION ───────────────────────────────────────────
(function initAccordion() {
  const items = document.querySelectorAll('.accordion-item');
  if (!items.length) return;

  items.forEach(function (item) {
    const trigger = item.querySelector('.accordion-trigger');
    const content = item.querySelector('.accordion-content');
    if (!trigger || !content) return;

    // Garante acessibilidade
    const id = 'acc-' + Math.random().toString(36).slice(2, 7);
    content.id = id;
    trigger.setAttribute('aria-controls', id);
    trigger.setAttribute('aria-expanded', 'false');
    content.setAttribute('role', 'region');
    content.style.maxHeight = '0';
    content.style.overflow  = 'hidden';
    content.style.transition = 'max-height 0.35s ease, padding 0.35s ease';

    trigger.addEventListener('click', function () {
      const isOpen = item.classList.toggle('is-open');

      // Fecha os outros itens (comportamento de acordeão)
      items.forEach(function (other) {
        if (other !== item && other.classList.contains('is-open')) {
          other.classList.remove('is-open');
          const otherContent = other.querySelector('.accordion-content');
          const otherTrigger = other.querySelector('.accordion-trigger');
          if (otherContent) otherContent.style.maxHeight = '0';
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
        }
      });

      trigger.setAttribute('aria-expanded', String(isOpen));
      content.style.maxHeight = isOpen ? content.scrollHeight + 'px' : '0';
    });
  });
})();


// ─── 3. BOTÃO VOLTAR AO TOPO ────────────────────────────────
(function initBackToTop() {
  // Cria o botão dinamicamente
  const btn = document.createElement('button');
  btn.id        = 'back-to-top';
  btn.className = 'back-to-top';
  btn.setAttribute('aria-label', 'Voltar ao topo');
  btn.innerHTML =
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" ' +
    'stroke="currentColor" stroke-width="2.5" stroke-linecap="round" ' +
    'stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>';
  document.body.appendChild(btn);

  // Exibe o botão quando o usuário rolar 300px
  window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  // Scroll suave ao topo
  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


// ─── 4. TABS DAS HABILIDADES (já existia, mantido) ──────────
function showTab(btn, id) {
  document.querySelectorAll('.skills-g').forEach(function (el) {
    el.style.display = 'none';
  });
  document.querySelectorAll('.tab-btn').forEach(function (b) {
    b.classList.remove('on');
  });
  var target = document.getElementById(id);
  if (target) target.style.display = 'grid';
  btn.classList.add('on');
}


// ─── 5. CURSOR CUSTOMIZADO (já existia, mantido) ────────────
(function initCursor() {
  var cur     = document.getElementById('cur');
  var curRing = document.getElementById('curRing');
  if (!cur || !curRing) return;

  document.addEventListener('mousemove', function (e) {
    cur.style.left     = e.clientX + 'px';
    cur.style.top      = e.clientY + 'px';
    curRing.style.left = e.clientX + 'px';
    curRing.style.top  = e.clientY + 'px';
  });

  document.querySelectorAll('a, button, .tab-btn, .accordion-trigger').forEach(function (el) {
    el.addEventListener('mouseenter', function () { curRing.classList.add('expand'); });
    el.addEventListener('mouseleave', function () { curRing.classList.remove('expand'); });
  });
})();


// ─── 6. FADE-IN AO SCROLL (IntersectionObserver) ────────────
(function initFadeScroll() {
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.fade').forEach(function (el) {
    observer.observe(el);
  });
})();
