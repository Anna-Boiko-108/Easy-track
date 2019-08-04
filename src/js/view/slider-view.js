export default function renderSlider() {
  prepareSection();
  render();
  init();
  window.addEventListener("load", init);
  window.addEventListener("hashchange", init);
}

function prepareSection() {
  const section = document.querySelector(".slider");
  if (section) {
    section.parentNode.removeChild(section);
  }
}

function render() {
  const sliderHTML = `
    <div class="slider-container">
      <div class="slide">
        <picture>
          <source type="image/webp" srcset="/assets/img/slide-01.webp">
          <img src="/assets/img/slide-01.jpg" alt="Carpathian Mountains">
        </picture>
      </div>
      <div class="slide">
        <picture>
          <source type="image/webp" srcset="/assets/img/slide-02.webp">
          <img src="/assets/img/slide-02.jpg" alt="Carpathian Mountains">
        </picture>
      </div>
      <div class="slide">
        <picture>
          <source type="image/webp" srcset="/assets/img/slide-03.webp">
          <img src="/assets/img/slide-03.jpg" alt="Carpathian Mountains">
        </picture>
      </div>
      <div class="slide">
        <picture>
          <source type="image/webp" srcset="/assets/img/slide-04.webp">
          <img src="/assets/img/slide-04.jpg" alt="Carpathian Mountains">
        </picture>
      </div>
      <div class="slide">
        <picture>
          <source type="image/webp" srcset="/assets/img/slide-05.webp">
          <img src="/assets/img/slide-05.jpg" alt="Carpathian Mountains">
        </picture>
      </div>
    </div>
    <a class="prev">&#10094;</a>
    <a class="next">&#10095;</a>`;

  const slider = document.createElement("section");
  slider.classList.add("slider");
  slider.innerHTML = sliderHTML;

  const main = document.querySelector(".main");
  main.insertAdjacentElement("afterbegin", slider);

  // Get DOM elements
  const sliderContainer = document.querySelector(".slider-container");
  const slides = document.getElementsByClassName("slide");

  // Create clones of the first and the last images
  const lastImgClone = slides[slides.length - 1].cloneNode(true);
  const firstImgClone = slides[0].cloneNode(true);
  lastImgClone.id = "last-clone";
  firstImgClone.id = "first-clone";
  sliderContainer.insertBefore(lastImgClone, slides[0]);
  sliderContainer.appendChild(firstImgClone);
}

function init() {
  const slider = document.querySelector(".slider");
  const sliderContainer = document.querySelector(".slider-container");
  const slides = document.getElementsByClassName("slide");
  const imageWidth = document.querySelector(".slide img").clientWidth;

  // Slide counter
  let slideInd = 1;

  // Start slideshow from second image
  sliderContainer.style.transform = `translateX(${-slideInd * imageWidth}px)`;

  // Arrow controls
  const prevControl = document.querySelector(".prev");
  const nextControl = document.querySelector(".next");

  // Move slide on click
  prevControl.addEventListener("click", () => {
    moveSlide(-1);
  });
  nextControl.addEventListener("click", () => {
    moveSlide(1);
  });

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

  function moveSlide(i) {
    if (slideInd <= 0 || slideInd >= slides.length - 1) return;
    slideInd += i;
    showSlide();
  }

  function showSlide() {
    sliderContainer.style.transition = "transform 1s ease";
    sliderContainer.style.transform = `translateX(${-slideInd * imageWidth}px)`;
  }

  function replaceSlide() {
    sliderContainer.style.transition = "none";
    sliderContainer.style.transform = `translateX(${-slideInd * imageWidth}px)`;
  }

  // Start auto slideshow
  let autoSlideShow = setInterval(() => {
    moveSlide(1);
  }, 5000);

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
}
