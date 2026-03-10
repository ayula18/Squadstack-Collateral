/* ═══════════════════════════════════════════════════
   SquadStack Expansion Playbook — Interactivity
   ═══════════════════════════════════════════════════ */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── Navigation ───
const nav = document.getElementById('main-nav');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

function handleNavScroll() {
  if (window.scrollY > 80) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }

  // Active link tracking
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 200;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', handleNavScroll, { passive: true });

// ─── Hero Animations ───
const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

heroTimeline
  .to('.hero-badge', { opacity: 1, y: 0, duration: 0.8, delay: 0.3 })
  .to('.hero-title-line-1', { opacity: 1, y: 0, duration: 0.8 }, '-=0.4')
  .to('.hero-title-line-2', { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
  .to('.hero-subtitle', { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
  .to('.hero-stats', { opacity: 1, y: 0, duration: 0.8 }, '-=0.4')
  .to('.hero-cta', { opacity: 1, y: 0, duration: 0.8 }, '-=0.4');

// ─── Animated Counters ───
function animateCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  gsap.to(el, {
    innerText: target,
    duration: 1.8,
    ease: 'power2.out',
    snap: { innerText: 1 },
    scrollTrigger: {
      trigger: el,
      start: 'top 85%',
      once: true,
    },
  });
}

// Hero stat counters - run immediately after hero animation
heroTimeline.call(() => {
  document.querySelectorAll('.hero-stat-value').forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    gsap.to(el, {
      innerText: target,
      duration: 1.5,
      ease: 'power2.out',
      snap: { innerText: 1 },
    });
  });
});

// ─── First Principles Section ───
gsap.to('#equation-card', {
  opacity: 1,
  y: 0,
  duration: 0.8,
  scrollTrigger: {
    trigger: '#equation-card',
    start: 'top 80%',
    once: true,
  },
});

document.querySelectorAll('.mece-card').forEach((card, i) => {
  gsap.to(card, {
    opacity: 1,
    y: 0,
    duration: 0.7,
    delay: i * 0.12,
    scrollTrigger: {
      trigger: card,
      start: 'top 85%',
      once: true,
    },
  });
});

// ─── Vertical Tabs ───
const verticalTabs = document.querySelectorAll('.vertical-tab');
const verticalPanels = document.querySelectorAll('.vertical-panel');

verticalTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const vertical = tab.dataset.vertical;

    // Update tabs
    verticalTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    // Update panels
    verticalPanels.forEach(p => p.classList.remove('active'));
    document.getElementById(`panel-${vertical}`).classList.add('active');

    // Animate score counter in the active panel
    const scoreEl = document.querySelector(`#panel-${vertical} .score-number`);
    if (scoreEl) {
      scoreEl.innerText = '0';
      const target = parseInt(scoreEl.dataset.count, 10);
      gsap.to(scoreEl, {
        innerText: target,
        duration: 1,
        ease: 'power2.out',
        snap: { innerText: 1 },
      });
    }
  });
});

// Trigger initial score counter animation when section comes into view
ScrollTrigger.create({
  trigger: '#verticals',
  start: 'top 70%',
  once: true,
  onEnter: () => {
    const activeScore = document.querySelector('.vertical-panel.active .score-number');
    if (activeScore) {
      const target = parseInt(activeScore.dataset.count, 10);
      gsap.to(activeScore, {
        innerText: target,
        duration: 1.2,
        ease: 'power2.out',
        snap: { innerText: 1 },
      });
    }
  },
});

// ─── Matrix Bar Animations ───
const matrixBars = document.querySelectorAll('.matrix-bar');

matrixBars.forEach(bar => {
  const score = parseInt(bar.dataset.score, 10);
  const max = parseInt(bar.dataset.max, 10);
  const pct = (score / max) * 100;
  bar.style.setProperty('--score-pct', pct);
});

gsap.to('#matrix-container', {
  opacity: 1,
  y: 0,
  duration: 0.8,
  scrollTrigger: {
    trigger: '#matrix-container',
    start: 'top 80%',
    once: true,
    onEnter: () => {
      matrixBars.forEach((bar, i) => {
        setTimeout(() => bar.classList.add('animated'), i * 100);
      });
    },
  },
});

// ─── GTM Blocks ───
document.querySelectorAll('.gtm-block').forEach((block, i) => {
  gsap.to(block, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    delay: i * 0.15,
    scrollTrigger: {
      trigger: block,
      start: 'top 80%',
      once: true,
    },
  });
});

// ─── Scorecard Table ───
gsap.to('#scorecard-table', {
  opacity: 1,
  y: 0,
  duration: 0.8,
  scrollTrigger: {
    trigger: '#scorecard-table',
    start: 'top 80%',
    once: true,
  },
});

// ─── Execution Timeline Phases ───
document.querySelectorAll('.exec-phase').forEach((phase, i) => {
  gsap.to(phase, {
    opacity: 1,
    y: 0,
    duration: 0.7,
    delay: i * 0.2,
    scrollTrigger: {
      trigger: phase,
      start: 'top 85%',
      once: true,
    },
  });
});

// Result counter
ScrollTrigger.create({
  trigger: '.execution-result',
  start: 'top 85%',
  once: true,
  onEnter: () => {
    const resultNum = document.querySelector('.result-number');
    if (resultNum) {
      const target = parseInt(resultNum.dataset.count, 10);
      gsap.to(resultNum, {
        innerText: target,
        duration: 1.2,
        ease: 'power2.out',
        snap: { innerText: 1 },
      });
    }
  },
});

// ─── Smooth scroll for anchor links ───
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ─── Equation hover effects ───
document.querySelectorAll('.eq-var').forEach(v => {
  v.addEventListener('mouseenter', () => {
    gsap.to(v, { scale: 1.08, duration: 0.3, ease: 'back.out(2)' });
  });
  v.addEventListener('mouseleave', () => {
    gsap.to(v, { scale: 1, duration: 0.3, ease: 'power2.out' });
  });
});
