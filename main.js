// ==========================================
// Main JavaScript - Animations & Interactions
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  initTypingAnimation();
  initScrollAnimations();
  initNavigation();
  initSkillCardEffects();
  initParallaxEffects();
});

// ==========================================
// Typing Animation for Greetings
// ==========================================
function initTypingAnimation() {
  const greetings = [
    "Hello",      // English
    "Bonjour",    // French
    "Hola",       // Spanish
    "Ciao",       // Italian
    "سلام",        // Farsi
    "Olá",        // Portuguese
    "Привет",     // Russian
    "你好",        // Chinese
    "こんにちは",   // Japanese
    "안녕하세요"    // Korean
  ];

  const helloText = document.getElementById('hello-text');
  const cursor = document.getElementById('cursor');

  if (!helloText || !cursor) return;

  let greetingIndex = 0;
  let letterIndex = 0;
  let typing = true;

  // Cursor blink
  setInterval(() => {
    cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
  }, 500);

  function typeGreeting() {
    const currentGreeting = greetings[greetingIndex];

    if (typing) {
      if (letterIndex < currentGreeting.length) {
        helloText.textContent += currentGreeting[letterIndex];
        letterIndex++;
        setTimeout(typeGreeting, 120);
      } else {
        typing = false;
        setTimeout(typeGreeting, 2000); // Pause before deleting
      }
    } else {
      if (letterIndex > 0) {
        helloText.textContent = currentGreeting.substring(0, letterIndex - 1);
        letterIndex--;
        setTimeout(typeGreeting, 60);
      } else {
        greetingIndex = (greetingIndex + 1) % greetings.length;
        typing = true;
        setTimeout(typeGreeting, 400);
      }
    }
  }

  // Start typing after a short delay
  setTimeout(typeGreeting, 1000);
}

// ==========================================
// Scroll-Based Animations
// ==========================================
function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger animations
        setTimeout(() => {
          entry.target.classList.add('animate-in');
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe skill categories
  document.querySelectorAll('.skill-category').forEach((el, i) => {
    el.style.animationDelay = `${i * 0.15}s`;
    observer.observe(el);
  });

  // Observe project cards
  document.querySelectorAll('.project-card').forEach((el, i) => {
    el.style.animationDelay = `${i * 0.2}s`;
    observer.observe(el);
  });

  // Observe connect cards
  document.querySelectorAll('.connect-card').forEach((el, i) => {
    el.style.animationDelay = `${i * 0.15}s`;
    observer.observe(el);
  });
}

// ==========================================
// Navigation Active State
// ==========================================
function initNavigation() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav(); // Initial call

  // Smooth scroll for nav links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ==========================================
// Skill Card Mouse Effects
// ==========================================
function initSkillCardEffects() {
  const skillCategories = document.querySelectorAll('.skill-category');

  skillCategories.forEach(category => {
    category.addEventListener('mousemove', (e) => {
      const rect = category.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      category.style.setProperty('--mouse-x', `${x}%`);
      category.style.setProperty('--mouse-y', `${y}%`);
    });

    category.addEventListener('mouseleave', () => {
      category.style.setProperty('--mouse-x', '50%');
      category.style.setProperty('--mouse-y', '50%');
    });
  });

}

// ==========================================
// Parallax Effects
// ==========================================
function initParallaxEffects() {
  const heroContent = document.querySelector('.hero-content');
  
  if (!heroContent) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroHeight = document.querySelector('.hero-section').offsetHeight;
    
    if (scrolled < heroHeight) {
      // Subtle parallax on hero content
      const translateY = scrolled * 0.3;
      const opacity = 1 - (scrolled / heroHeight) * 1.5;
      
      heroContent.style.transform = `translateY(${translateY}px)`;
      heroContent.style.opacity = Math.max(0, opacity);
    }
  });
}

// ==========================================
// Project Card 3D Tilt Effect
// ==========================================
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
  });
});

// ==========================================
// Connect Card Hover Sound Effect (Optional)
// ==========================================
document.querySelectorAll('.connect-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    // Subtle scale animation already in CSS
    // Could add sound effect here if desired
  });
});

// ==========================================
// Navbar Background on Scroll
// ==========================================
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(15, 23, 45, 0.95)';
      navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
    } else {
      navbar.style.background = 'rgba(15, 23, 45, 0.8)';
      navbar.style.boxShadow = 'none';
    }
  });
}

// ==========================================
// Easter Egg: Konami Code
// ==========================================
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
  konamiCode.push(e.key);
  konamiCode = konamiCode.slice(-10);
  
  if (konamiCode.join(',') === konamiPattern.join(',')) {
    // Fun animation when konami code is entered
    document.body.style.animation = 'rainbow 2s linear';
    setTimeout(() => {
      document.body.style.animation = '';
    }, 2000);
  }
});

// Add rainbow animation to stylesheet dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes rainbow {
    0% { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(360deg); }
  }
`;
document.head.appendChild(style);

// ==========================================
// Performance: Reduce animations on low-end devices
// ==========================================
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.style.setProperty('--animation-duration', '0s');
  
  // Disable parallax
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.transform = 'none';
    heroContent.style.opacity = '1';
  }
}
