/**
 * ANTI-GRAVITY PORTFOLIO — script.js
 * Mukesh P. | AI Engineer & Data Architect
 * Pure Vanilla JS — no dependencies
 */

'use strict';

/* ═══════════════════════════════════════════════
   1. CURSOR GLOW
═══════════════════════════════════════════════ */
(function initCursorGlow() {
  const glow = document.getElementById('cursor-glow');
  if (!glow) return;

  let mouseX = 0, mouseY = 0;
  let glowX = 0, glowY = 0;
  let rafId = null;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateGlow() {
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    glow.style.left = glowX + 'px';
    glow.style.top = glowY + 'px';
    rafId = requestAnimationFrame(animateGlow);
  }

  animateGlow();

  document.addEventListener('mouseleave', () => {
    glow.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    glow.style.opacity = '1';
  });
})();

/* ═══════════════════════════════════════════════
   2. NAVBAR — scroll + mobile menu
═══════════════════════════════════════════════ */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Scroll class
  const onScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link highlighting
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen.toString());
      mobileMenu.setAttribute('aria-hidden', (!isOpen).toString());
    });

    mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
      });
    });
  }
})();

/* ═══════════════════════════════════════════════
   3. INTERSECTION OBSERVER — scroll reveal
═══════════════════════════════════════════════ */
(function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger sibling reveals
        const siblings = entry.target.parentElement
          ? Array.from(entry.target.parentElement.querySelectorAll('.reveal-up, .reveal-left, .reveal-right'))
          : [];
        const siblingIndex = siblings.indexOf(entry.target);
        const delay = siblingIndex * 80;

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);

        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px',
  });

  revealEls.forEach(el => observer.observe(el));
})();

/* ═══════════════════════════════════════════════
   4. COUNTER ANIMATION — impact stat
═══════════════════════════════════════════════ */
(function initCounters() {
  const counterEls = document.querySelectorAll('.stat-number[data-target]');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const duration = 1800;
      const startTime = performance.now();

      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const ease = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(ease * target);

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        }
      }

      requestAnimationFrame(updateCounter);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  counterEls.forEach(el => counterObserver.observe(el));
})();

/* ═══════════════════════════════════════════════
   5. EXPERIENCE BAR ANIMATION
═══════════════════════════════════════════════ */
(function initExpBar() {
  const bars = document.querySelectorAll('.exp-impact-fill[data-width]');

  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const bar = entry.target;
      const targetWidth = bar.dataset.width + '%';
      setTimeout(() => {
        bar.style.width = targetWidth;
      }, 300);
      barObserver.unobserve(bar);
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => barObserver.observe(bar));
})();

/* ═══════════════════════════════════════════════
   6. SKILL BAR FILL
═══════════════════════════════════════════════ */
(function initSkillBars() {
  const skillBars = document.querySelectorAll('.skill-bar[data-width]');
  const skillPills = document.querySelectorAll('.skill-pill');

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      
      // Animate bar
      const pill = entry.target;
      const bar = pill.querySelector('.skill-bar');
      if (bar) {
        setTimeout(() => {
          bar.style.width = bar.dataset.width + '%';
        }, 200);
      }
      pill.classList.add('visible');
      skillObserver.unobserve(pill);
    });
  }, { threshold: 0.2 });

  skillPills.forEach(pill => skillObserver.observe(pill));
})();

/* ═══════════════════════════════════════════════
   7. 3D TILT EFFECT
═══════════════════════════════════════════════ */
(function init3DTilt() {
  const tiltCards = document.querySelectorAll('.tilt-card');
  const MAX_TILT = 8; // degrees
  const MAX_SCALE = 1.02;
  const PERSPECTIVE = 800;

  tiltCards.forEach(card => {
    let animFrame = null;
    let currentRotX = 0, currentRotY = 0;
    let targetRotX = 0, targetRotY = 0;

    function lerp(a, b, t) {
      return a + (b - a) * t;
    }

    function startLerp() {
      currentRotX = lerp(currentRotX, targetRotX, 0.1);
      currentRotY = lerp(currentRotY, targetRotY, 0.1);

      card.style.transform = `
        perspective(${PERSPECTIVE}px)
        rotateX(${currentRotX}deg)
        rotateY(${currentRotY}deg)
        scale3d(${MAX_SCALE}, ${MAX_SCALE}, ${MAX_SCALE})
      `;

      const diffX = Math.abs(currentRotX - targetRotX);
      const diffY = Math.abs(currentRotY - targetRotY);
      if (diffX > 0.01 || diffY > 0.01) {
        animFrame = requestAnimationFrame(startLerp);
      }
    }

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      targetRotY = (mouseX / (rect.width / 2)) * MAX_TILT;
      targetRotX = -(mouseY / (rect.height / 2)) * MAX_TILT;

      // Dynamic shimmer/highlight
      const percentX = ((e.clientX - rect.left) / rect.width) * 100;
      const percentY = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.background = `
        radial-gradient(
          circle at ${percentX}% ${percentY}%,
          rgba(129, 140, 248, 0.07) 0%,
          rgba(15, 21, 37, 0.6) 50%
        )
      `;

      cancelAnimationFrame(animFrame);
      animFrame = requestAnimationFrame(startLerp);
    });

    card.addEventListener('mouseleave', () => {
      targetRotX = 0;
      targetRotY = 0;
      card.style.background = '';
      card.style.transform = `
        perspective(${PERSPECTIVE}px)
        rotateX(0deg)
        rotateY(0deg)
        scale3d(1, 1, 1)
      `;
      cancelAnimationFrame(animFrame);
    });
  });
})();

