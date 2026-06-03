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
  // 4. UNIFIED HERO LIGHT ENGINE & PLASTER RENDERING
  // ═══════════════════════════════════════════════════════════
  var L = { a: -0.55, d: 1.0 };
  var BASE = -0.55;
  var heroSection = document.querySelector('.hero');
  var heroSticky = document.querySelector('.hero-sticky');
  var isHovering = false;

  function updateScrollLight() {
    if (isHovering && !isMobile) return;
    if (!heroSection) return;
    
    var rect = heroSection.getBoundingClientRect();
    var scrolled = -rect.top;
    var maxScroll = heroSection.offsetHeight - window.innerHeight;
    if (maxScroll <= 0) return;
    var progress = Math.max(0, Math.min(1, scrolled / maxScroll));
    
    // Luz gira 2.5 voltas, easing cúbico suave
    var ep = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;
    L.a = BASE + ep * Math.PI * 2 * 2.5;
    L.d = 0.65 + progress * 0.35;
    
    var lx = Math.cos(L.a) * 4;
    var ly = Math.sin(L.a) * 4;
    
    document.documentElement.style.setProperty('--lx', lx.toFixed(2));
    document.documentElement.style.setProperty('--ly', ly.toFixed(2));
    
    if (!isMobile) {
      var spotX = 50 + Math.cos(L.a) * 35;
      var spotY = 50 + Math.sin(L.a) * 35;
      document.documentElement.style.setProperty('--spot-x', spotX.toFixed(2) + '%');
      document.documentElement.style.setProperty('--spot-y', spotY.toFixed(2) + '%');
    }
  }

  // Scroll listener for light updates
  var lightTicking = false;
  window.addEventListener('scroll', function() {
    if (!lightTicking) {
      requestAnimationFrame(function() {
        updateScrollLight();
        lightTicking = false;
      });
      lightTicking = true;
    }
  }, { passive: true });

  // Initial call
  updateScrollLight();

  // Desktop only interactive mouse light tracking & canvases
  if (!isMobile) {
    if (heroSticky) {
      heroSticky.style.pointerEvents = 'auto'; // ensure mousemove works
      
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
        
        document.documentElement.style.setProperty('--lx', lx.toFixed(2));
        document.documentElement.style.setProperty('--ly', ly.toFixed(2));
        document.documentElement.style.setProperty('--spot-x', spotX.toFixed(2) + '%');
        document.documentElement.style.setProperty('--spot-y', spotY.toFixed(2) + '%');
        
        // Feed mouse light angle into L.a for the canvas engine
        L.a = Math.atan2(ly, lx);
      });

      heroSticky.addEventListener('mouseleave', function() {
        isHovering = false;
        updateScrollLight();
      });
    }

    // Initialize bg and hero canvases
    var bgCanvas = document.getElementById('bg-canvas');
    var bgCtx = bgCanvas ? bgCanvas.getContext('2d') : null;
    var bgW, bgH;

    var heroCanvas = document.getElementById('hero-canvas');
    var heroCtx = heroCanvas ? heroCanvas.getContext('2d') : null;
    var heroW, heroH, heroDPR;
    var fontsReady = false;
    document.fonts.ready.then(function() { fontsReady = true; });

    function resizeCanvases() {
      if (bgCanvas) {
        bgW = bgCanvas.width = window.innerWidth;
        bgH = bgCanvas.height = window.innerHeight;
      }
      if (heroCanvas) {
        heroDPR = window.devicePixelRatio || 1;
        heroW = heroCanvas.width = heroCanvas.offsetWidth * heroDPR;
        heroH = heroCanvas.height = heroCanvas.offsetHeight * heroDPR;
      }
      layoutMid();
    }

    var midElement = document.querySelector('.hero-left');
    function layoutMid() {
      if (!midElement || !heroCanvas) return;
      var W2 = window.innerWidth;
      var H2 = window.innerHeight;
      var fsFinal = W2 * 0.215;
      var topY = H2 * 0.22;
      var twoLines = fsFinal * 0.88 * 2;
      var gap = H2 * 0.052;
      midElement.style.top = (topY + twoLines + gap) + 'px';
    }

    // Run resizing
    resizeCanvases();
    window.addEventListener('resize', function() { setTimeout(resizeCanvases, 50); }, { passive: true });

    // BG Canvas rendering loop
    function drawBg() {
      if (!bgCtx || isMobile) {
        if (bgCanvas) bgCanvas.style.display = 'none';
        return;
      }
      bgCanvas.style.display = 'block';
      
      bgCtx.fillStyle = '#dedad4';
      bgCtx.fillRect(0, 0, bgW, bgH);
      
      var lx = (0.5 + Math.cos(L.a) * 0.44) * bgW;
      var ly = (0.5 + Math.sin(L.a) * 0.44) * bgH;
      var R = Math.hypot(bgW, bgH);
      
      // Main spotlight glow
      var g = bgCtx.createRadialGradient(lx, ly, 0, lx, ly, R * 0.8);
      g.addColorStop(0,   'rgba(255,253,247,.70)');
      g.addColorStop(0.18, 'rgba(245,241,233,.42)');
      g.addColorStop(0.50, 'rgba(210,206,198,.16)');
      g.addColorStop(1,    'rgba(160,156,148,0)');
      bgCtx.fillStyle = g;
      bgCtx.fillRect(0, 0, bgW, bgH);
      
      // Shadow glow opposite side
      var ox = (0.5 - Math.cos(L.a) * 0.36) * bgW;
      var oy = (0.5 - Math.sin(L.a) * 0.36) * bgH;
      var gs = bgCtx.createRadialGradient(ox, oy, 0, ox, oy, R * 0.58);
      gs.addColorStop(0,   'rgba(60,52,44,.28)');
      gs.addColorStop(0.38, 'rgba(60,52,44,.10)');
      gs.addColorStop(1,    'rgba(60,52,44,0)');
      bgCtx.fillStyle = gs;
      bgCtx.fillRect(0, 0, bgW, bgH);
      
      requestAnimationFrame(drawBg);
    }
    
    // Hero Canvas volumetric plaster rendering loop
    function calcFS() {
      if (!heroCtx) return 100;
      var target = heroW * 0.975;
      var fs = heroW * 0.32;
      heroCtx.font = '400 ' + fs + 'px "Bebas Neue"';
      for (var i = 0; i < 30; i++) {
        heroCtx.font = '400 ' + fs + 'px "Bebas Neue"';
        var w = heroCtx.measureText('MACHADO').width;
        if (Math.abs(w - target) < heroW * 0.004) break;
        fs *= target / w;
      }
      return fs;
    }
    
    function drawHero() {
      if (!heroCtx || isMobile) {
        if (heroCanvas) heroCanvas.style.display = 'none';
        return;
      }
      if (!fontsReady) {
        requestAnimationFrame(drawHero);
        return;
      }
      heroCanvas.style.display = 'block';
      heroCtx.clearRect(0, 0, heroW, heroH);
      
      var a = L.a;
      var lx = Math.cos(a);
      var ly = Math.sin(a);
      var fs = calcFS();
      
      var padL = heroW * 0.012;
      var topY = heroH * 0.22;
      var lnH = fs * 0.88;
      var D = fs * 0.13;
      
      heroCtx.font = '400 ' + fs + 'px "Bebas Neue"';
      heroCtx.textBaseline = 'top';
      
      var lines = ['ANDRÉ', 'MACHADO'];
      lines.forEach(function(txt, i) {
        var bx = padL, by = topY + i * lnH;
        
        // 1. Cavity floor (dark)
        var indir = Math.max(0, -Math.cos(a) * 0.2 + 0.08);
        var floorR = Math.round(34 + indir * 20);
        var floorG = Math.round(30 + indir * 16);
        var floorB = Math.round(26 + indir * 12);
        heroCtx.fillStyle = 'rgb(' + floorR + ',' + floorG + ',' + floorB + ')';
        heroCtx.fillText(txt, bx, by);
        
        // 2. Cavity walls (28 steps)
        var STEPS = 28;
        for (var s = 1; s <= STEPS; s++) {
          var t = s / STEPS;
          var off = t * D * 0.7;
          
          // Highlight side walls
          heroCtx.save();
          heroCtx.globalAlpha = t * t * 0.28;
          var lv = Math.round(200 + t * 42);
          heroCtx.fillStyle = 'rgb(' + lv + ',' + Math.round(lv * 0.97) + ',' + Math.round(lv * 0.93) + ')';
          heroCtx.fillText(txt, bx + lx * off * 0.55, by + ly * off * 0.55);
          heroCtx.restore();
          
          // Shadow side walls
          heroCtx.save();
          heroCtx.globalAlpha = t * t * 0.22;
          heroCtx.fillStyle = 'rgb(28,24,20)';
          heroCtx.fillText(txt, bx - lx * off * 0.45, by - ly * off * 0.45);
          heroCtx.restore();
        }
        
        // 3. Lit ridge/bevel
        heroCtx.save();
        heroCtx.shadowColor = 'rgba(255,253,246,1.0)';
        heroCtx.shadowBlur = D * 0.40;
        heroCtx.shadowOffsetX = lx * D * 0.72;
        heroCtx.shadowOffsetY = ly * D * 0.72;
        heroCtx.fillStyle = 'rgba(222,218,212,0)';
        heroCtx.fillText(txt, bx, by);
        heroCtx.restore();
        
        // 4. Shadow ridge
        heroCtx.save();
        heroCtx.shadowColor = 'rgba(22,17,12,0.80)';
        heroCtx.shadowBlur = D * 1.3;
        heroCtx.shadowOffsetX = -lx * D * 0.80;
        heroCtx.shadowOffsetY = -ly * D * 0.80;
        heroCtx.fillStyle = 'rgba(222,218,212,0)';
        heroCtx.fillText(txt, bx, by);
        heroCtx.restore();
        
        // 5. Ambient occlusion
        heroCtx.save();
        heroCtx.shadowColor = 'rgba(18,14,10,0.55)';
        heroCtx.shadowBlur = D * 2.8;
        heroCtx.shadowOffsetX = 0;
        heroCtx.shadowOffsetY = 0;
        heroCtx.fillStyle = 'rgba(222,218,212,0)';
        heroCtx.fillText(txt, bx, by);
        heroCtx.restore();
        
        // 6. Glow on outer surface (destination-out blending)
        (function(text2, bx2, by2) {
          var oc = document.createElement('canvas');
          oc.width = heroW; oc.height = heroH;
          var oc2 = oc.getContext('2d');
          oc2.font = heroCtx.font;
          oc2.textBaseline = 'top';
          
          var gs = Math.max(0, Math.cos(a) * 0.45 + 0.55);
          oc2.shadowColor = 'rgba(255,251,240,' + (0.45 + gs * 0.35) + ')';
          oc2.shadowBlur = D * 4.2;
          oc2.shadowOffsetX = lx * D * 0.18;
          oc2.shadowOffsetY = ly * D * 0.18;
          oc2.fillStyle = 'rgba(222,218,212,1)';
          oc2.fillText(text2, bx2, by2);
          
          oc2.globalCompositeOperation = 'destination-out';
          oc2.shadowColor = 'transparent'; oc2.shadowBlur = 0;
          oc2.shadowOffsetX = 0; oc2.shadowOffsetY = 0;
          oc2.fillStyle = 'rgba(0,0,0,1)';
          oc2.fillText(text2, bx2, by2);
          
          heroCtx.save();
          heroCtx.drawImage(oc, 0, 0);
          heroCtx.restore();
        })(txt, bx, by);
        
        // 7. Specular Peak
        var spec = Math.pow(Math.max(0, Math.sin(a + Math.PI * 0.5)), 8) * 0.55;
        if (spec > 0.012) {
          heroCtx.save();
          heroCtx.globalAlpha = spec;
          heroCtx.shadowColor = 'rgba(255,254,250,1)';
          heroCtx.shadowBlur = D * 0.28;
          heroCtx.shadowOffsetX = lx * D * 0.22;
          heroCtx.shadowOffsetY = ly * D * 0.22;
          heroCtx.fillStyle = 'rgba(248,246,240,0.55)';
          heroCtx.fillText(txt, bx, by);
          heroCtx.restore();
        }
      });
      
      requestAnimationFrame(drawHero);
    }
    
    // Start drawing loops
    drawBg();
    drawHero();
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
