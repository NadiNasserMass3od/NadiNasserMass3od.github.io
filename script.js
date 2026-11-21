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

// Looping typewriter: type a phrase, pause, erase, next phrase
const typer = document.getElementById('typer');
if (typer) {
  const phrases = [
    "// I'm a Flutter developer",
    "// I'm an embedded engineer",
    "// I build & ship real apps"
  ];
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    typer.textContent = phrases[0];
  } else {
    let pi = 0, ci = 0, deleting = false;
    typer.textContent = '';
    const tick = () => {
      const p = phrases[pi];
      ci += deleting ? -1 : 1;
      typer.textContent = p.slice(0, ci);
      let delay = deleting ? 30 : 58;
      if (!deleting && ci === p.length) {
        deleting = true;
        delay = 1800;
      } else if (deleting && ci === 0) {
        deleting = false;
        pi = (pi + 1) % phrases.length;
        delay = 450;
      }
      setTimeout(tick, delay);
    };
    setTimeout(tick, 500);
  }
}