/* ═══════════════════════════════════════════════
   8. AGRI GRID LIVE ANIMATION
═══════════════════════════════════════════════ */
(function initAgriGrid() {
  const agriCells = document.querySelectorAll('.agri-cell');
  if (!agriCells.length) return;

  function randomActivate() {
    agriCells.forEach(cell => cell.classList.remove('active'));
    const count = Math.floor(Math.random() * 3) + 3;
    const indices = new Set();
    while (indices.size < count) {
      indices.add(Math.floor(Math.random() * agriCells.length));
    }
    indices.forEach(i => agriCells[i].classList.add('active'));
  }

  setInterval(randomActivate, 1800);
})();

/* ═══════════════════════════════════════════════
   9. SMOOTH SCROLL for anchor links
═══════════════════════════════════════════════ */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();

/* ═══════════════════════════════════════════════
   10. PARTICLE FIELD (Hero Background)
═══════════════════════════════════════════════ */
(function initParticles() {
  const heroSection = document.getElementById('hero');
  if (!heroSection) return;

  const canvas = document.createElement('canvas');
  canvas.style.cssText = `
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
    opacity: 0.4;
  `;
  heroSection.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animRunning = true;

  function resize() {
    canvas.width = heroSection.offsetWidth;
    canvas.height = heroSection.offsetHeight;
  }

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.6 + 0.1;
      this.color = Math.random() > 0.5 ? '129,140,248' : '56,189,248';
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width ||
          this.y < 0 || this.y > canvas.height) {
        this.reset();
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
      ctx.fill();
    }
  }

  function init() {
    resize();
    particles = Array.from({ length: 80 }, () => new Particle());
  }

  function drawConnections() {
    const maxDist = 120;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.12;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(129,140,248,${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    if (!animRunning) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawConnections();
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }

  init();
  animate();

  const resizeObserver = new ResizeObserver(() => {
    resize();
  });
  resizeObserver.observe(heroSection);

  // Pause when offscreen
  const heroObserver = new IntersectionObserver((entries) => {
    animRunning = entries[0].isIntersecting;
    if (animRunning) animate();
  }, { threshold: 0 });
  heroObserver.observe(heroSection);
})();

/* ═══════════════════════════════════════════════
   11. HIRE ME BUTTON — ripple effect
═══════════════════════════════════════════════ */
(function initRipple() {
  const btn = document.getElementById('hire-btn');
  if (!btn) return;

  btn.addEventListener('click', (e) => {
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      transform: scale(0);
      background: rgba(255,255,255,0.25);
      animation: rippleAnim 0.5s linear;
      left: ${e.clientX - rect.left}px;
      top: ${e.clientY - rect.top}px;
      width: 80px; height: 80px;
      margin-left: -40px; margin-top: -40px;
      pointer-events: none;
    `;
    btn.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });

  // Inject ripple keyframes once
  if (!document.getElementById('ripple-style')) {
    const style = document.createElement('style');
    style.id = 'ripple-style';
    style.textContent = `
      @keyframes rippleAnim {
        to { transform: scale(4); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
})();

/* ═══════════════════════════════════════════════
   12. STAGGERED BENTO CARD reveals
═══════════════════════════════════════════════ */
(function initBentoReveal() {
  const bentoCards = document.querySelectorAll('.bento-card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (!entry.isIntersecting) return;
      const card = entry.target;
      const index = Array.from(bentoCards).indexOf(card);
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 120);
      observer.unobserve(card);
    });
  }, { threshold: 0.1 });

  bentoCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    observer.observe(card);
  });
})();

/* ═══════════════════════════════════════════════
   13. DYNAMIC SECTION TAG COLORS
═══════════════════════════════════════════════ */
(function initSectionTagColors() {
  const colors = [
    'var(--accent-cyan)',
    'var(--accent-violet)',
    'var(--accent-emerald)',
    'var(--accent-amber)',
    'var(--accent-cyan)',
    'var(--accent-violet)',
  ];
  document.querySelectorAll('.section-tag').forEach((tag, i) => {
    tag.style.color = colors[i % colors.length];
  });
})();

/* ═══════════════════════════════════════════════
   INIT COMPLETE
═══════════════════════════════════════════════ */
console.log(
  '%c[MP] Anti-Gravity Portfolio Loaded',
  'color: #818cf8; font-family: monospace; font-size: 14px; font-weight: bold;'
);
