/* ═══════════════════════════════════════════════════════════════
   André Machado — Portfolio V3 Scrollytelling Engine
   Orchestrated by GSAP, ScrollTrigger and Lenis
   ═══════════════════════════════════════════════════════════════ */

(function() {
  'use strict';

  // 1. Initialize Lenis Smooth Scroll
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    infinite: false
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // 2. Register GSAP Plugins
  gsap.registerPlugin(ScrollTrigger);
  lenis.on('scroll', ScrollTrigger.update);

  // Set initial CSS variables for static bottom-left light source
  // Light is coming from bottom-left:
  // lx: -2, ly: 2
  const docEl = document.documentElement;
  docEl.style.setProperty('--lx', '-2.00');
  docEl.style.setProperty('--ly', '2.00');

  // Cache elements
  const panels = gsap.utils.toArray('.beat-panel');
  const sfTop = document.querySelector('.sf-top');
  const sfRight = document.querySelector('.sf-right');
  const sfBottom = document.querySelector('.sf-bottom');
  const sfLeft = document.querySelector('.sf-left');
  const scrollHint = document.getElementById('scrollHint');

  // Function to update the progress frame borders
  function updateScrollFrame(p) {
    const seg = p * 4;
    sfTop.style.transform = `scaleX(${Math.min(1, Math.max(0, seg))})`;
    sfRight.style.transform = `scaleY(${Math.min(1, Math.max(0, seg - 1))})`;
    sfBottom.style.transform = `scaleX(${Math.min(1, Math.max(0, seg - 2))})`;
    sfLeft.style.transform = `scaleY(${Math.min(1, Math.max(0, seg - 3))})`;
  }

  // 3. Main GSAP Timeline
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '#scrollTrigger',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1, // smooth transitions link directly to scrollbar
      onUpdate: (self) => {
        const p = self.progress;
        updateScrollFrame(p);
        
        // Hide scroll hint past 4% scroll progress
        if (p > 0.04) {
          scrollHint.classList.add('out');
        } else {
          scrollHint.classList.remove('out');
        }

        // Active panel class management
        panels.forEach((panel) => {
          const beat = parseInt(panel.dataset.beat, 10);
          let isActive = false;
          if (beat === 0 && p < 0.15) isActive = true;
          else if (beat === 1 && p >= 0.15 && p < 0.35) isActive = true;
          else if (beat === 2 && p >= 0.35 && p < 0.62) isActive = true;
          else if (beat === 3 && p >= 0.62 && p < 0.82) isActive = true;
          else if (beat === 4 && p >= 0.82) isActive = true;

          if (isActive) {
            panel.classList.add('active');
          } else {
            panel.classList.remove('active');
          }
        });
      }
    }
  });

  // ═══════════════════════════════════════════════════════════
  // BEAT 0: HERO ANIMATIONS
  // ═══════════════════════════════════════════════════════════
  // Animate tagline fade-in & Y-slide
  tl.to('.hero-reveal-box', {
    opacity: 1,
    y: 0,
    duration: 0.08
  }, 0.02);

  // Soften light shadow slightly on scroll down
  tl.to(docEl, {
    '--lx': '-1.20',
    '--ly': '1.20',
    duration: 0.1
  }, 0.05);

  // Fade out Beat 0
  tl.to('#beat-0', {
    opacity: 0,
    autoAlpha: 0,
    duration: 0.05
  }, 0.13);

  // ═══════════════════════════════════════════════════════════
  // BEAT 1: PURPOSE (Origami card rotate Y-axis)
  // ═══════════════════════════════════════════════════════════
  // Fade in Beat 1
  tl.to('#beat-1', {
    opacity: 1,
    autoAlpha: 1,
    duration: 0.05
  }, 0.15);

  // Rotate origami card to reveal Ragnar/Floki
  tl.to('#origami-family', {
    opacity: 0,
    rotateY: -90,
    duration: 0.08
  }, 0.22);
  
  tl.to('#origami-house', {
    opacity: 1,
    rotateY: 0,
    duration: 0.08
  }, 0.22);

  // Fade out Beat 1
  tl.to('#beat-1', {
    opacity: 0,
    autoAlpha: 0,
    duration: 0.05
  }, 0.33);

  // ═══════════════════════════════════════════════════════════
  // BEAT 2: TRAJETÓRIA (Staircase Steps Lighting Up)
  // ═══════════════════════════════════════════════════════════
  // Fade in Beat 2
  tl.to('#beat-2', {
    opacity: 1,
    autoAlpha: 1,
    duration: 0.05
  }, 0.35);

  // Highlight step 1
  tl.to('#step-1', {
    opacity: 1,
    x: 0,
    duration: 0.05
  }, 0.38);

  // Highlight step 2
  tl.to('#step-2', {
    opacity: 1,
    x: 0,
    duration: 0.05
  }, 0.44);

  // Highlight step 3
  tl.to('#step-3', {
    opacity: 1,
    x: 0,
    duration: 0.05
  }, 0.50);

  // Highlight step 4
  tl.to('#step-4', {
    opacity: 1,
    x: 0,
    duration: 0.05
  }, 0.56);

  // Fade out Beat 2
  tl.to('#beat-2', {
    opacity: 0,
    autoAlpha: 0,
    duration: 0.05
  }, 0.60);

  // ═══════════════════════════════════════════════════════════
  // BEAT 3: ARSENAL TÉCNICO (Matrix cells highlight & light sweep)
  // ═══════════════════════════════════════════════════════════
  // Fade in Beat 3
  tl.to('#beat-3', {
    opacity: 1,
    autoAlpha: 1,
    duration: 0.05
  }, 0.62);

  // Light angle sways to simulate a sweep highlight
  tl.to(docEl, {
    '--lx': '-3.50',
    '--ly': '1.50',
    duration: 0.08
  }, 0.64);

  // Highlight Databricks & Power BI
  tl.to('#cell-db, #cell-pbi', {
    opacity: 1,
    scale: 1,
    duration: 0.05
  }, 0.66);

  // Highlight Python & Cloud
  tl.to('#cell-py, #cell-cloud', {
    opacity: 1,
    scale: 1,
    duration: 0.05
  }, 0.71);

  // Light sways back
  tl.to(docEl, {
    '--lx': '-1.50',
    '--ly': '3.50',
    duration: 0.08
  }, 0.73);

  // Highlight SQL & AI
  tl.to('#cell-sql, #cell-ia', {
    opacity: 1,
    scale: 1,
    duration: 0.05
  }, 0.76);

  // Reset light to static bottom-left
  tl.to(docEl, {
    '--lx': '-2.00',
    '--ly': '2.00',
    duration: 0.05
  }, 0.80);

  // Fade out Beat 3
  tl.to('#beat-3', {
    opacity: 0,
    autoAlpha: 0,
    duration: 0.05
  }, 0.80);

  // ═══════════════════════════════════════════════════════════
  // BEAT 4: DEMOS, CERTIFICAÇÕES & CONTATO (The Final Zoom Out)
  // ═══════════════════════════════════════════════════════════
  // Fade in Beat 4
  tl.to('#beat-4', {
    opacity: 1,
    autoAlpha: 1,
    duration: 0.05
  }, 0.82);

  // Zoom-out the sticky frame container for a paper mockup look on desktop
  tl.to('#viewportSticky', {
    scale: 0.94,
    duration: 0.08
  }, 0.84);

  // Interactive light tracking (mousemove) inside Beat 4 on Desktop only
  const isMobile = window.innerWidth < 900;
  if (!isMobile) {
    const finalPanel = document.getElementById('beat-4');
    let isHovering = false;

    finalPanel.addEventListener('mousemove', (e) => {
      isHovering = true;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dx = e.clientX - w / 2;
      const dy = e.clientY - h / 2;
      
      const lx = (dx / (w / 2)) * 4;
      const ly = (dy / (h / 2)) * 4;
      
      docEl.style.setProperty('--lx', lx.toFixed(2));
      docEl.style.setProperty('--ly', ly.toFixed(2));
    });

    finalPanel.addEventListener('mouseleave', () => {
      isHovering = false;
      docEl.style.setProperty('--lx', '-2.00');
      docEl.style.setProperty('--ly', '2.00');
    });
  }

})();
