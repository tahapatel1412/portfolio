(() => {
  const $ = s => document.querySelector(s);
  const links = $('#nav-links'), toggle = $('#nav-toggle'), top = $('#back-to-top'), form = $('#contact-form');

  // menu mobile
  toggle.setAttribute('aria-expanded', 'false');
  const setMenu = open => {
    links.classList.toggle('open', open);
    toggle.classList.toggle('active', open);
    toggle.setAttribute('aria-expanded', open);
  };
  toggle.addEventListener('click', () => setMenu(!links.classList.contains('open')));
  links.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });

  // retour en haut
  top.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));
  addEventListener('scroll', () => top.classList.toggle('visible', scrollY > 600), { passive: true });

  // lien actif dans la nav
  const map = new Map([...links.querySelectorAll('a')].map(a => [a.getAttribute('href').slice(1), a]));
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (!e.isIntersecting) return;
    map.forEach(a => a.classList.remove('active'));
    map.get(e.target.id)?.classList.add('active');
  }), { rootMargin: '-45% 0px -50% 0px' });
  map.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });

  // formulaire : ouvre la messagerie avec le message prérempli
  form.addEventListener('submit', e => {
    e.preventDefault();
    const d = new FormData(form);
    const body = `${d.get('message')}\n\n${d.get('name')} (${d.get('email')})`;
    location.href = `mailto:tahapatel1412@gmail.com?subject=${encodeURIComponent(d.get('subject'))}&body=${encodeURIComponent(body)}`;
    let s = form.querySelector('.form-status');
    if (!s) { s = document.createElement('p'); s.className = 'form-status'; s.setAttribute('role', 'status'); form.append(s); }
    s.textContent = 'Votre messagerie va s’ouvrir pour envoyer le message.';
  });
})();
