let currentSlide = 0;
let slideInterval;

function showSlide(index) {
  const slides = document.querySelectorAll('.slides img');
  slides[currentSlide].classList.remove('active');
  currentSlide = (index + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
}

function changeSlide(direction) {
  showSlide(currentSlide + direction);
}

function startAutoSlide() {
  slideInterval = setInterval(() => {
    changeSlide(1);
  }, 5000); // Change slide every 5 seconds
}

function stopAutoSlide() {
  clearInterval(slideInterval);
}

// Initialize the slideshow
document.addEventListener('DOMContentLoaded', () => {
  showSlide(currentSlide);
  startAutoSlide();

  // Pause auto-slide on hover
  const slideshow = document.querySelector('.slideshow');
  slideshow.addEventListener('mouseenter', stopAutoSlide);
  slideshow.addEventListener('mouseleave', startAutoSlide);
});