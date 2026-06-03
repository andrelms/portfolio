/* ═══════════════════════════════════════════════════════════════
   André Machado — Portfolio V3 Engine
   
   HERO STRATEGY:
   - Mobile (<900px): 9:16 canvas frame sequence from video (240 frames)
   - Desktop (≥900px): CSS/SVG dynamic debossed lighting (text-shadow driven by scroll)
   
   SECTIONS: Stats pinned, Timeline reveal, Expertise carousel,
             Quem Sou 7-chapter scroll, Scroll progress frame
   ═══════════════════════════════════════════════════════════════ */

// ── Video embed helper ──────────────────────────────────────
function loadVideo(el, id, ratio) {
  if (el.classList.contains('loaded')) return;
  var ar = ratio === '9/16' ? '9/16' : '16/9';
  el.innerHTML = '<iframe src="https://www.youtube.com/embed/' + id + '?autoplay=1&rel=0" allow="autoplay;encrypted-media" allowfullscreen style="aspect-ratio:' + ar + '"></iframe>';
  el.classList.add('loaded');
}

(function(){
  'use strict';
  var isMobile = window.innerWidth < 900;
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ═══════════════════════════════════════════════════════════
  // 1. CUSTOM CURSOR (desktop only)
  // ═══════════════════════════════════════════════════════════
  if (!isMobile) {
    var cursor = document.getElementById('cursor');
    var ring = document.getElementById('cursorRing');
    var cx = 0, cy = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', function(e) {
      cx = e.clientX; cy = e.clientY;
      cursor.style.left = cx + 'px'; cursor.style.top = cy + 'px';
    });
    (function animRing() {
      rx += (cx - rx) * 0.15; ry += (cy - ry) * 0.15;
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      requestAnimationFrame(animRing);
    })();
  } else {
    document.body.style.cursor = 'auto';
    var c = document.getElementById('cursor');
    var r = document.getElementById('cursorRing');
    if (c) c.style.display = 'none';
    if (r) r.style.display = 'none';
  }

  // ═══════════════════════════════════════════════════════════
  // 2. SCROLL PROGRESS FRAME
  // ═══════════════════════════════════════════════════════════
  var scrollFrame = document.getElementById('scrollFrame');
  if (scrollFrame) {
    var sfTop = scrollFrame.querySelector('.sf-top');
    var sfRight = scrollFrame.querySelector('.sf-right');
    var sfBottom = scrollFrame.querySelector('.sf-bottom');
    var sfLeft = scrollFrame.querySelector('.sf-left');
    var wasComplete = false;

    window.addEventListener('scroll', function() {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      var p = h > 0 ? window.scrollY / h : 0;
      var seg = p * 4;
      sfTop.style.transform = 'scaleX(' + Math.min(1, Math.max(0, seg)) + ')';
      sfRight.style.transform = 'scaleY(' + Math.min(1, Math.max(0, seg - 1)) + ')';
      sfBottom.style.transform = 'scaleX(' + Math.min(1, Math.max(0, seg - 2)) + ')';
      sfLeft.style.transform = 'scaleY(' + Math.min(1, Math.max(0, seg - 3)) + ')';
      var complete = p > 0.995;
      if (complete && !wasComplete) { scrollFrame.classList.add('is-complete'); wasComplete = true; }
      else if (!complete && wasComplete) { scrollFrame.classList.remove('is-complete'); wasComplete = false; }
    }, { passive: true });
  }

  // ═══════════════════════════════════════════════════════════
  // 3. HERO — MOBILE: 9:16 Frame Sequence on Canvas
  // ═══════════════════════════════════════════════════════════
  var heroFrames = { d: [], m: [] };
  window.__heroFrames = heroFrames;

  if (isMobile) {
    var mCanvas = document.getElementById('hero-canvas-mobile');
    if (mCanvas) {
      var mCtx = mCanvas.getContext('2d');
      var FRAME_COUNT = 240;
      var frames = new Array(FRAME_COUNT);
      var mLoaded = 0;
      var mCurrentFrame = -1;

      function padNum(n, d) { return String(n).padStart(d, '0'); }

      function loadMobileFrame(idx) {
        return new Promise(function(resolve) {
          var img = new Image();
          img.onload = function() { frames[idx] = img; heroFrames.m[idx] = img; mLoaded++; resolve(img); };
          img.onerror = function() { resolve(null); };
          img.src = 'frames/frame_' + padNum(idx + 1, 4) + '.jpg';
        });
      }

      function resizeMobileCanvas() {
        var dpr = Math.min(window.devicePixelRatio || 1, 2);
        mCanvas.width = mCanvas.offsetWidth * dpr;
        mCanvas.height = mCanvas.offsetHeight * dpr;
        mCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
        if (mCurrentFrame >= 0 && frames[mCurrentFrame]) drawMobileFrame(mCurrentFrame);
      }

      function drawMobileFrame(idx) {
        var img = frames[idx];
        if (!img || !mCtx) return;
        var dpr = Math.min(window.devicePixelRatio || 1, 2);
        var cw = mCanvas.width / dpr, ch = mCanvas.height / dpr;
        mCtx.clearRect(0, 0, cw, ch);
        // Cover fit for 9:16 frames
        var imgR = img.naturalWidth / img.naturalHeight;
        var canR = cw / ch;
        var dw, dh, dx, dy;
        if (canR > imgR) { dw = cw; dh = cw / imgR; dx = 0; dy = (ch - dh) / 2; }
        else { dh = ch; dw = ch * imgR; dx = (cw - dw) / 2; dy = 0; }
        mCtx.drawImage(img, dx, dy, dw, dh);
        mCurrentFrame = idx;
      }

      // Preload frames
      (async function() {
        await loadMobileFrame(0);
        if (frames[0]) drawMobileFrame(0);
        var remaining = [];
        for (var i = 1; i < FRAME_COUNT; i++) remaining.push(i);
        for (var b = 0; b < remaining.length; b += 10) {
          var batch = remaining.slice(b, b + 10);
          await Promise.all(batch.map(loadMobileFrame));
        }
      })();

      resizeMobileCanvas();
      window.addEventListener('resize', function() { setTimeout(resizeMobileCanvas, 100); });

      // Scroll → frame sync
      var heroSection = document.querySelector('.hero');
      var mTicking = false;
      window.addEventListener('scroll', function() {
        if (!mTicking) {
          requestAnimationFrame(function() {
            var rect = heroSection.getBoundingClientRect();
            var scrolled = -rect.top;
            var maxScroll = heroSection.offsetHeight - window.innerHeight;
            if (scrolled < 0) { if (mCurrentFrame !== 0 && frames[0]) drawMobileFrame(0); mTicking = false; return; }
            if (scrolled > maxScroll) { var last = FRAME_COUNT - 1; if (mCurrentFrame !== last && frames[last]) drawMobileFrame(last); mTicking = false; return; }
            var progress = scrolled / maxScroll;
            var fi = Math.min(Math.floor(progress * FRAME_COUNT), FRAME_COUNT - 1);
            if (fi !== mCurrentFrame && frames[fi]) drawMobileFrame(fi);
            mTicking = false;
          });
          mTicking = true;
        }
      }, { passive: true });
    }
  }

  // ═══════════════════════════════════════════════════════════
  // 4. HERO — DESKTOP: CSS Dynamic Debossed Lighting
  // ═══════════════════════════════════════════════════════════
  if (!isMobile) {
    var heroSection = document.querySelector('.hero');
    var heroSticky = document.querySelector('.hero-sticky');

    if (heroSection && heroSticky) {
      var isHovering = false;
      var dTicking = false;

      function updateScrollLight() {
        if (isHovering) return;
        var rect = heroSection.getBoundingClientRect();
        var scrolled = -rect.top;
        var maxScroll = heroSection.offsetHeight - window.innerHeight;
        if (maxScroll <= 0) return;
        var progress = Math.max(0, Math.min(1, scrolled / maxScroll));
        
        // Map scroll to light angle (full 360° rotation like the video)
        var angle = progress * Math.PI * 2;
        var lx = Math.cos(angle) * 4;
        var ly = Math.sin(angle) * 4;
        
        // Spotlight center coordinates (15% to 85% of screen)
        var spotX = 50 + Math.cos(angle) * 35;
        var spotY = 50 + Math.sin(angle) * 35;
        
        heroSticky.style.setProperty('--lx', lx.toFixed(2));
        heroSticky.style.setProperty('--ly', ly.toFixed(2));
        heroSticky.style.setProperty('--spot-x', spotX.toFixed(2) + '%');
        heroSticky.style.setProperty('--spot-y', spotY.toFixed(2) + '%');
      }

      window.addEventListener('scroll', function() {
        if (!dTicking) {
          requestAnimationFrame(function() {
            updateScrollLight();
            dTicking = false;
          });
          dTicking = true;
        }
      }, { passive: true });

      // Interactive mousemove light tracking
      heroSticky.addEventListener('mousemove', function(e) {
        isHovering = true;
        var w = window.innerWidth;
        var h = window.innerHeight;
        var dx = e.clientX - w / 2;
        var dy = e.clientY - h / 2;
        
        var lx = (dx / (w / 2)) * 4;
        var ly = (dy / (h / 2)) * 4;
        
        var spotX = (e.clientX / w) * 100;
        var spotY = (e.clientY / h) * 100;
        
        heroSticky.style.setProperty('--lx', lx.toFixed(2));
        heroSticky.style.setProperty('--ly', ly.toFixed(2));
        heroSticky.style.setProperty('--spot-x', spotX.toFixed(2) + '%');
        heroSticky.style.setProperty('--spot-y', spotY.toFixed(2) + '%');
      });

      heroSticky.addEventListener('mouseleave', function() {
        isHovering = false;
        // Snap back to scroll position smoothly
        updateScrollLight();
      });

      // Run once on load
      updateScrollLight();
    }
  }

  // ═══════════════════════════════════════════════════════════
  // 5. HERO TEXT REVEAL & EXIT (scroll-driven)
  // ═══════════════════════════════════════════════════════════
  (function() {
    var hero = document.querySelector('.hero');
    if (!hero) return;
    var els = hero.querySelectorAll('.hero-eyebrow,.hero-name,.hero-role,.hero-sub,.hero-cta,.hero-stats');
    var entered = false, exited = false;

    function check() {
      var rect = hero.getBoundingClientRect();
      var scrolled = -rect.top;
      var maxScroll = hero.offsetHeight - window.innerHeight;
      var p = maxScroll > 0 ? scrolled / maxScroll : 0;
      
      // Enter at ~5% scroll
      if (p >= 0.02 && !entered) {
        entered = true;
        els.forEach(function(el, i) {
          setTimeout(function() { el.classList.add('scroll-in'); }, i * 120);
        });
      } else if (p < 0.02 && entered) {
        entered = false;
        els.forEach(function(el) { el.classList.remove('scroll-in'); });
      }
      
      // Exit at ~70% scroll (hand off to Quem Sou)
      if (p >= 0.65 && !exited) {
        exited = true;
        els.forEach(function(el) { el.classList.add('hero-exit'); });
      } else if (p < 0.65 && exited) {
        exited = false;
        els.forEach(function(el) { el.classList.remove('hero-exit'); });
      }
    }
    
    window.addEventListener('scroll', check, { passive: true });
    check();
  })();

  // ═══════════════════════════════════════════════════════════
  // 6. REVEAL OBSERVER (timeline, projects, certs, etc.)
  // ═══════════════════════════════════════════════════════════
  (function() {
    var items = document.querySelectorAll('.reveal,.timeline-item');
    if (!items.length) return;
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function(el) { obs.observe(el); });
  })();

  // ═══════════════════════════════════════════════════════════
  // 7. STATS PIN (pinned showcase with 4 slides)
  // ═══════════════════════════════════════════════════════════
  (function() {
    var section = document.getElementById('stats-pin');
    if (!section) return;
    var slides = section.querySelectorAll('.stat-slide');
    var dots = section.querySelectorAll('.dot');
    var N = slides.length;
    var curIdx = 0;

    function activateSlide(idx) {
      if (idx === curIdx && slides[idx].classList.contains('active')) return;
      curIdx = idx;
      slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); });
      dots.forEach(function(d, i) { d.classList.toggle('active', i === idx); });
    }

    window.addEventListener('scroll', function() {
      var rect = section.getBoundingClientRect();
      var scrolled = -rect.top;
      var scrollable = section.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      var p = Math.max(0, Math.min(1, scrolled / scrollable));
      var idx = Math.min(N - 1, Math.floor(p * N * 0.9999));
      activateSlide(idx);
    }, { passive: true });
  })();

  // ═══════════════════════════════════════════════════════════
  // 8. EXPERTISE CAROUSEL (scroll-driven card deck)
  // ═══════════════════════════════════════════════════════════
  (function() {
    var section = document.getElementById('exp-carousel');
    if (!section) return;
    var cards = section.querySelectorAll('.exp-slide-card');
    var dotsContainer = document.getElementById('exp-dots');
    var N = cards.length;
    
    // Create dots
    for (var i = 0; i < N; i++) {
      var dot = document.createElement('span');
      dot.className = 'exp-dot' + (i === 0 ? ' active' : '');
      dotsContainer.appendChild(dot);
    }
    var dots = dotsContainer.querySelectorAll('.exp-dot');
    var curIdx = 0;

    function setCard(idx) {
      if (idx === curIdx && cards[idx].style.opacity === '1') return;
      curIdx = idx;
      cards.forEach(function(card, i) {
        var diff = i - idx;
        if (diff === 0) {
          card.style.transform = 'translateZ(0) rotateY(0)';
          card.style.opacity = '1';
          card.style.zIndex = '10';
        } else if (diff > 0) {
          card.style.transform = 'translateZ(' + (-80 * diff) + 'px) translateX(' + (40 * diff) + 'px) rotateY(-5deg)';
          card.style.opacity = Math.max(0, 0.3 - diff * 0.1).toFixed(2);
          card.style.zIndex = String(10 - diff);
        } else {
          card.style.transform = 'translateZ(' + (80 * diff) + 'px) translateX(' + (40 * diff) + 'px) rotateY(5deg)';
          card.style.opacity = '0';
          card.style.zIndex = String(10 + diff);
        }
      });
      dots.forEach(function(d, i) { d.classList.toggle('active', i === idx); });
    }

    setCard(0);

    window.addEventListener('scroll', function() {
      var rect = section.getBoundingClientRect();
      var scrolled = -rect.top;
      var scrollable = section.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      var p = Math.max(0, Math.min(1, scrolled / scrollable));
      var idx = Math.min(N - 1, Math.floor(p * N * 0.9999));
      setCard(idx);
    }, { passive: true });
  })();

  // ═══════════════════════════════════════════════════════════
  // 9. QUEM SOU — 7 chapters, lateral photo slide
  // ═══════════════════════════════════════════════════════════
  (function() {
    var qs2 = document.getElementById('quem-sou');
    if (!qs2) return;
    var N = 7;
    var chapters = qs2.querySelectorAll('.qs2-chapter');
    var photos = qs2.querySelectorAll('.qs2-photo');
    var dots = qs2.querySelectorAll('.qs2-dot');
    var frameChapters = document.querySelectorAll('.qs2-frame-chapter');
    var canvas = document.getElementById('qs2-canvas');
    var smokeEl = document.getElementById('qs2-smoke');
    var veilEl = document.getElementById('qs2-frame-veil');
    var curIdx = -1;

    function activateChapter(idx) {
      if (idx === curIdx) return;
      curIdx = idx;
      chapters.forEach(function(c) {
        var ch = parseInt(c.dataset.ch, 10);
        c.classList.toggle('qs2-chapter-active', ch === idx);
      });
      photos.forEach(function(ph) {
        var ch = parseInt(ph.dataset.ch, 10);
        ph.classList.remove('qs2-active', 'qs2-past');
        if (ch < idx) ph.classList.add('qs2-past');
        else if (ch === idx) ph.classList.add('qs2-active');
      });
      dots.forEach(function(d, i) {
        d.classList.toggle('qs2-dot-active', i === idx);
      });
      
      // Show/hide frame-based chapters (ch0 Quem sou, ch1 Sobre)
      var showFrames = (idx <= 1);
      if (canvas) {
        canvas.style.opacity = showFrames ? '1' : '0';
        canvas.style.visibility = showFrames ? 'visible' : 'hidden';
      }
      if (smokeEl) {
        smokeEl.style.opacity = showFrames ? '1' : '0';
        smokeEl.style.visibility = showFrames ? 'visible' : 'hidden';
      }
      if (veilEl) {
        veilEl.style.opacity = showFrames ? '1' : '0';
        veilEl.style.visibility = showFrames ? 'visible' : 'hidden';
      }
      
      // Drive frame chapter text
      frameChapters.forEach(function(el) {
        var ch = parseInt(el.dataset.ch, 10);
        el.style.opacity = (ch === idx && showFrames) ? '1' : '0';
        el.style.pointerEvents = (ch === idx && showFrames) ? 'auto' : 'none';
      });
    }

    window.addEventListener('scroll', function() {
      var rect = qs2.getBoundingClientRect();
      var scrolled = -rect.top;
      var scrollable = qs2.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      var p = Math.max(0, Math.min(1, scrolled / scrollable));
      var idx = Math.min(N - 1, Math.floor(p * N * 0.9999));
      activateChapter(idx);
    }, { passive: true });
    
    activateChapter(0);
  })();

  // ═══════════════════════════════════════════════════════════
  // 10. QS2 FRAME CONTINUATION (mobile only — reuses hero frames)
  // ═══════════════════════════════════════════════════════════
  if (isMobile) {
    (function() {
      var section = document.getElementById('quem-sou');
      var canvas = document.getElementById('qs2-canvas');
      if (!section || !canvas) return;
      var ctx = canvas.getContext('2d');
      var TAIL = 40;
      var TOTAL = 240;
      var START = TOTAL - TAIL - 1;
      var END = TOTAL - 1;
      var SPAN = 2 / 7;

      function resizeQs2Canvas() {
        var dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = canvas.offsetWidth * dpr;
        canvas.height = canvas.offsetHeight * dpr;
      }

      function drawQs2Frame(idx) {
        var f = window.__heroFrames && window.__heroFrames.m;
        if (!f) return;
        var img = f[idx];
        if (!img || !img.complete || !img.naturalWidth) return;
        var dpr = Math.min(window.devicePixelRatio || 1, 2);
        var cw = canvas.width / dpr, ch = canvas.height / dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, cw, ch);
        var imgR = img.naturalWidth / img.naturalHeight;
        var canR = cw / ch;
        var dw, dh, dx, dy;
        if (canR > imgR) { dw = cw; dh = cw / imgR; dx = 0; dy = (ch - dh) / 2; }
        else { dh = ch; dw = ch * imgR; dx = (cw - dw) / 2; dy = 0; }
        ctx.drawImage(img, dx, dy, dw, dh);
      }

      resizeQs2Canvas();
      window.addEventListener('resize', function() { setTimeout(resizeQs2Canvas, 100); });

      window.addEventListener('scroll', function() {
        var rect = section.getBoundingClientRect();
        var scrolled = -rect.top;
        var scrollable = section.offsetHeight - window.innerHeight;
        if (scrollable <= 0) return;
        var p = Math.max(0, Math.min(1, scrolled / scrollable));
        // Only draw during ch0 + ch1 (first 2/7 of the section)
        if (p <= SPAN) {
          var localP = p / SPAN;
          var fi = Math.round(START + localP * (END - START));
          fi = Math.max(START, Math.min(END, fi));
          drawQs2Frame(fi);
        }
      }, { passive: true });
    })();
  }

  // ═══════════════════════════════════════════════════════════
  // 11. LENIS + GSAP (loaded externally, desktop only)
  // ═══════════════════════════════════════════════════════════
  (function() {
    if (typeof window.Lenis === 'undefined' || typeof window.gsap === 'undefined' || typeof window.ScrollTrigger === 'undefined') return;
    var isDesktop = window.innerWidth >= 900;
    gsap.registerPlugin(ScrollTrigger);

    if (isDesktop && !prefersReduced) {
      var lenis = new Lenis({
        duration: 1.05,
        easing: function(t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
        smoothWheel: true,
        wheelMultiplier: 1,
      });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(function(time) { lenis.raf(time * 1000); });
      gsap.ticker.lagSmoothing(0);
    }
  })();

})();
