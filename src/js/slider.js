"use strict";

// Get DOM elements
const slider = document.querySelector(".slider");
const sliderContainer = document.querySelector(".slider-container");
const slides = document.getElementsByClassName("slide");
const imageWidth = document.querySelector(".slide img").clientWidth;

// Create clones of the first and the last images
const lastImgClone = slides[slides.length - 1].cloneNode(true);
const firstImgClone = slides[0].cloneNode(true);
lastImgClone.id = "last-clone";
firstImgClone.id = "first-clone";
sliderContainer.insertBefore(lastImgClone, slides[0]);
sliderContainer.appendChild(firstImgClone);

// Slide counter
let slideInd = 1;

// Start auto slideshow
let autoSlideShow;
window.addEventListener("load", startAutoSlideShow);

// Start slideshow from second image
sliderContainer.style.transform = `translateX(${-slideInd * imageWidth}px)`;

// Arrow controls
const prevControl = document.getElementsByClassName("prev");
const nextControl = document.getElementsByClassName("next");

// Move slide on click
prevControl[0].addEventListener("click", () => {
  moveSlide(-1);
});
nextControl[0].addEventListener("click", () => {
  moveSlide(1);
});

function moveSlide(i) {
  if (slideInd <= 0 || slideInd >= slides.length - 1) return;
  slideInd += i;
  showSlide(slideInd);
}

// Replace image with it's clone
sliderContainer.addEventListener("transitionend", () => {
  if (slides[slideInd].id === "first-clone") {
    slideInd = 1;
    replaceSlide();
  }
  if (slides[slideInd].id === "last-clone") {
    slideInd = slides.length - 2;
    replaceSlide();
  }
});

function showSlide() {
  sliderContainer.style.transition = "transform 1s ease";
  sliderContainer.style.transform = `translateX(${-slideInd * imageWidth}px)`;
}

function replaceSlide() {
  sliderContainer.style.transition = "none";
  sliderContainer.style.transform = `translateX(${-slideInd * imageWidth}px)`;
}

// Auto slideshow
slider.addEventListener("mouseout", startAutoSlideShow);
slider.addEventListener("mouseover", stopAutoSlideShow);

function startAutoSlideShow() {
  autoSlideShow = setInterval(() => {
    moveSlide(1);
  }, 5000);
}

function stopAutoSlideShow() {
  clearInterval(autoSlideShow);
}
