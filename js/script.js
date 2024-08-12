/*-------------------------------------------------*/
/* ANIMATE ANIMATION SET-UP */
/*-------------------------------------------------*/
const pictures = document.querySelectorAll(".animate");

observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.boundingClientRect.top > 0) {
            // Apply the animation when scrolling down into the element
            entry.target.style.animation = `${entry.target.dataset.type || "fade-up"} ${entry.target.dataset.duration || "1s"} ${entry.target.dataset.delay || "0.5s"} forwards ${entry.target.dataset.curve || "ease-out"}`;
        } else if (!entry.isIntersecting && entry.boundingClientRect.top > 0) {
            // Reset the animation when scrolling up past the element (i.e., when it exits from the top)
            entry.target.style.animation = 'none';
            // Trigger reflow to restart the animation when it comes back into view
            entry.target.offsetHeight; // This forces a reflow, allowing the animation to restart
        }
    });
});

pictures.forEach(picture => {
    observer.observe(picture);
});


/*-------------------------------------------------*/
/* ANIMATED FAVICON GIF */
/*-------------------------------------------------*/
var faviconFrames = [
  '../imgs/icons/1-F.png',
  '../imgs/icons/2-R.png',
  '../imgs/icons/3-8.png',
];

var currentFrame = 0;

function animateFavicon() {
  var link = document.querySelector("link[rel~='icon']");
  if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(link);
  }
  link.href = faviconFrames[currentFrame];
  currentFrame = (currentFrame + 1) % faviconFrames.length;
}

setInterval(animateFavicon, 20); // in milliseconds


/* ----------------------------------------------------- */
/* LOADING SCREEN */
/* ----------------------------------------------------- */
window.addEventListener("load", function() {
  const loader1 = document.querySelector(".loading");
  loader1.className += " hidden"; //class "loader hidden"
});


/* ----------------------------------------------------- */
/* CURSOR */
/* ----------------------------------------------------- */
var cursor = document.querySelector('.cursor'),
    cursorScale = document.querySelectorAll('.cursor-active'),
    mouseX = 0,
    mouseY = 0,
    posX = 0,
    posY = 0;

// Adjust the smoothness by increasing the duration and using easing
gsap.to({}, 0.01, {
    repeat: -1,
    onRepeat: function () {
        posX += (mouseX - posX) * 0.1; // Adjust the 0.1 value to control smoothness
        posY += (mouseY - posY) * 0.1; // Lower values will make the cursor move slower
        gsap.set(cursor, {
            css: {
                left: posX,
                top: posY
            }
        });
    }
});

window.addEventListener("mousemove", function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

cursorScale.forEach(link => {
    link.addEventListener('mouseleave', () => {
        cursor.classList.remove('grow');
        cursor.classList.remove('grow-small');
    });
    link.addEventListener('mousemove', () => {
        cursor.classList.add('grow');
        if (link.classList.contains('small')) {
            cursor.classList.remove('grow');
            cursor.classList.add('grow-small');
        }
    });
});


/* ----------------------------------------------------- */
/* HEADER BACKGROUND MOUSE EFFECT */
/* ----------------------------------------------------- */
// images setup
const images = [
  "../imgs/header-bg-2-lighter.png"
];

// content setup
const texts = [
  [""],
];

// init plugin
rgbKineticSlider = new rgbKineticSlider({
  // images and content sources
  slideImages: images, // array of images >demo size : 1920 x 1080
  itemsTitles: texts, // array of titles / subtitles

  // displacement images sources
  backgroundDisplacementSprite: "https://i.ibb.co/N246LxD/map-9.jpg", // slide displacement image
  cursorDisplacementSprite: "../imgs/1.jpg", // cursor displacement image

  // cursor displacement effect
  cursorImgEffect: true, // enable cursor effect
  cursorTextEffect: false, // enable cursor text effect
  cursorScaleIntensity: 0.35, // cursor effect intensity
  cursorMomentum: 0.14, // lower is slowery

  // image rgb effect
  imagesRgbEffect: true, // enable img rgb effect
  imagesRgbIntensity: 0.9, // set img rgb intensity
  navImagesRgbIntensity: 80, // set img rgb intensity for regular nav
});


/* ----------------------------------------------------- */
/* LIGHT FOLLOW MOUSE */
/* ----------------------------------------------------- */
const pos = document.querySelector('.mouse-light');
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    document.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
    });

    function animate() {
        currentX += (targetX - currentX) * 0.03;
        currentY += (targetY - currentY) * 0.03;

        pos.style.background = `radial-gradient(circle at ${currentX}px ${currentY}px, transparent 0%, rgba(18, 18, 18, 0.99) 30%)`;

        requestAnimationFrame(animate);
    }

    animate();


