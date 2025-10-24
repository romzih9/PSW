// Banner Carousel functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;

// Create dots for banner carousel
const dotsContainer = document.getElementById('carouselDots');
for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.className = 'dot';
    if (i === 0) dot.classList.add('active');
    dot.onclick = () => goToSlide(i);
    dotsContainer.appendChild(dot);
}

const dots = document.querySelectorAll('.dot');

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[n].classList.add('active');
    dots[n].classList.add('active');
}

function changeSlide(direction) {
    currentSlide += direction;
    
    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }

    showSlide(currentSlide);
}

function goToSlide(n) {
    currentSlide = n;
    showSlide(currentSlide);
}

// Auto-play banner carousel
setInterval(() => {
    changeSlide(1);
}, 5000);

// Gallery Carousel functionality
let currentGallerySlide = 0;
const gallerySlides = document.querySelectorAll('.gallery-slide');
const totalGallerySlides = gallerySlides.length;

// Create dots for gallery carousel
const galleryDotsContainer = document.getElementById('galleryDots');
for (let i = 0; i < totalGallerySlides; i++) {
    const dot = document.createElement('div');
    dot.className = 'dot';
    if (i === 0) dot.classList.add('active');
    dot.onclick = () => goToGallerySlide(i);
    galleryDotsContainer.appendChild(dot);
}

const galleryDots = document.querySelectorAll('#galleryDots .dot');

function showGallerySlide(n) {
    gallerySlides.forEach(slide => slide.classList.remove('active'));
    galleryDots.forEach(dot => dot.classList.remove('active'));
    
    gallerySlides[n].classList.add('active');
    galleryDots[n].classList.add('active');
}

function changeGallerySlide(direction) {
    currentGallerySlide += direction;
    
    if (currentGallerySlide >= totalGallerySlides) {
        currentGallerySlide = 0;
    } else if (currentGallerySlide < 0) {
        currentGallerySlide = totalGallerySlides - 1;
    }
    
    showGallerySlide(currentGallerySlide);
}

function goToGallerySlide(n) {
    currentGallerySlide = n;
    showGallerySlide(currentGallerySlide);
}

// Auto-play gallery carousel
setInterval(() => {
    changeGallerySlide(1);
}, 5000);

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const menuLinks = document.querySelectorAll('.nav-links a');
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 15px rgba(0,0,0,0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// Close popup when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        const courseCards = document.querySelectorAll('.course-card');
        const clickedInsideCard = Array.from(courseCards).some(card => card.contains(e.target));
        
        if (!clickedInsideCard) {
            courseCards.forEach(card => {
                const popup = card.querySelector('.course-popup');
                if (popup) {
                    popup.style.opacity = '0';
                    popup.style.visibility = 'hidden';
                }
            });
        }
    }
});


// ===== COURSE DETAIL POPUP (Desktop + Mobile) =====
const courseCards = document.querySelectorAll('.course-card');
const detailPopup = document.getElementById('courseDetail');

function isMobile() {
  return window.innerWidth <= 768;
}

