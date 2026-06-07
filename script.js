(function () {
  'use strict';

  const scroller  = document.getElementById('scroller');
  const navLinks  = document.querySelectorAll('[data-nav]');
  const panels    = [...document.querySelectorAll('.panel')];
  const crumb     = document.getElementById('crumb-section');
  const pagerNum  = document.getElementById('pager-num');
  const pagerBar  = document.getElementById('pager-bar');

  const labels = {
    about:        'About',
    professional: 'Professional Projects',
    personal:     'Personal Projects',
    skills:       'Skills',
    experience:   'Experience',
  };

  function jumpTo(section) {
    const target = document.querySelector(`.panel[data-section="${section}"]`);
    if (target) scroller.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
  }

  navLinks.forEach(link => link.addEventListener('click', (e) => {
    e.preventDefault();
    jumpTo(link.dataset.target);
  }));

  document.querySelectorAll('[data-jump]').forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    jumpTo(btn.dataset.jump);
  }));

  window.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    const i = parseInt(e.key, 10);
    if (i >= 1 && i <= navLinks.length) jumpTo(navLinks[i - 1].dataset.target);
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting && en.intersectionRatio >= 0.5) {
        const sec = en.target.dataset.section;
        navLinks.forEach(l => l.classList.toggle('active', l.dataset.target === sec));
        crumb.textContent = labels[sec] || '';
        const idx = panels.findIndex(p => p === en.target);
        pagerNum.textContent = String(idx + 1).padStart(2, '0');
        pagerBar.style.width = ((idx + 1) / panels.length * 100) + '%';
      }
    });
  }, { root: scroller, threshold: [0.5] });

  panels.forEach(p => io.observe(p));
  pagerBar.style.width = (1 / panels.length * 100) + '%';

  document.querySelectorAll('.kbd[data-count]').forEach(badge => {
    const section = badge.dataset.count;
    badge.textContent = document.querySelectorAll(`.panel[data-section="${section}"] .card`).length;
  });

  // ── Landing screen ──
  const landing = document.getElementById('landing');
  const disc    = document.getElementById('landing-disc');

  if (landing && disc) {
    let entered = false;

    function enter() {
      if (entered) return;
      entered = true;
      disc.classList.add('is-press');
      requestAnimationFrame(() => document.body.classList.add('entered'));
      setTimeout(() => { landing.style.display = 'none'; }, 1000);
    }

    disc.addEventListener('click', (e) => { e.preventDefault(); enter(); });

    window.addEventListener('wheel', (e) => {
      if (!entered && e.deltaY > 0) enter();
    }, { passive: true });

    let touchY = null;
    window.addEventListener('touchstart', (e) => {
      if (!entered) touchY = e.touches[0].clientY;
    }, { passive: true });
    window.addEventListener('touchmove', (e) => {
      if (entered || touchY === null) return;
      if (touchY - e.touches[0].clientY > 24) enter();
    }, { passive: true });

    window.addEventListener('keydown', (e) => {
      if (entered) return;
      if (['ArrowDown', 'PageDown', 'End', ' ', 'Enter'].includes(e.key)) {
        e.preventDefault();
        enter();
      }
    });
  }

  // ── CV lightbox ──
  const cvLightbox = document.getElementById('cv-lightbox');

  if (cvLightbox) {
    const openBtn = document.querySelector('[data-cv-open]');

    function openCv() {
      cvLightbox.classList.add('is-open');
      cvLightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeCv() {
      cvLightbox.classList.remove('is-open');
      cvLightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    if (openBtn) openBtn.addEventListener('click', openCv);

    cvLightbox.addEventListener('click', (e) => {
      if (e.target === cvLightbox || e.target.closest('[data-cv-close]')) closeCv();
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && cvLightbox.classList.contains('is-open')) closeCv();
    });
  }

  // ── Mobile nav drawer ──
  const hamburger = document.getElementById('hamburger');
  const drawer    = document.getElementById('mobile-drawer');
  const scrim     = document.getElementById('drawer-scrim');

  if (hamburger && drawer && scrim) {
    function openDrawer() {
      hamburger.classList.add('is-open');
      drawer.classList.add('is-open');
      scrim.classList.add('is-open');
      scrim.hidden = false;
      hamburger.setAttribute('aria-expanded', 'true');
      drawer.setAttribute('aria-hidden', 'false');
    }

    function closeDrawer() {
      hamburger.classList.remove('is-open');
      drawer.classList.remove('is-open');
      scrim.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
      drawer.setAttribute('aria-hidden', 'true');
    }

    function toggleDrawer() {
      if (drawer.classList.contains('is-open')) closeDrawer();
      else openDrawer();
    }

    hamburger.addEventListener('click', toggleDrawer);
    scrim.addEventListener('click', closeDrawer);

    // Links still navigate via the existing [data-nav] handler; just close after.
    drawer.querySelectorAll('.drawer-link').forEach(link =>
      link.addEventListener('click', closeDrawer)
    );

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) closeDrawer();
    });
  }

  // ── Experience accordion (mobile) ──
  // Toggles .is-open on a row; CSS only reveals bullets at ≤768px, so this is
  // inert on desktop. Only one row open at a time; rows without bullets are skipped.
  const xpRows = document.querySelectorAll('.panel[data-section="experience"] .xp-row');
  xpRows.forEach(row => {
    if (!row.querySelector('.xp-bullets')) return;
    row.addEventListener('click', () => {
      const wasOpen = row.classList.contains('is-open');
      xpRows.forEach(r => r.classList.remove('is-open'));
      if (!wasOpen) row.classList.add('is-open');
    });
  });
})();
