document.addEventListener('DOMContentLoaded', () => {
  // --- Mobile Menu Toggle ---
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    // Close menu when clicking links
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }

  // --- Theme Toggle (Dark / Light Mode) ---
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;

  // Initialize theme from localStorage or system preference
  const savedTheme = localStorage.getItem('theme') || 'dark'; // Default to dark theme
  body.className = savedTheme;
  updateThemeIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      if (body.classList.contains('dark')) {
        body.classList.remove('dark');
        body.classList.add('light');
        localStorage.setItem('theme', 'light');
        updateThemeIcon('light');
      } else {
        body.classList.remove('light');
        body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        updateThemeIcon('dark');
      }
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggle) return;
    const icon = themeToggle.querySelector('i');
    if (icon) {
      if (theme === 'dark') {
        icon.className = 'fas fa-sun'; // Show sun in dark mode
      } else {
        icon.className = 'fas fa-moon'; // Show moon in light mode
      }
    }
  }

  // --- Typewriter Animation ---
  const typewriter = document.getElementById('typewriter');
  const words = ['Java Full Stack Developer', 'Cybersecurity Analyst', 'Secure DevOps Enthusiast'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      // Delete characters
      typewriter.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      // Type characters
      typewriter.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 120;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      // Pause at full word
      typingSpeed = 2200;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      // Move to next word
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 500;
    }

    setTimeout(typeEffect, typingSpeed);
  }

  if (typewriter) {
    typeEffect();
  }

  // --- Contact Form Handling ---
  const contactForm = document.getElementById('contactForm');
  const formAlert = document.getElementById('formAlert');

  if (contactForm && formAlert) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('.btn-submit');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending Message <i class="fas fa-spinner fa-spin"></i>';
      
      // Simulate network request
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        
        formAlert.textContent = 'Thank you! Your message has been sent successfully. I will get back to you shortly.';
        formAlert.className = 'form-alert success';
        formAlert.style.display = 'block';
        
        contactForm.reset();
        
        // Auto hide success alert
        setTimeout(() => {
          formAlert.style.display = 'none';
        }, 5000);
      }, 1500);
    });
  }
});