courseCards.forEach(card => {
  const detailTextEl = card.querySelector('.course-detail-text');
  const detailHTML = detailTextEl ? detailTextEl.innerHTML : '';

  const showPopup = () => {
    const rect = card.getBoundingClientRect();
    detailPopup.innerHTML = detailHTML; // ← Now uses the paragraph content
    detailPopup.classList.add('show');
    detailPopup.classList.remove('left');
    detailPopup.style.display = 'block';

    const popupWidth = 260;
    let top = rect.top + window.scrollY;
    let left = rect.right + 15;

    // If overflow on right edge, flip to left
    if (left + popupWidth > window.innerWidth) {
      left = rect.left - popupWidth - 15;
      detailPopup.classList.add('left');
    }

    // On mobile, show below card
    if (isMobile()) {
      left = rect.left;
      top = rect.bottom + window.scrollY - 100;
      detailPopup.style.width = rect.width + 'px';
      detailPopup.classList.remove('left');
    } else {
      detailPopup.style.width = '260px';
    }

    detailPopup.style.top = `${top}px`;
    detailPopup.style.left = `${left}px`;
  };

  // Desktop hover behavior
  card.addEventListener('mouseenter', () => {
    if (!isMobile()) showPopup();
  });
  card.addEventListener('mouseleave', () => {
    if (!isMobile()) {
      detailPopup.classList.remove('show');
      detailPopup.style.display = 'none';
    }
  });

  // Mobile tap toggle
  card.addEventListener('click', (e) => {
    if (isMobile()) {
      e.stopPropagation();
      if (detailPopup.style.display === 'block' && detailPopup.innerHTML === detailHTML) {
        detailPopup.classList.remove('show');
        detailPopup.style.display = 'none';
      } else {
        showPopup();
      }
    }
  });
});

// Hide tooltip when tapping outside (mobile)
document.addEventListener('click', (e) => {
  if (isMobile() && !e.target.closest('.course-card')) {
    detailPopup.classList.remove('show');
    detailPopup.style.display = 'none';
  }
});


// Hide tooltip when tapping outside (mobile)
document.addEventListener('click', (e) => {
  if (isMobile() && !e.target.closest('.course-card')) {
    detailPopup.classList.remove('show');
    detailPopup.style.display = 'none';
  }
});

// ===== TEAM DETAIL POPUP (Desktop + Mobile) =====
const teamCards = document.querySelectorAll('.team-card');
const teamDetailPopup = document.getElementById('teamDetail');

teamCards.forEach(card => {
  const teamDetailText = card.querySelector('.team-detail-text');
  const detailHTML = teamDetailText ? teamDetailText.innerHTML : '';

  const showPopup = () => {
    const rect = card.getBoundingClientRect();
    detailPopup.innerHTML = detailHTML; // ← Now uses the paragraph content
    detailPopup.classList.add('show');
    detailPopup.classList.remove('left');
    detailPopup.style.display = 'block';

    const popupWidth = 260;
    let top = rect.top + window.scrollY;
    let left = rect.right + 15;

    // If overflow on right edge, flip to left
    if (left + popupWidth > window.innerWidth) {
      left = rect.left - popupWidth - 15;
      detailPopup.classList.add('left');
    }

    // On mobile, show below card
    if (isMobile()) {
      left = rect.left;
      top = rect.bottom + window.scrollY - 100;
      detailPopup.style.width = rect.width + 'px';
      detailPopup.classList.remove('left');
    } else {
      detailPopup.style.width = '260px';
    }

    detailPopup.style.top = `${top}px`;
    detailPopup.style.left = `${left}px`;
  };

  // Desktop hover behavior
  card.addEventListener('mouseenter', () => {
    if (!isMobile()) showPopup();
  });
  card.addEventListener('mouseleave', () => {
    if (!isMobile()) {
      detailPopup.classList.remove('show');
      detailPopup.style.display = 'none';
    }
  });

  // Mobile tap toggle
  card.addEventListener('click', (e) => {
    if (isMobile()) {
      e.stopPropagation();
      if (detailPopup.style.display === 'block' && detailPopup.innerHTML === detailHTML) {
        detailPopup.classList.remove('show');
        detailPopup.style.display = 'none';
      } else {
        showPopup();
      }
    }
  });
});

// Hide tooltip when tapping outside (mobile)
document.addEventListener('click', (e) => {
  if (isMobile() && !e.target.closest('.team-card')) {
    detailPopup.classList.remove('show');
    detailPopup.style.display = 'none';
  }
});

// Hide tooltip when tapping outside (mobile)
document.addEventListener('click', (e) => {
  if (isMobile() && !e.target.closest('.team-card')) {
    detailPopup.classList.remove('show');
    detailPopup.style.display = 'none';
  }
});