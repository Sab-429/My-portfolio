/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show");
    });
  }
};
showMenu("nav-toggle", "nav-menu");

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

const scrollActive = () => {
  const scrollDown = window.scrollY;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute("id"),
      sectionsClass = document.querySelector(
        ".nav__menu a[href*=" + sectionId + "]",
      );

    if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
      sectionsClass.classList.add("active-link");
    } else {
      sectionsClass.classList.remove("active-link");
    }
  });
};
window.addEventListener("scroll", scrollActive);

// ===== SKILLS CLEAN ROW ANIMATION =====
const skillCards = document.querySelectorAll(".skills__card");

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show-skill");
        observer.unobserve(entry.target); // animate only once
      }
    });
  },
  {
    threshold: 0.2,
  },
);

skillCards.forEach((card) => {
  observer.observe(card);
});

// ===== WORK / PROJECTS ANIMATION =====
const workCards = document.querySelectorAll(".work__card");

const workObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show-work");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 },
);

workCards.forEach((card) => {
  workObserver.observe(card);
});

const text = "Hi,\nI am Sabyasachi";
const typingElement = document.getElementById("typing");
let index = 0;

function typeEffect() {
  if (index < text.length) {
    if (text.charAt(index) === "\n") {
      typingElement.innerHTML += "<br>";
    } else {
      typingElement.innerHTML += text.charAt(index);
    }

    index++;
    setTimeout(typeEffect, 120);
  }
}

window.onload = typeEffect;

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2000,
  delay: 200,
  //     reset: true
});

sr.reveal(
  ".home__data, .about__img, .skills__category, .skills__list, .work__title, .work__description .",
  {},
);
sr.reveal(".home__img, .about__subtitle, .about__text, .skills__img", {
  delay: 400,
});
sr.reveal(".home__social-icon", { interval: 200 });
sr.reveal(".skills__card, .work__card, .contact__input", { interval: 200 });

document
  .getElementById("contactForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };
    try {
      const response = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      alert(result.message);
    } catch (error) {
      alert("Something went wrong!");
      console.error(error);
    }
  });
