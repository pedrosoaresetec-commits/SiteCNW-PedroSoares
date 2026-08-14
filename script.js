// ============================================
// PEDRO SOARES — HOME
// Efeito de terminal, menu mobile e reveal no scroll
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  /* --- Menu mobile --- */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* --- Efeito de digitação no terminal --- */
  const terminalBody = document.getElementById('terminalBody');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const lines = [
    { prompt: '$ whoami', delay: 400 },
    { prompt: 'pedro-soares', delay: 250, isOutput: true },
    { prompt: '$ cat curso.txt', delay: 500 },
    { prompt: 'Técnico em Informática — ETEC MCM — 2ºC', delay: 250, isOutput: true },
    { prompt: '$ cat interesses.txt', delay: 500 },
    { prompt: 'tecnologia, programação, jogos mobile', delay: 250, isOutput: true }
  ];

  function typeLine(el, text, speed, callback) {
    let i = 0;
    const interval = setInterval(() => {
      el.textContent += text.charAt(i);
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        callback && callback();
      }
    }, speed);
  }

  function runTerminal() {
    if (!terminalBody) return;

    if (prefersReducedMotion) {
      terminalBody.textContent = lines.map(l => l.prompt).join('\n');
      return;
    }

    let idx = 0;
    function next() {
      if (idx >= lines.length) {
        const caret = document.createElement('span');
        caret.className = 'caret';
        terminalBody.appendChild(caret);
        return;
      }
      const line = lines[idx];
      const lineEl = document.createElement('div');
      if (line.isOutput) lineEl.style.color = 'var(--text-primary)';
      terminalBody.appendChild(lineEl);
      typeLine(lineEl, line.prompt, 28, () => {
        idx++;
        setTimeout(next, line.delay);
      });
    }
    next();
  }

  runTerminal();

  /* --- Reveal ao rolar a página --- */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }

});