/* ----------------------------------------------------- */
/* COUNT DOWN */
/* ----------------------------------------------------- */
// Date Set
var countDownDate = new Date("Jan 07, 2025 23:59:59").getTime();

// Update the countdown every 1 second
var x = setInterval(function() {

    // Today's time
    var now = new Date().getTime();

    // Differential
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the time
    document.getElementById("countdown").innerHTML = days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";

    // If the countdown is finished, write some text
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "LAUNCHED";
    }
}, 1000);


/* ----------------------------------------------------- */
/* GSAP SCROLL SMOOTHER */
/* ----------------------------------------------------- */
gsap.registerPlugin(ScrollTrigger);

// Smoothly animate sections into view as you scroll
/*gsap.utils.toArray(".section:not(header)").forEach((section) => {
  gsap.from(section, {
      opacity: 1,
      y: 100,
      duration: 1,
      ease: "power1.out",
      scrollTrigger: {
          trigger: section,
          start: "top 80%",  // When the top of the section reaches 80% of the viewport height
          end: "bottom 20%", // When the bottom of the section reaches 20% of the viewport height
          scrub: 1.5,
          toggleActions: "play none none reverse"
      }
  });
});*/

/*-------------------------------------------------*/
  /* LOCOMOTIVE SCROLL INIT */
/*-------------------------------------------------*/
document.addEventListener("DOMContentLoaded", function () {
  // Initialize Locomotive Scroll
  const locoScroll = new LocomotiveScroll({
      el: document.querySelector("#smooth-wrapper"),
      smooth: true,
      multiplier: 0.5
  });

  // Synchronize ScrollTrigger with Locomotive Scroll
  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy("#smooth-wrapper", {
      scrollTop(value) {
          return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
          return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
      pinType: document.querySelector("#smooth-wrapper").style.transform ? "transform" : "fixed"
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();

  // NAVIGATION LOGO
  var navLogo = document.querySelector('#nav_logo');

  locoScroll.on('scroll', (args) => {
      // Access the scroll position
      var scrollY = args.scroll.y;

      // Check the scroll position and add/remove the active class
      if (scrollY > 500) {
          navLogo.classList.add('active');
      } else {
          navLogo.classList.remove('active');
      }
  });

  //NAVIGATION OPTIONS
  var navOptions = document.querySelector('#nav_options');

  locoScroll.on('scroll', (args) => {
    // Access the scroll position
    var scrollY = args.scroll.y;

    // Check the scroll position and add/remove the active class
    if (scrollY > 500) {
        navOptions.classList.add('active');
    } else {
        navOptions.classList.remove('active');
    }
  });

  // GSAP Parallax Effect on the background image
  gsap.to(".contact", {
      backgroundPositionY: "-40%", // Adjust the background position to create the parallax effect
      ease: "none",
      scrollTrigger: {
          trigger: ".contact",
          scroller: "#smooth-wrapper",
          start: "top bottom", // Trigger the effect when .contact enters the viewport
          end: "bottom top",   // End the effect when .contact exits the viewport
          scrub: true,         // Smooth scrubbing
      }
  });

  gsap.to(".header-body", {
    yPercent: 50, // Adjust this value to control the intensity of the parallax effect
    ease: "power1.out", // Control the easing of the parallax movement
    scrollTrigger: {
        trigger: "header", // Use the header as the trigger element
        scroller: "#smooth-wrapper",
        start: "top top", // Start the parallax effect as soon as the header is in view
        end: "bottom top", // End the effect when the header exits the view
        scrub: true, // Smooth scrubbing as you scroll
    }
  });
});




/*-------------------------------------------------*/
/* FAQ ANIMATION */
/*-------------------------------------------------*/
const items = document.querySelectorAll(".accordion button");

function toggleAccordion() {
  const itemToggle = this.getAttribute('aria-expanded');
  
  for (i = 0; i < items.length; i++) {
    items[i].setAttribute('aria-expanded', 'false');
  }
  
  if (itemToggle == 'false') {
    this.setAttribute('aria-expanded', 'true');
  }
}

items.forEach(item => item.addEventListener('click', toggleAccordion));


