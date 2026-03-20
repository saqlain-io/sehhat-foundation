// ===== SEHHAT FOUNDATION — GLOBAL SCRIPT =====

document.addEventListener('DOMContentLoaded', function () {

  // ---- Language Toggle ----
  const savedLang = localStorage.getItem('sf-lang') || 'en';
  setLang(savedLang);

  // ---- Hamburger Menu ----
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    // Close on link click
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  // ---- Active Nav Link ----
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ---- Scroll Reveal ----
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

});

// ---- Language Switcher ----
function setLang(lang) {
  document.documentElement.setAttribute('lang', lang);
  localStorage.setItem('sf-lang', lang);

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.lang === lang) btn.classList.add('active');
  });
}

// ---- Contact Form Submit ----
function submitContact(e) {
  e.preventDefault();
  const btn = document.getElementById('contact-submit');
  const msg = document.getElementById('form-success');
  if (btn) { btn.disabled = true; btn.textContent = 'Sending...'; }
  setTimeout(() => {
    if (btn) { btn.textContent = 'Message Sent ✓'; btn.style.background = '#4caf50'; }
    if (msg) { msg.style.display = 'block'; }
  }, 1200);
}

// ---- Donate Amount Select ----
function selectAmount(btn) {
  document.querySelectorAll('.donate-amount').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
}

// ---- Gallery Lightbox ----
function openLightbox(src, caption) {
  let lb = document.getElementById('lightbox');
  if (!lb) {
    lb = document.createElement('div');
    lb.id = 'lightbox';
    lb.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.9);z-index:9999;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:16px;cursor:pointer;';
    lb.innerHTML = `<img id="lb-img" style="max-width:90vw;max-height:80vh;border-radius:12px;object-fit:contain;">
      <p id="lb-cap" style="color:white;font-size:14px;font-family:Nunito,sans-serif;text-align:center;"></p>
      <button onclick="document.getElementById('lightbox').style.display='none'" style="position:absolute;top:20px;right:30px;background:none;border:none;color:white;font-size:32px;cursor:pointer;">✕</button>`;
    lb.addEventListener('click', (e) => { if (e.target === lb) lb.style.display = 'none'; });
    document.body.appendChild(lb);
  }
  document.getElementById('lb-img').src = src;
  document.getElementById('lb-cap').textContent = caption || '';
  lb.style.display = 'flex';
}
