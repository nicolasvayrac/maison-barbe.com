// Maison Barbé — comportements partagés
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  const onScroll = () => {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
    document.querySelectorAll('.to-top').forEach(btn=>{
      if (window.scrollY > 600) btn.classList.add('show'); else btn.classList.remove('show');
    });
  };
  window.addEventListener('scroll', onScroll, { passive:true });
  onScroll();

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      links.classList.toggle('open');
      nav.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      toggle.classList.remove('open'); links.classList.remove('open'); nav.classList.remove('open');
    }));
  }

  // smooth scroll for in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          window.scrollTo({ top: target.offsetTop - 84, behavior: 'smooth' });
        }
      }
    });
  });

  // fade-in on scroll
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('in'); });
  }, { threshold: 0.12 });
  document.querySelectorAll('.fi').forEach(el => io.observe(el));
  // safety net: never leave content permanently hidden
  setTimeout(() => document.querySelectorAll('.fi').forEach(el => el.classList.add('in')), 1800);

  // contact form (static site — mailto fallback)
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const data = new FormData(form);
      const subject = encodeURIComponent('Contact site — ' + (data.get('objet') || 'Demande'));
      const body = encodeURIComponent(
        `Prénom : ${data.get('prenom')||''}\nNom : ${data.get('nom')||''}\nEmail : ${data.get('email')||''}\nTéléphone : ${data.get('telephone')||''}\n\nMessage :\n${data.get('message')||''}`
      );
      window.location.href = `mailto:contact@maison-barbe.com?subject=${subject}&body=${body}`;
    });
  }

  // lightbox for gallery pages
  const lb = document.getElementById('lightbox');
  if (lb) {
    const lbImg = document.getElementById('lb-img');
    document.querySelectorAll('[data-lightbox]').forEach(img => {
      img.addEventListener('click', () => {
        lbImg.src = img.getAttribute('src');
        lbImg.alt = img.getAttribute('alt') || '';
        lb.classList.add('open');
      });
    });
    lb.addEventListener('click', () => lb.classList.remove('open'));
  }
});
