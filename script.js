/*
  JJ Portfolio — Minimal JS
  - Mobile nav toggle
  - Smooth hash scrolling with offset
  - Reveal-on-scroll animations
  - Footer year
*/

(function () {
  const navToggleButton = document.querySelector('.nav-toggle');
  const siteNav = document.getElementById('site-nav');

  if (navToggleButton && siteNav) {
    navToggleButton.addEventListener('click', () => {
      const isExpanded = siteNav.getAttribute('aria-expanded') === 'true';
      siteNav.setAttribute('aria-expanded', String(!isExpanded));
      navToggleButton.setAttribute('aria-expanded', String(!isExpanded));
    });

    // Close on link click (mobile)
    siteNav.addEventListener('click', (e) => {
      const target = e.target;
      if (target && target.tagName === 'A' && siteNav.getAttribute('aria-expanded') === 'true') {
        siteNav.setAttribute('aria-expanded', 'false');
        navToggleButton.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Smooth scroll for internal links with header offset
  const header = document.querySelector('.site-header');
  const headerHeight = () => (header ? header.offsetHeight : 0);
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href || href === '#') return;
    const targetEl = document.querySelector(href);
    if (!targetEl) return;
    e.preventDefault();
    const top = targetEl.getBoundingClientRect().top + window.scrollY - headerHeight() - 8;
    window.scrollTo({ top, behavior: 'smooth' });
    history.pushState(null, '', href);
  });

  // Intersection Observer for reveal animations
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('visible'));
  }

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();


