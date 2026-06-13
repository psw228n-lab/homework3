const revealItems = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.14 });

revealItems.forEach((item) => revealObserver.observe(item));

const counters = document.querySelectorAll('.count');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting || entry.target.dataset.done) return;
    entry.target.dataset.done = 'true';
    const target = Number(entry.target.dataset.count);
    const startedAt = performance.now();
    const duration = 850;

    function tick(now) {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      entry.target.textContent = Math.round(target * eased);
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
    counterObserver.unobserve(entry.target);
  });
}, { threshold: 0.7 });

counters.forEach((counter) => counterObserver.observe(counter));

const hero = document.querySelector('.hero');
const people = document.querySelector('.hero-people');
const pizza = document.querySelector('.hero-pizza');

if (hero && people && pizza && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  hero.addEventListener('mousemove', (event) => {
    const rect = hero.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    people.style.translate = `${x * -10}px ${y * -7}px`;
    pizza.style.translate = `${x * 16}px ${y * 12}px`;
  });

  hero.addEventListener('mouseleave', () => {
    people.style.translate = '0 0';
    pizza.style.translate = '0 0';
  });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
