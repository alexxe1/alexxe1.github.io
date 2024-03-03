const slider = document.querySelectorAll(".slider-container__slider img");
let slideIndex = 0;
let intervalID = null;

function initializeSlider() {
  if (slider.length > 0) {
    slider[slideIndex].classList.add("displaySlide");
  }
}

function showSlide(index) {
  if (index >= slider.length) {
    slideIndex = 0;
  } else if (index < 0) {
    slideIndex = slider.length - 1;
  }

  slider.forEach((slide) => {
    slide.classList.remove("displaySlide");
  });

  slider[slideIndex].classList.add("displaySlide");
}

function prevSlide() {
  slideIndex--;
  showSlide(slideIndex);
}

function nextSlide() {
  slideIndex++;
  showSlide(slideIndex);
}

document.addEventListener("DOMContentLoaded", initializeSlider);
