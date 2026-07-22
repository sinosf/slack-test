// ===== Scroll-reveal: animate cards into view =====
const revealCards = () => {
  const cards = document.querySelectorAll('.card');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  cards.forEach((card) => observer.observe(card));
};

// ===== Typing effect for the hero heading =====
const typeWriter = (el, text, speed = 80) => {
  el.textContent = '';
  let i = 0;
  const tick = () => {
    if (i < text.length) {
      el.textContent += text[i++];
      setTimeout(tick, speed);
    }
  };
  tick();
};

// ===== Button ripple effect =====
const addRipple = (e) => {
  const btn = e.currentTarget;
  const circle = document.createElement('span');
  const diameter = Math.max(btn.clientWidth, btn.clientHeight);
  const radius = diameter / 2;
  circle.style.cssText = `
    width: ${diameter}px;
    height: ${diameter}px;
    left: ${e.clientX - btn.getBoundingClientRect().left - radius}px;
    top:  ${e.clientY - btn.getBoundingClientRect().top  - radius}px;
    position: absolute;
    border-radius: 50%;
    background: rgba(255,255,255,0.35);
    transform: scale(0);
    animation: ripple 0.55s linear;
    pointer-events: none;
  `;
  // inject ripple keyframes once
  if (!document.getElementById('ripple-style')) {
    const style = document.createElement('style');
    style.id = 'ripple-style';
    style.textContent = '@keyframes ripple { to { transform: scale(3); opacity: 0; } }';
    document.head.appendChild(style);
  }
  btn.style.position = 'relative';
  btn.style.overflow = 'hidden';
  btn.appendChild(circle);
  circle.addEventListener('animationend', () => circle.remove());
};

// ===== Colour-cycle background on header =====
const cycleBg = () => {
  const header = document.querySelector('header');
  if (!header) return;
  const gradients = [
    'linear-gradient(135deg, #4f46e5, #ec4899, #f59e0b)',
    'linear-gradient(135deg, #10b981, #4f46e5, #ec4899)',
    'linear-gradient(135deg, #f59e0b, #ef4444, #4f46e5)',
    'linear-gradient(135deg, #ec4899, #10b981, #818cf8)',
  ];
  let idx = 0;
  setInterval(() => {
    idx = (idx + 1) % gradients.length;
    header.style.background = gradients[idx];
    header.style.transition = 'background 1.5s ease';
  }, 3000);
};

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
  revealCards();
  cycleBg();

  const heading = document.querySelector('header h1');
  if (heading) typeWriter(heading, heading.textContent);

  document.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('click', addRipple);
  });
});
