// JS mínimo e progressivo: o site funciona 100% sem ele.
(() => {
  const d = document;
  d.documentElement.classList.add('js');

  // Header com borda ao rolar
  const header = d.querySelector('.site-header');
  const onScroll = () => header && header.classList.toggle('scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Menu mobile
  const toggle = d.querySelector('.menu-toggle');
  const menu = d.getElementById('menu');
  if (toggle && menu) {
    const setOpen = (open) => {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
      menu.classList.toggle('open', open);
    };
    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    menu.addEventListener('click', (e) => e.target.closest('a') && setOpen(false));
    d.addEventListener('keydown', (e) => e.key === 'Escape' && setOpen(false));
  }

  // Revelar ao rolar
  const items = d.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && items.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach((el) => io.observe(el));
  } else {
    items.forEach((el) => el.classList.add('in'));
  }

  // Formulário de contato → WhatsApp (sem backend, sem coleta de dados no servidor)
  const form = d.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.reportValidity()) return;
      const f = new FormData(form);
      const lines = [
        'Olá, André! Vim pelo site.',
        `*Nome:* ${f.get('nome')}`,
        f.get('empresa') ? `*Empresa:* ${f.get('empresa')}` : '',
        `*E-mail:* ${f.get('email')}`,
        `*Interesse:* ${f.get('assunto')}`,
        '',
        String(f.get('mensagem') || ''),
      ].filter((l, i, a) => l !== '' || a[i - 1] !== '');
      const url = `https://wa.me/${form.dataset.wa}?text=${encodeURIComponent(lines.join('\n'))}`;
      window.open(url, '_blank', 'noopener');
      if (window.dataLayer) window.dataLayer.push({ event: 'generate_lead', method: 'whatsapp_form' });
    });
  }

  // Evento de conversão em cliques de WhatsApp/e-mail/telefone (se houver GA4/GTM)
  d.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="https://wa.me"],a[href^="mailto:"],a[href^="tel:"]');
    if (a && window.dataLayer) {
      window.dataLayer.push({ event: 'contact_click', method: a.href.split(':')[0].replace('https', 'whatsapp') });
    }
  });

  // Botão de som nos vídeos em reprodução automática no mudo
  d.querySelectorAll('.video-mute-btn').forEach((btn) => {
    const stage = btn.closest('.page-hero-stage, .salto-frame');
    const vid = stage && stage.querySelector('video');
    if (!vid) return;
    const sync = () => {
      const on = !vid.muted;
      btn.setAttribute('aria-pressed', String(on));
      btn.setAttribute('aria-label', on ? 'Desativar áudio do vídeo' : 'Ativar áudio do vídeo');
      const label = btn.querySelector('span');
      if (label) label.textContent = on ? 'Mutar' : 'Ativar som';
      const x = btn.querySelector('.mute-x');
      const w = btn.querySelector('.sound-waves');
      if (x) x.style.display = on ? 'none' : '';
      if (w) w.style.display = on ? '' : 'none';
    };
    btn.addEventListener('click', () => {
      vid.muted = !vid.muted;
      if (!vid.muted) vid.play().catch(() => {});
      sync();
    });
    sync();
  });
})();

