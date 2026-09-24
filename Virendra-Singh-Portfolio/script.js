const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

const nav = $('#nav');
const menuBtn = $('#menuBtn');
const themeBtn = $('#themeBtn');

menuBtn.addEventListener('click', () => {
  nav.classList.toggle('open');
  menuBtn.textContent = nav.classList.contains('open') ? '×' : '☰';
});

$$('#nav a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuBtn.textContent = '☰';
}));

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('light');
  themeBtn.textContent = document.body.classList.contains('light') ? '☾' : '☼';
  localStorage.setItem('portfolio-theme', document.body.classList.contains('light') ? 'light' : 'dark');
});

if (localStorage.getItem('portfolio-theme') === 'light') {
  document.body.classList.add('light');
  themeBtn.textContent = '☾';
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

$$('.reveal').forEach(el => observer.observe(el));

const sections = $$('main section[id]');
const navLinks = $$('#nav a');

window.addEventListener('scroll', () => {
  let current = 'home';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 180) current = section.id;
  });
  navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + current));
}, { passive: true });

const cursor = $('.cursor');
const dot = $('.cursor-dot');
window.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  dot.style.left = e.clientX + 'px';
  dot.style.top = e.clientY + 'px';
});

$$('a,button,.skill-card,.project-card').forEach(el => {
  el.addEventListener('mouseenter', () => cursor && (cursor.style.transform = 'translate(-50%,-50%) scale(1.6)'));
  el.addEventListener('mouseleave', () => cursor && (cursor.style.transform = 'translate(-50%,-50%) scale(1)'));
});

$$('[data-tilt]').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - .5) * 8;
    const y = ((e.clientY - r.top) / r.height - .5) * -8;
    card.style.transform = `perspective(700px) rotateX(${y}deg) rotateY(${x}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => card.style.transform = '');
});

$('#contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const name = $('#name').value.trim();
  const email = $('#email').value.trim();
  const message = $('#message').value.trim();
  const status = $('#formStatus');
  const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  status.textContent = 'Opening your email app...';
  window.location.href = `mailto:vsvirendrasingh1708@gmail.com?subject=${subject}&body=${body}`;
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    nav.classList.remove('open');
    menuBtn.textContent = '☰';
  }
});
