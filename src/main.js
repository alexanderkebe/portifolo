import { defaultProjects, services, skills, experience, education, certifications } from './data/projects.js';
import { initBackground } from './utils/background.js';
import { initPhysicsSandbox } from './utils/physics-sandbox.js';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ── Get projects from localStorage or defaults ──
function getProjects() {
  const stored = localStorage.getItem('portfolio_projects');
  if (stored) {
    try { return JSON.parse(stored); } catch(e) { /* fall through */ }
  }
  return defaultProjects;
}

// ── Render Services ──
function renderServices() {
  const stack = document.getElementById('servicesStack');
  if (!stack) return;
  // Reverse the array so the first item is rendered last in DOM (top of stack)
  const reversedServices = [...services].reverse();
  stack.innerHTML = reversedServices.map((s, i) => `
    <div class="service-card">
      <div class="service-spotlight"></div>
      <div class="service-icon">${s.icon}</div>
      <div class="service-content">
        <h3>${s.title}</h3>
        <p>${s.desc}</p>
      </div>
    </div>
  `).join('');
}

// ── Tinder Services Swipe Logic ──
function initServicesTinder() {
  const stackContainer = document.getElementById('servicesStack');
  if (!stackContainer) return;

  const cards = gsap.utils.toArray('.service-card', stackContainer);
  if (cards.length === 0) return;

  // The cards array is currently [bottom-most DOM, ..., top-most DOM].
  // Top-most DOM is visually in front (index cards.length - 1).
  // We want to animate the top-most card first. So we reverse the array for logic.
  const logicalCards = [...cards].reverse();

  // Set initial stacked physics
  logicalCards.forEach((card, i) => {
    gsap.set(card, {
      scale: 1 - (i * 0.05),
      y: i * 20,
      zIndex: logicalCards.length - i
    });
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '#services',
      pin: true,
      scrub: 1,
      start: 'center center',
      end: '+=2500' // duration of scroll for the whole stack
    }
  });

  // Animate swiping for all except the very bottom card
  logicalCards.slice(0, logicalCards.length - 1).forEach((card, i) => {
    const isEven = i % 2 === 0;
    const swipeX = isEven ? window.innerWidth : -window.innerWidth;
    const swipeRotation = isEven ? 30 : -30;

    tl.to(card, {
      x: swipeX,
      rotation: swipeRotation,
      opacity: 0,
      ease: 'power2.inOut'
    }, `step${i}`);

    // Scale up the cards beneath it
    logicalCards.slice(i + 1).forEach((nextCard, j) => {
      tl.to(nextCard, {
        scale: 1 - (j * 0.05),
        y: j * 20,
        ease: 'power2.inOut'
      }, `step${i}`);
    });
  });
}

// ── Device mockup HTML ──
function deviceHTML(project) {
  const screenContent = project.screenshot
    ? `<img src="${project.screenshot}" alt="${project.title}" loading="lazy" />`
    : `<div class="device-screen-placeholder">${project.title}</div>`;

  if (project.device === 'phone') {
    return `<div class="device-phone"><div class="device-screen">${screenContent}</div></div>`;
  }
  if (project.device === 'desktop-phone') {
    const phoneContent = project.screenshot
      ? `<img src="${project.screenshot}" alt="${project.title} mobile" loading="lazy" />`
      : `<div class="device-screen-placeholder">Mobile</div>`;
    return `
      <div class="device-group">
        <div class="device-desktop"><div class="device-screen">${screenContent}</div></div>
        <div class="device-phone"><div class="device-screen">${phoneContent}</div></div>
      </div>`;
  }
  // default: desktop
  return `<div class="device-desktop"><div class="device-screen">${screenContent}</div></div>`;
}

