let currentIndex = 0;
const slides = document.querySelectorAll('.hero-slide');

function showNextSlide() {
  slides[currentIndex].classList.remove('active');
  currentIndex = (currentIndex + 1) % slides.length;
  slides[currentIndex].classList.add('active');
}

setInterval(showNextSlide, 4000); // every 4 seconds

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('homeNav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      nav.classList.toggle('active');
      document.body.classList.toggle('nav-open');
    });
  }
});
