// ===== Menu mobile =====
const mb = document.getElementById('mb');
const nav = document.getElementById('nav');
mb.addEventListener('click', () => nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => nav.classList.remove('open'))
);

// ===== Lien actif au scroll =====
const sections = document.querySelectorAll('section[id]');
const links = nav.querySelectorAll('a');
window.addEventListener('scroll', () => {
  let current = 'home';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  links.forEach(a =>
    a.classList.toggle('on', a.getAttribute('href') === '#' + current)
  );
});

// ===== Effet machine à écrire =====
const roles = [
  'Étudiante ingénieure',
  'Développeuse Web',
  'Passionnée de santé numérique',
  'Future ingénieure en IA'
];
const tw = document.getElementById('tw');
let r = 0, c = 0, del = false;
function type() {
  const word = roles[r];
  tw.textContent = word.substring(0, c);
  if (!del && c < word.length) { c++; setTimeout(type, 90); }
  else if (!del) { del = true; setTimeout(type, 1400); }
  else if (c > 0) { c--; setTimeout(type, 45); }
  else { del = false; r = (r + 1) % roles.length; setTimeout(type, 300); }
}
type();

// ===== Formulaire de contact (ouvre le mail) =====
document.getElementById('f').addEventListener('submit', e => {
  e.preventDefault();
  const nom = document.getElementById('n').value;
  const mail = document.getElementById('e').value;
  const tel = document.getElementById('p').value;
  const obj = document.getElementById('s').value;
  const msg = document.getElementById('m').value;
  const body = `Nom : ${nom}\nEmail : ${mail}\nMobile : ${tel}\n\n${msg}`;
  window.location.href =
    'mailto:kaoutharelazzab92@gmail.com?subject=' + encodeURIComponent(obj) +
    '&body=' + encodeURIComponent(body);
});

// ===== Zoom des images (lightbox) =====
const lb = document.getElementById('lb');
const lbimg = document.getElementById('lbimg');
document.querySelectorAll('.gallery img, .card-img').forEach(img => {
  img.addEventListener('click', () => {
    lbimg.src = img.src;
    lb.classList.add('show');
  });
});
lb.addEventListener('click', () => lb.classList.remove('show'));
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') lb.classList.remove('show');
});

// ===== Zoom aussi sur les images des cartes projets =====
document.querySelectorAll('.pcard-img').forEach(img => {
  img.addEventListener('click', () => {
    lbimg.src = img.src;
    lb.classList.add('show');
  });
});

// ===== Carrousel projets =====
const slider = document.getElementById('slider');
const dotsBox = document.getElementById('dots');
const cards = slider.querySelectorAll('.pcard');
cards.forEach((_, i) => {
  const d = document.createElement('span');
  d.addEventListener('click', () => slider.scrollTo({ left: cards[i].offsetLeft - slider.offsetLeft }));
  dotsBox.appendChild(d);
});
const dots = dotsBox.querySelectorAll('span');
function updateDots() {
  let idx = 0, min = Infinity;
  cards.forEach((c, i) => {
    const dist = Math.abs(c.offsetLeft - slider.offsetLeft - slider.scrollLeft);
    if (dist < min) { min = dist; idx = i; }
  });
  dots.forEach((d, i) => d.classList.toggle('on', i === idx));
}
slider.addEventListener('scroll', updateDots);
window.addEventListener('resize', updateDots);
updateDots();
const step = () => cards[0].offsetWidth + 28;
document.getElementById('next').addEventListener('click', () => slider.scrollBy({ left: step() }));
document.getElementById('prev').addEventListener('click', () => slider.scrollBy({ left: -step() }));

// ===== Apparition progressive au scroll =====
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      const el = en.target;
      el.classList.add('in');
      io.unobserve(el);
      // une fois l'animation finie, on rend à l'élément ses effets hover d'origine
      setTimeout(() => {
        el.classList.remove('reveal', 'in');
        el.style.transitionDelay = '';
      }, 1500);
    }
  });
}, { threshold: .15 });
document.querySelectorAll('.pcard, .box, .gallery img, .t').forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = (i % 4) * 0.1 + 's';
  io.observe(el);
});
