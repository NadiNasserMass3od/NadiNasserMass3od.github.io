// Mobile nav
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');

toggle.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});

links.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    links.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  })
);

// Scroll reveal
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

const revealEls = [...document.querySelectorAll('.section, .card, .skill-col')];
revealEls.forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

// Fallback so content can never stay hidden if the observer misfires
const revealCheck = () => revealEls.forEach(el => {
  if (!el.classList.contains('visible') &&
      el.getBoundingClientRect().top < window.innerHeight * 0.92) {
    el.classList.add('visible');
  }
});
window.addEventListener('scroll', revealCheck, { passive: true });
window.addEventListener('load', revealCheck);
revealCheck();
