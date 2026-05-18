// ─── TABS ────────────────────────────────────────────────────────────────────
function showTab(btn, id) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('on'));
  document.querySelectorAll('.skills-g').forEach(g => (g.style.display = 'none'));
  btn.classList.add('on');
  document.getElementById(id).style.display = 'grid';
}

// ─── CURSOR CUSTOMIZADO ───────────────────────────────────────────────────────
const cur = document.getElementById('cur');
const curRing = document.getElementById('curRing');
if (cur && curRing) {
  document.addEventListener('mousemove', e => {
    cur.style.left = e.clientX + 'px';
    cur.style.top = e.clientY + 'px';
    curRing.style.left = e.clientX + 'px';
    curRing.style.top = e.clientY + 'px';
  });
}

// ─── SCROLL FADE ─────────────────────────────────────────────────────────────
const observer = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
  { threshold: 0.15 }
);
document.querySelectorAll('.fade').forEach(el => observer.observe(el));

// ─── VALIDAÇÃO DO FORMULÁRIO ──────────────────────────────────────────────────
(function () {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const fieldNome     = document.getElementById('field-nome');
  const fieldEmail    = document.getElementById('field-email');
  const fieldMensagem = document.getElementById('field-mensagem');

  const errNome     = document.getElementById('err-nome');
  const errEmail    = document.getElementById('err-email');
  const errMensagem = document.getElementById('err-mensagem');

  const modal      = document.getElementById('success-modal');
  const modalClose = document.getElementById('modal-close');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function clearError(input, errEl) {
    input.classList.remove('input-error');
    errEl.textContent = '';
    errEl.style.display = 'none';
  }

  function showError(input, errEl, msg) {
    input.classList.add('input-error');
    errEl.textContent = msg;
    errEl.style.display = 'block';
  }

  function validate() {
    let valid = true;

    clearError(fieldNome, errNome);
    clearError(fieldEmail, errEmail);
    clearError(fieldMensagem, errMensagem);

    if (fieldNome.value.trim().length < 3) {
      showError(fieldNome, errNome, '⚠️ O nome deve ter pelo menos 3 caracteres.');
      valid = false;
    }

    if (!emailRegex.test(fieldEmail.value.trim())) {
      showError(fieldEmail, errEmail, '⚠️ Informe um e-mail válido (ex: voce@email.com).');
      valid = false;
    }

    if (fieldMensagem.value.trim().length < 10) {
      showError(fieldMensagem, errMensagem, '⚠️ A mensagem deve ter pelo menos 10 caracteres.');
      valid = false;
    }

    return valid;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validate()) return;

    const dados = {
      nome: fieldNome.value.trim(),
      email: fieldEmail.value.trim(),
      mensagem: fieldMensagem.value.trim()
    };
    console.log('📨 Dados do formulário a serem enviados:', dados);

    modal.style.display = 'flex';
    form.reset();
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => { modal.style.display = 'none'; });
  }

  modal.addEventListener('click', function (e) {
    if (e.target === modal) modal.style.display = 'none';
  });

  fieldNome.addEventListener('input', () => clearError(fieldNome, errNome));
  fieldEmail.addEventListener('input', () => clearError(fieldEmail, errEmail));
  fieldMensagem.addEventListener('input', () => clearError(fieldMensagem, errMensagem));
})();