// ── Render Projects ──
function renderProjects() {
  const codeGrid = document.getElementById('codeProjectsGrid');
  const designGrid = document.getElementById('designGrid');
  if (!codeGrid && !designGrid) return;
  
  const allProjects = getProjects();
  
  // Render Code Projects
  if (codeGrid) {
    const codeProjects = allProjects.filter(p => p.type === 'code');
    codeGrid.innerHTML = codeProjects.map((p, i) => `
      <div class="project-card reveal reveal-delay-${(i % 3) + 1}">
        <div class="project-mockup">${deviceHTML(p)}</div>
        <div class="project-info">
          <span class="project-tag">${p.category}</span>
          <h3 class="project-title">${p.title}</h3>
          <p class="project-desc">${p.description}</p>
          <div class="project-tech">
            ${p.tech.map(t => `<span class="tech-pill">${t}</span>`).join('')}
          </div>
          ${p.url ? `<a href="${p.url}" target="_blank" class="project-link">View Project <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>` : ''}
        </div>
      </div>
    `).join('');
  }

  // Render Design Projects
  if (designGrid) {
    const designProjects = allProjects.filter(p => p.type === 'design');
    designGrid.innerHTML = `
      <div class="design-gallery">
        ${designProjects.map((p, i) => `
          <div class="design-item reveal reveal-delay-${(i % 3) + 1}">
            <div class="design-image-wrapper">
              ${p.screenshot ? `<img src="${p.screenshot}" alt="${p.title}" loading="lazy" />` : `<div class="design-placeholder">${p.title}</div>`}
              <div class="design-overlay">
                <span class="design-cat">${p.category}</span>
                <h4 class="design-title">${p.title}</h4>
                <div class="design-tech-mini">${p.tech.join(' · ')}</div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }
}

// ── Render Experience ──
function renderExperience() {
  const timeline = document.getElementById('experienceTimeline');
  if (!timeline) return;
  timeline.innerHTML = experience.map((e, i) => `
    <div class="timeline-item reveal reveal-delay-${(i % 3) + 1}">
      <div class="timeline-dot"></div>
      <div class="timeline-date">${e.date}</div>
      <div class="timeline-title">${e.title}</div>
      <div class="timeline-company">${e.company}</div>
      <ul class="timeline-tasks">
        ${e.tasks.map(t => `<li>${t}</li>`).join('')}
      </ul>
    </div>
  `).join('');
}

