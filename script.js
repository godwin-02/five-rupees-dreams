document.addEventListener("DOMContentLoaded", () => {
  
  // 1. INSTANT INITIAL SCREEN LOADER OVERHAUL (Optimized for fast dismiss)
  const loader = document.querySelector(".loader");
  if (loader) {
    // Dismisses loader right after DOM layout finishes initialization
    loader.classList.add("hide"); 
  }

  // 2. THEME MODE TOGGLE BRIDGE
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;

  const savedTheme = localStorage.getItem("theme-mode");
  if (savedTheme === "light") {
    body.classList.add("light-mode");
    if(themeToggle) themeToggle.textContent = "☀️";
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      body.classList.toggle("light-mode");
      if (body.classList.contains("light-mode")) {
        localStorage.setItem("theme-mode", "light");
        themeToggle.textContent = "☀️";
      } else {
        localStorage.setItem("theme-mode", "dark");
        themeToggle.textContent = "🌙";
      }
    });
  }

  // 3. SMOOTH NAVIGATION VIEWPORT SCROLL ACTION
  window.scrollToSection = function() {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // 4. ANIMATION INTERSECTION OBSERVER PIPELINE
  const revealElements = document.querySelectorAll(".reveal");
  const revealOptions = {
    threshold: 0.10,
    rootMargin: "0px 0px -30px 0px"
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target); 
      }
    });
  }, revealOptions);

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  // 5. NAVBAR SCROLL LINK ACTIVE STATE MAPPER
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    let currentSectionId = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - 160) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.classList.add("active");
      }
    });
  });

  // 6. CONTACT INTERACTION SYSTEM WITH POPUP
  const contactForm = document.querySelector(".contact-form");
  const successPopup = document.querySelector(".success-popup");

  if (contactForm && successPopup) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      successPopup.classList.add("show");
      contactForm.reset();

      setTimeout(() => {
        successPopup.classList.remove("show");
      }, 3000);
    });

    successPopup.addEventListener("click", () => {
      successPopup.classList.remove("show");
    });
  }
});