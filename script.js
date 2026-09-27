/* =========================================
   SAFARI CAROUSEL
========================================= */

const slider = document.getElementById("safariSlider");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const dotsContainer = document.getElementById("sliderDots");

/* Make sure Safari carousel exists */
if (slider && nextBtn && prevBtn && dotsContainer) {

  /* Get all original cards */
  let cards = Array.from(
    slider.querySelectorAll(".card")
  );

  /* Current position */
  let currentIndex = 0;

  /* Automatic slide timer */
  let autoSlide;


  /* =========================================
     GET NUMBER OF VISIBLE CARDS
  ========================================= */

  function getVisibleCards() {

    if (window.innerWidth <= 600) {
      return 1;
    }

    if (window.innerWidth <= 900) {
      return 2;
    }

    return 3;
  }


  /* =========================================
     CALCULATE CARD WIDTH
  ========================================= */

  function getCardWidth() {

    const card = slider.querySelector(".card");

    if (!card) {
      return 0;
    }

    const style =
      window.getComputedStyle(slider);

    const gap =
      parseFloat(style.gap) || 25;

    return card.offsetWidth + gap;
  }


  /* =========================================
     TOTAL SLIDES
  ========================================= */

  function getTotalSlides() {

    const visibleCards =
      getVisibleCards();

    return Math.max(
      1,
      cards.length - visibleCards + 1
    );
  }


  /* =========================================
     CREATE DOTS
  ========================================= */

  function createDots() {

    dotsContainer.innerHTML = "";

    const totalSlides =
      getTotalSlides();

    for (
      let i = 0;
      i < totalSlides;
      i++
    ) {

      const dot =
        document.createElement("button");

      dot.classList.add(
        "slider-dot"
      );

      if (i === currentIndex) {
        dot.classList.add("active");
      }

      dot.addEventListener(
        "click",
        function () {

          currentIndex = i;

          updateSlider();

          restartAutoSlide();

        }
      );

      dotsContainer.appendChild(dot);
    }
  }


  /* =========================================
     UPDATE DOTS
  ========================================= */

  function updateDots() {

    const dots =
      dotsContainer.querySelectorAll(
        ".slider-dot"
      );

    dots.forEach(
      function (dot, index) {

        dot.classList.toggle(
          "active",
          index === currentIndex
        );

      }
    );
  }


  /* =========================================
     MOVE SLIDER
  ========================================= */

  function updateSlider() {

    const cardWidth =
      getCardWidth();

    const move =
      currentIndex * cardWidth;

    slider.style.transform =
      `translateX(-${move}px)`;

    updateDots();
  }


  /* =========================================
     NEXT SLIDE
  ========================================= */

  function nextSlide() {

    const totalSlides =
      getTotalSlides();

    currentIndex++;

    if (
      currentIndex >= totalSlides
    ) {

      currentIndex = 0;

    }

    updateSlider();
  }


  /* =========================================
     PREVIOUS SLIDE
  ========================================= */

  function previousSlide() {

    const totalSlides =
      getTotalSlides();

    currentIndex--;

    if (currentIndex < 0) {

      currentIndex =
        totalSlides - 1;

    }

    updateSlider();
  }


  /* =========================================
     AUTOMATIC SLIDER
  ========================================= */

  function startAutoSlide() {

    clearInterval(autoSlide);

    autoSlide =
      setInterval(
        function () {

          nextSlide();

        },
        5000
      );
  }


  /* =========================================
     RESTART TIMER
  ========================================= */

  function restartAutoSlide() {

    clearInterval(autoSlide);

    startAutoSlide();
  }


  /* =========================================
     NEXT BUTTON
  ========================================= */

  nextBtn.addEventListener(
    "click",
    function () {

      nextSlide();

      restartAutoSlide();

    }
  );


  /* =========================================
     PREVIOUS BUTTON
  ========================================= */

  prevBtn.addEventListener(
    "click",
    function () {

      previousSlide();

      restartAutoSlide();

    }
  );


  /* =========================================
     PAUSE WHEN MOUSE IS OVER
  ========================================= */

  const carousel =
    document.querySelector(
      ".safari-carousel"
    );

  if (carousel) {

    carousel.addEventListener(
      "mouseenter",
      function () {

        clearInterval(autoSlide);

      }
    );


    /* =========================================
       RESUME WHEN MOUSE LEAVES
    ========================================= */

    carousel.addEventListener(
      "mouseleave",
      function () {

        startAutoSlide();

      }
    );

  }


  /* =========================================
     INITIALIZE
  ========================================= */

  window.addEventListener(
    "load",
    function () {

      createDots();

      updateSlider();

      startAutoSlide();

    }
  );


  /* =========================================
     RESPONSIVE RESIZE
  ========================================= */

  window.addEventListener(
    "resize",
    function () {

      currentIndex = 0;

      createDots();

      updateSlider();

    }
  );

}


/* =========================================
   DESTINATION CAROUSEL
========================================= */

const destinationGrid =
  document.getElementById(
    "destinationGrid"
  );

const scrollLeft =
  document.getElementById(
    "scrollLeft"
  );

const scrollRight =
  document.getElementById(
    "scrollRight"
  );


/* Make sure Destination carousel exists */

if (
  destinationGrid &&
  scrollLeft &&
  scrollRight
) {

  /* =========================================
     SCROLL LEFT
  ========================================= */

  scrollLeft.addEventListener(
    "click",
    function () {

      destinationGrid.scrollBy({

        left: -350,

        behavior: "smooth"

      });

    }
  );


  /* =========================================
     SCROLL RIGHT
  ========================================= */

  scrollRight.addEventListener(
    "click",
    function () {

      destinationGrid.scrollBy({

        left: 350,

        behavior: "smooth"

      });

    }
  );

}


/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuBtn =
  document.getElementById(
    "menuBtn"
  );

const navLinks =
  document.getElementById(
    "navLinks"
  );


if (menuBtn && navLinks) {

  menuBtn.addEventListener(
    "click",
    function () {

      navLinks.classList.toggle(
        "open"
      );

    }
  );


  /* Close mobile menu after
     selecting a link */

  document
    .querySelectorAll(
      ".nav-links a"
    )
    .forEach(
      function (link) {

        link.addEventListener(
          "click",
          function () {

            navLinks.classList.remove(
              "open"
            );

          }
        );

      }
    );

}


/* =========================================
   CURRENT YEAR
========================================= */

const yearElement =
  document.getElementById(
    "year"
  );

if (yearElement) {

  yearElement.textContent =
    new Date().getFullYear();

}


/* =========================================
   CONTACT FORM
========================================= */

const contactForm =
  document.getElementById(
    "contactForm"
  );

const formNotice =
  document.getElementById(
    "formNotice"
  );


if (contactForm) {

  contactForm.addEventListener(
    "submit",
    function (event) {

      event.preventDefault();

      if (formNotice) {

        formNotice.textContent =
          "Thank you! Your enquiry has been prepared locally. Connect this form to a backend or email service to receive real submissions.";

      }

      this.reset();

    }
  );

}
