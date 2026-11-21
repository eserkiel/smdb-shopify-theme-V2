/* Maison Norel – motion.js (Animation-Agent)
   Vanilla JS, ohne Bibliotheken, wird mit defer geladen.
   Funktionen: Scroll-Reveal, Hero (Ken Burns, Parallaxe, Text), Header-Status,
   Announcement-Rotation. Fehlende Elemente werden still übersprungen. */
(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.add('js-motion');

  var DURATION = 900;
  var STEP = 90;
  var MAX_STEPS = 6;

  var reducedQuery = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  function isReduced() {
    return !!(reducedQuery && reducedQuery.matches);
  }
  function onReducedChange(fn) {
    if (!reducedQuery) return;
    if (reducedQuery.addEventListener) reducedQuery.addEventListener('change', fn);
    else if (reducedQuery.addListener) reducedQuery.addListener(fn);
  }

  /* ------------------------------------------------------------------ */
  /* Gemeinsames Einblenden                                              */
  /* ------------------------------------------------------------------ */
  function reveal(el, delay) {
    if (!el || el.classList.contains('is-revealed')) return;
    if (isReduced()) {
      el.classList.add('is-revealed');
      return;
    }
    delay = delay || 0;
    el.style.setProperty('--mn-reveal-delay', delay + 'ms');
    el.classList.add('is-revealing');
    // Stil zuerst festschreiben, damit der Übergang sicher startet
    void el.offsetWidth;
    el.classList.add('is-revealed');
    window.setTimeout(function () {
      el.classList.remove('is-revealing');
      el.style.removeProperty('--mn-reveal-delay');
    }, DURATION + delay + 150);
  }

  function revealStagger(container, baseDelay) {
    reveal(container, baseDelay);
    var kids = container.children;
    for (var i = 0; i < kids.length; i++) {
      reveal(kids[i], baseDelay + Math.min(i, MAX_STEPS - 1) * STEP);
    }
  }

  function revealTarget(el, delay) {
    if (el.hasAttribute('data-reveal-stagger')) revealStagger(el, delay);
    else reveal(el, delay);
  }

  /* ------------------------------------------------------------------ */
  /* 1. Scroll-Reveal                                                    */
  /* ------------------------------------------------------------------ */
  function initReveal() {
    var nodes = document.querySelectorAll('[data-reveal], [data-reveal-stagger]');
    var targets = [];
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      // Direkte Kinder eines Stagger-Containers werden mit dem Container eingeblendet
      var parent = el.parentElement;
      if (parent && parent.hasAttribute('data-reveal-stagger')) continue;
      targets.push(el);
    }
    if (!targets.length) return;

    if (isReduced() || !('IntersectionObserver' in window)) {
      targets.forEach(function (el) { revealTarget(el, 0); });
      return;
    }

    var observer = new IntersectionObserver(function (entries, obs) {
      var batch = 0;
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        obs.unobserve(entry.target);
        // Gleichzeitig sichtbare Elemente (z. B. beim Laden) leicht versetzt
        revealTarget(entry.target, Math.min(batch, MAX_STEPS - 1) * STEP);
        batch++;
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0 });

    targets.forEach(function (el) { observer.observe(el); });

    onReducedChange(function () {
      if (!isReduced()) return;
      targets.forEach(function (el) {
        observer.unobserve(el);
        revealTarget(el, 0);
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* 3. Hero                                                             */
  /* ------------------------------------------------------------------ */
  function initHeroText() {
    var hero = document.getElementById('hero');
    if (!hero) return;
    var items = hero.querySelectorAll('h1, p, a');
    for (var i = 0; i < items.length; i++) {
      reveal(items[i], 250 + i * 180);
    }
  }

  function initParallax() {
    var hero = document.getElementById('hero');
    var media = document.querySelector('[data-parallax]');
    if (!media) return;
    var container = hero || media.parentElement;
    if (!container) return;

    var ticking = false;
    var visible = true;
    var active = false;

    function update() {
      ticking = false;
      if (isReduced() || !visible) return;
      var rect = container.getBoundingClientRect();
      var h = rect.height || 1;
      var scrolled = Math.max(0, -rect.top);
      var shift = Math.min(scrolled * 0.25, h * 0.08);
      media.style.transform = 'translate3d(0,' + shift.toFixed(2) + 'px,0)';
    }

    function onScroll() {
      if (ticking || !visible) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }

    function start() {
      if (active || isReduced()) return;
      active = true;
      media.style.willChange = 'transform';
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });
      onScroll();
    }

    function stop() {
      if (!active) return;
      active = false;
      media.style.willChange = '';
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    }

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
        if (visible) start(); else stop();
      }).observe(container);
    } else {
      start();
    }

    onReducedChange(function () {
      if (isReduced()) {
        stop();
        media.style.transform = '';
      } else if (visible) {
        start();
      }
    });
  }

  /* ------------------------------------------------------------------ */
  /* 4. Header                                                           */
  /* ------------------------------------------------------------------ */
  function initHeader() {
    var header = document.getElementById('site-header');
    if (!header) return;
    var ticking = false;
    var state = null;

    function update() {
      ticking = false;
      var scrolled = (window.scrollY || window.pageYOffset || 0) > 24;
      if (scrolled !== state) {
        state = scrolled;
        header.classList.toggle('is-scrolled', scrolled);
      }
    }

    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }, { passive: true });
    update();
  }

  /* ------------------------------------------------------------------ */
  /* 5. Announcement-Bar                                                 */
  /* ------------------------------------------------------------------ */
  function initAnnouncement() {
    var bar = document.getElementById('announcement');
    if (!bar) return;
    var items = bar.querySelectorAll('.announcement__item');
    if (!items.length) return;

    var parent = items[0].parentElement;
    if (parent) parent.classList.add('mn-announce-stack');

    var index = 0;
    var timer = null;
    var hovered = false;
    var focused = false;

    function show(i) {
      for (var k = 0; k < items.length; k++) {
        var on = k === i;
        items[k].classList.toggle('is-active', on);
        if (on) items[k].removeAttribute('aria-hidden');
        else items[k].setAttribute('aria-hidden', 'true');
      }
      index = i;
    }

    function canRun() {
      return items.length > 1 && !isReduced() && !hovered && !focused && !document.hidden;
    }

    function tick() {
      show((index + 1) % items.length);
    }

    function sync() {
      if (canRun()) {
        if (!timer) timer = window.setInterval(tick, 4500);
      } else if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    show(0);

    bar.addEventListener('mouseenter', function () { hovered = true; sync(); });
    bar.addEventListener('mouseleave', function () { hovered = false; sync(); });
    bar.addEventListener('focusin', function () { focused = true; sync(); });
    bar.addEventListener('focusout', function (e) {
      if (!bar.contains(e.relatedTarget)) { focused = false; sync(); }
    });
    document.addEventListener('visibilitychange', sync);
    onReducedChange(function () {
      if (isReduced()) show(0);
      sync();
    });

    sync();
  }

  /* ------------------------------------------------------------------ */
  function safe(fn) {
    try { fn(); } catch (err) {
      // Im Fehlerfall lieber alles sichtbar machen als Inhalte zu verstecken
      root.classList.remove('js-motion');
      if (window.console && console.warn) console.warn('[motion]', err);
    }
  }

  function init() {
    safe(initHeader);
    safe(initAnnouncement);
    safe(initHeroText);
    safe(initParallax);
    safe(initReveal);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
