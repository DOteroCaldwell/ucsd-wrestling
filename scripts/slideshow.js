
let currentSlide = 0;

function showSlide(index) {
  const slides = document.querySelectorAll('.slides img');
  slides[currentSlide].classList.remove('active');
  currentSlide = (index + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
}

function changeSlide(direction) {
  showSlide(currentSlide + direction);
}

// Initialize the slideshow
document.addEventListener('DOMContentLoaded', () => {
  showSlide(currentSlide);
});