// ── Render Skills ──
function renderSkills() {
  const grid = document.getElementById('skillsGrid');
  if (!grid) return;
  grid.innerHTML = skills.map((s, i) => `
    <div class="skill-category reveal reveal-delay-${(i % 4) + 1}">
      <div class="skill-cat-title">${s.category}</div>
      <div class="skill-pills">
        ${s.items.map(item => `<span class="skill-pill">${item}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

// ── Render Education ──
function renderEducation() {
  const eduCards = document.getElementById('educationCards');
  if (!eduCards) return;
  eduCards.innerHTML = education.map((e, i) => `
    <div class="edu-card reveal reveal-delay-${i + 1}">
      <div class="edu-card-date">${e.date}</div>
      <div class="edu-card-title">${e.title}</div>
      <div class="edu-card-school">${e.school}</div>
      <div class="edu-card-desc">${e.desc}</div>
    </div>
  `).join('');

  const certCardsEl = document.getElementById('certCards');
  if (!certCardsEl) return;
  certCardsEl.innerHTML = certifications.map((c, i) => `
    <div class="edu-card reveal reveal-delay-${i + 1}">
      <div class="edu-card-date">${c.date}</div>
      <div class="edu-card-title">${c.title}</div>
      <div class="edu-card-school">${c.issuer}</div>
      <a href="${c.url}" target="_blank" class="cert-link">Verify Certificate →</a>
    </div>
  `).join('');
}

// ── Navbar scroll effect, sliding mercury pill, and liquid canvas trail ──
function initNavbar() {
  const nav = document.getElementById('navbar');
  const hamburger = document.getElementById('navHamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  });

  // Close mobile menu on link click
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // ── Liquid Mercury sliding pill ──
  const pill = document.getElementById('navMercuryPill');
  const navLinksContainer = document.getElementById('navLinks');
  const links = navLinksContainer.querySelectorAll('.nav-link');

  function updatePillPosition(link, animate = true) {
    if (!pill || !link) return;
    const left = link.offsetLeft;
    const width = link.offsetWidth;

    gsap.to(pill, {
      left: left,
      width: width,
      opacity: 1,
      scale: 1,
      duration: animate ? 0.35 : 0,
      ease: "power3.out"
    });
  }

  links.forEach(link => {
    link.addEventListener('mouseenter', () => {
      updatePillPosition(link);
    });
  });

  navLinksContainer.addEventListener('mouseleave', () => {
    // Snap back to current active section link
    const activeLink = navLinksContainer.querySelector('.nav-link.active');
    if (activeLink) {
      updatePillPosition(activeLink);
    } else {
      gsap.to(pill, {
        opacity: 0,
        scale: 0.9,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  });

  // ── Liquid Mercury Canvas Animation ──
  const canvas = document.getElementById('navbarMercuryCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: null, y: null, active: false };

    function resizeCanvas() {
      const rect = nav.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    nav.addEventListener('mousemove', (e) => {
      const rect = nav.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;

      // Spawn liquid mercury balls
      if (Math.random() < 0.45) {
        particles.push({
          x: mouse.x,
          y: mouse.y,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.2,
          radius: Math.random() * 12 + 8,
          alpha: 1,
          decay: Math.random() * 0.015 + 0.012
        });
      }
    });

    nav.addEventListener('mouseleave', () => {
      mouse.active = false;
    });

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw white blobs which the CSS blur/contrast filter will merge organically
      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * p.alpha, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(draw);
    }
    draw();
  }
}

// ── Scroll reveal (Intersection Observer) ──
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ── Contact form ──
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('formName').value;
    const email = document.getElementById('formEmail').value;
    const message = document.getElementById('formMessage').value;
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:alexanderkebe@gmail.com?subject=${subject}&body=${body}`;
    form.reset();
  });
}

// ── Smooth scroll for anchor links ──
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ── Active nav link highlight ──
function initActiveNav() {
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.nav-link');
  const pill = document.getElementById('navMercuryPill');
  const navLinksContainer = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 100;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });
    
    let anyActive = false;
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
        anyActive = true;
        
        // If navbar is not hovered, snap pill to this active item!
        const isHovered = navLinksContainer.matches(':hover');
        if (!isHovered && pill) {
          gsap.to(pill, {
            left: link.offsetLeft,
            width: link.offsetWidth,
            opacity: 1,
            scale: 1,
            duration: 0.35,
            ease: "power3.out"
          });
        }
      }
    });

    if (!anyActive && pill && !navLinksContainer.matches(':hover')) {
      gsap.to(pill, {
        opacity: 0,
        scale: 0.9,
        duration: 0.35,
        ease: "power3.out"
      });
    }
  });
}

// ── Horizontal Parallax About ──
function initAboutCinematic() {
  const section = document.querySelector('.hz-about');
  const track = document.querySelector('.hz-about__track');
  if (!section || !track) return;

  const mm = gsap.matchMedia();

  // Desktop only (screens wider than 1024px)
  mm.add("(min-width: 1025px)", () => {
    const panels = track.querySelectorAll('.hz-panel');

    // Horizontal scroll driven by vertical scrolling
    const scrollTween = gsap.to(track, {
      x: () => -(track.scrollWidth - window.innerWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => '+=' + (track.scrollWidth - window.innerWidth),
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    });

    // Per-panel parallax background text only
    panels.forEach((panel) => {
      const bgText = panel.querySelector('.hz-panel__bg-text');
      if (bgText) {
        gsap.fromTo(bgText, { x: 100 }, {
          x: -150,
          scrollTrigger: {
            trigger: panel,
            containerAnimation: scrollTween,
            start: 'left right',
            end: 'right left',
            scrub: 1,
          }
        });
      }
    });
  });
}

// ── Custom Cursor & Magnetic Effect ──
function initCursor() {
  const dot = document.getElementById('cursorDot');
  const outline = document.getElementById('cursorOutline');
  const ring1 = document.getElementById('cursorRing1');
  const ring2 = document.getElementById('cursorRing2');
  if (!dot || !outline || !ring1 || !ring2) return;

  const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const mouse = { x: pos.x, y: pos.y };
  
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  const xSetDot = gsap.quickSetter(dot, "x", "px");
  const ySetDot = gsap.quickSetter(dot, "y", "px");
  const xSetOutline = gsap.quickSetter(outline, "x", "px");
  const ySetOutline = gsap.quickSetter(outline, "y", "px");
  const xSetRing1 = gsap.quickSetter(ring1, "x", "px");
  const ySetRing1 = gsap.quickSetter(ring1, "y", "px");
  const xSetRing2 = gsap.quickSetter(ring2, "x", "px");
  const ySetRing2 = gsap.quickSetter(ring2, "y", "px");

  // Initial rotations
  gsap.set([ring1, ring2], { rotationX: 45, rotationY: 45 });

  gsap.ticker.add(() => {
    // Smoother follow for different elements
    pos.x += (mouse.x - pos.x) * 0.2;
    pos.y += (mouse.y - pos.y) * 0.2;
    
    xSetDot(mouse.x - 4);
    ySetDot(mouse.y - 4);
    xSetOutline(pos.x - 20);
    ySetOutline(pos.y - 20);
    
    // Rings follow even slower for 'depth'
    const r1X = gsap.getProperty(ring1, "x") + (mouse.x - gsap.getProperty(ring1, "x") - 30) * 0.1;
    const r1Y = gsap.getProperty(ring1, "y") + (mouse.y - gsap.getProperty(ring1, "y") - 30) * 0.1;
    const r2X = gsap.getProperty(ring2, "x") + (mouse.x - gsap.getProperty(ring2, "x") - 40) * 0.05;
    const r2Y = gsap.getProperty(ring2, "y") + (mouse.y - gsap.getProperty(ring2, "y") - 40) * 0.05;
    
    xSetRing1(r1X);
    ySetRing1(r1Y);
    xSetRing2(r2X);
    ySetRing2(r2Y);

    // Rotate rings based on time
    const time = gsap.ticker.time;
    gsap.set(ring1, { rotationZ: time * 50 });
    gsap.set(ring2, { rotationZ: -time * 30 });
  });

  // Magnetic Elements
  const magnetics = document.querySelectorAll('.btn, .social-icon-btn, .nav-link, .nav-cta, .nav-logo');
  magnetics.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(el, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: "power2.out"
      });
    });

    el.addEventListener('mouseleave', () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
    });
  });

  // Hover states
  const interactables = document.querySelectorAll('a, button, .project-card, .service-card, .design-item, .about-image-wrapper');
  interactables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-hover');
      gsap.to(outline, { scale: 1.5, duration: 0.3 });
      gsap.to([ring1, ring2], { opacity: 0.5, scale: 0.8, duration: 0.3 });
    });
    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-hover');
      gsap.to(outline, { scale: 1, duration: 0.3 });
      gsap.to([ring1, ring2], { opacity: 1, scale: 1, duration: 0.3 });
    });
  });
}

function initHeroStats() {
  const stats = document.querySelectorAll('.h-stat-num');
  
  stats.forEach(stat => {
    const text = stat.innerText;
    const targetValue = parseInt(text);
    const suffix = text.replace(/[0-9]/g, ''); 
    
    if (!isNaN(targetValue)) {
      stat.innerText = `0${suffix}`;
      
      const obj = { val: 0 };
      gsap.to(obj, {
        val: targetValue,
        scrollTrigger: {
          trigger: '.hero-stats-bottom',
          start: 'top 95%',
          once: true
        },
        duration: 2,
        ease: 'power2.out',
        onUpdate: () => {
          stat.innerText = Math.floor(obj.val) + suffix;
        },
        onComplete: () => {
          stat.innerText = targetValue + suffix;
        }
      });
    }
  });
}

// ── Initialize everything ──
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lenis
  const lenis = new Lenis();
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  initCursor();
  initBackground('hero-canvas');
  initBackground('services-canvas');
  initAboutCinematic();
  renderServices();
  initServicesTinder();
  renderProjects();
  renderExperience();
  renderSkills();
  renderEducation();
  initNavbar();
  initSmoothScroll();
  initContactForm();
  initActiveNav();
  initHeroStats();
  initPhysicsSandbox();

  // Marquee: set brand colors from data attributes
  document.querySelectorAll('.marquee-item[data-color]').forEach(el => {
    el.style.setProperty('--hover-color', el.dataset.color);
  });

  // Delay reveal init to allow DOM to settle
  requestAnimationFrame(() => {
    initReveal();
  });
});
