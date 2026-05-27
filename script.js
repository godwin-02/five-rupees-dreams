/* SCREEN PRELOADER DELAY CLOSURE */
window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");
  setTimeout(() => {
    loader.classList.add("hide");
  }, 2500);
});

/* LAYOUT SCROLL ROUTER ROUTINE */
function scrollToSection() {
  document.getElementById("about").scrollIntoView({
    behavior: "smooth"
  });
}

/* NAVBAR DYNAMICS ON SCROLL */
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.boxShadow = "0 10px 30px var(--shadow-color)";
  } else {
    navbar.style.boxShadow = "none";
  }
});

/* IN-VIEW REVEAL SECTIONS SYSTEM */
const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", revealSections);

function revealSections() {
  const trigger = window.innerHeight - 100;
  reveals.forEach(section => {
    const top = section.getBoundingClientRect().top;
    if (top < trigger) {
      section.classList.add("active");
    }
  });
}
revealSections();

/* SECURE DIALOG MESSAGE POPUP HANDLER */
const form = document.querySelector(".contact-form");
const popup = document.querySelector(".success-popup");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  popup.classList.add("show");
  form.reset();

  setTimeout(() => {
    popup.classList.remove("show");
  }, 3000);
});

/* INTERACTIVE LIGHT/DARK SCHEME CONTROLLER */
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");

  if (document.body.classList.contains("light-mode")) {
    themeToggle.innerHTML = "☀️";
    localStorage.setItem("theme", "light");
  } else {
    themeToggle.innerHTML = "🌙";
    localStorage.setItem("theme", "dark");
  }
});

/* SYSTEM STORAGE RE-SYNC AT STARTUP TIME */
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    themeToggle.innerHTML = "☀️";
  } else {
    document.body.classList.remove("light-mode");
    themeToggle.innerHTML = "🌙";
  }
});

/* ACTIVE ACCENT TRACKER LINKS */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  const scrollY = window.scrollY;

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 240;
    const sectionHeight = section.offsetHeight;
    
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

/* BACKDROP PARALLAX ENGINE */
window.addEventListener("scroll", () => {
  const hero = document.querySelector(".hero");
  let scrollPosition = window.scrollY;
  hero.style.backgroundPositionY = scrollPosition * 0.4 + "px";
});

/* ADVANCED TYPING SEQUENCER ENFORCING TYPOGRAPHICAL SPACES
   Processes sentence strings and accurately appends non-breaking spacing nodes (&nbsp;)
   to prevent words from clustering together.
*/
const titleElement = document.getElementById("typingTitle");
const textPhrase = "THE FIVE RUPEES DREAMS";
titleElement.innerHTML = ""; 

let loopTrackerIndex = 0;

function initiateTypingLoop() {
  if (loopTrackerIndex < textPhrase.length) {
    const singleCharacter = textPhrase.charAt(loopTrackerIndex);
    
    // Explicit condition targeting spaces to render functional layout gaps
    if (singleCharacter === " ") {
      titleElement.innerHTML += "&nbsp;";
    } else {
      titleElement.innerHTML += singleCharacter;
    }
    
    loopTrackerIndex++;
    setTimeout(initiateTypingLoop, 130);
  }
}

// Executes typing right after custom initial load sequence passes
window.addEventListener("load", () => {
  setTimeout(initiateTypingLoop, 3100);
});