/**
 * EZATI KAMILA - Digital Marketing Strategist & Business Analyst
 * Interactive Functionality & Modern UI Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Toggle (Dark Mode / Light Mode)
  initThemeToggle();

  // 2. Navigation & Mobile Drawer
  initNavigation();

  // 3. Scroll Progress & Header Shadow
  initScrollEffects();

  // 4. Number Counters
  initNumberCounters();

  // 5. Skills Tab Filtering
  initSkillsFilter();

  // 6. Portfolio Category Filtering
  initPortfolioFilter();

  // 7. Contact Form & WhatsApp Quick Send
  initContactForm();

  // 8. Back to Top Button
  initBackToTop();

  // 9. Current Year
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});

/* ==========================================================
   1. Theme Management (Dark / Light)
   ========================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const body = document.body;

  // Retrieve saved preference or use system preference
  const savedTheme = localStorage.getItem('ezati_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
  } else if (prefersDark) {
    body.setAttribute('data-theme', 'dark');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = body.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      body.setAttribute('data-theme', newTheme);
      localStorage.setItem('ezati_theme', newTheme);
    });
  }
}

/* ==========================================================
   2. Navigation & Mobile Menu
   ========================================================== */
function initNavigation() {
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const iconBars = document.querySelector('.icon-bars');
  const iconClose = document.querySelector('.icon-close');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navMenu.classList.toggle('open');
      if (iconBars && iconClose) {
        iconBars.style.display = isOpen ? 'none' : 'inline-block';
        iconClose.style.display = isOpen ? 'inline-block' : 'none';
      }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        navMenu.classList.remove('open');
        if (iconBars && iconClose) {
          iconBars.style.display = 'inline-block';
          iconClose.style.display = 'none';
        }
      }
    });

    // Close mobile menu on clicking any navigation link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          if (iconBars && iconClose) {
            iconBars.style.display = 'inline-block';
            iconClose.style.display = 'none';
          }
        }
      });
    });
  }

  // Active link highlighter on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (targetLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetLink.classList.add('active');
        } else {
          targetLink.classList.remove('active');
        }
      }
    });
  });
}

/* ==========================================================
   3. Scroll Effects (Header Shadow & Progress Bar)
   ========================================================== */
function initScrollEffects() {
  const header = document.getElementById('header');
  const progressBar = document.getElementById('scroll-progress');

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    // Header shadow
    if (header) {
      if (scrollTop > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Progress bar
    if (progressBar && docHeight > 0) {
      const progressPercent = (scrollTop / docHeight) * 100;
      progressBar.style.width = `${progressPercent}%`;
    }
  });
}

/* ==========================================================
   4. Animated Number Counters
   ========================================================== */
function initNumberCounters() {
  const counterElements = document.querySelectorAll('.stat-number');
  if (counterElements.length === 0) return;

  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        counterElements.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          const duration = 1600; // ms
          const frameDuration = 1000 / 60;
          const totalFrames = Math.round(duration / frameDuration);
          let frame = 0;

          const timer = setInterval(() => {
            frame++;
            // Ease-out curve
            const progress = frame / totalFrames;
            const currentCount = Math.round(target * (1 - Math.pow(1 - progress, 3)));

            counter.textContent = currentCount;

            if (frame >= totalFrames) {
              counter.textContent = target;
              clearInterval(timer);
            }
          }, frameDuration);
        });
      }
    });
  }, { threshold: 0.35 });

  const statsBar = document.querySelector('.stats-bar');
  if (statsBar) {
    observer.observe(statsBar);
  }
}

/* ==========================================================
   5. Skills Tab Filtering
   ========================================================== */
function initSkillsFilter() {
  const tabButtons = document.querySelectorAll('.skill-tab-btn');
  const skillCards = document.querySelectorAll('.skill-card-item');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.4s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================
   6. Portfolio Category Filtering
   ========================================================== */
function initPortfolioFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      portfolioCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================
   7. Contact Form Handling & WhatsApp Integration
   ========================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const alertBox = document.getElementById('form-alert');
  const btnWhatsApp = document.getElementById('btn-send-whatsapp');

  // Direct WhatsApp Button click
  if (btnWhatsApp) {
    btnWhatsApp.addEventListener('click', () => {
      const name = document.getElementById('sender-name')?.value.trim() || 'Rekan Bisnis / Recruiter';
      const email = document.getElementById('sender-email')?.value.trim() || '-';
      const service = document.getElementById('service-type')?.value || 'Konsultasi Strategis';
      const message = document.getElementById('sender-message')?.value.trim() || 'Halo Ezati Kamila, saya tertarik untuk mendiskusikan peluang kerjasama / posisi profesional.';

      const waNumber = '6281234567890'; // Sesuaikan nomor WhatsApp Ezati Kamila
      const waText = `Halo Ezati Kamila,\n\nNama/Perusahaan: ${name}\nEmail: ${email}\nTopik Kebutuhan: ${service}\n\nPesan:\n${message}`;

      const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waText)}`;
      window.open(waUrl, '_blank');
    });
  }

  // Form submission
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('sender-name').value.trim();
      const email = document.getElementById('sender-email').value.trim();
      const service = document.getElementById('service-type').value;
      const message = document.getElementById('sender-message').value.trim();

      if (!name || !email || !message) {
        showAlert('Harap isi semua kolom wajib bertanda bintang (*).', 'error');
        return;
      }

      // Simulate sending
      const submitBtn = form.querySelector('.btn-submit');
      const originalBtnHtml = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Mengirimkan Pesan...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = originalBtnHtml;
        submitBtn.disabled = false;
        showAlert(`Terima kasih Bapak/Ibu ${name}! Pesan Anda mengenai "${service}" telah berhasil dikirim. Ezati Kamila akan segera merespons ke email (${email}) Anda dalam waktu 1x24 jam kerja.`, 'success');
        form.reset();
      }, 1000);
    });
  }

  function showAlert(msg, type) {
    if (!alertBox) return;
    alertBox.textContent = msg;
    alertBox.className = `form-alert-msg ${type}`;
    alertBox.style.display = 'block';

    setTimeout(() => {
      alertBox.style.display = 'none';
    }, 8000);
  }
}

/* ==========================================================
   8. Back to Top Button
   ========================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 380) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Add simple fade animation
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
`;
document.head.appendChild(styleSheet);
