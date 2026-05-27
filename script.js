document.addEventListener("DOMContentLoaded", () => {
  // 1. INITIAL SCREEN LOADER MANAGEMENT
  const loader = document.getElementById("loader");
  if (loader) {
    window.addEventListener("load", () => {
      loader.classList.add("hide");
    });
    // Fallback security checkpoint
    setTimeout(() => {
      loader.classList.add("hide");
    }, 1500);
  }

  // 2. DARK/LIGHT MODE CONFIGURATION INTERFACE
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;

  // Retrieve saved theme preference safely
  const savedTheme = localStorage.getItem("theme-mode");
  if (savedTheme === "light") {
    body.classList.add("light-mode");
    themeToggle.textContent = "☀️";
  }

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

  // 3. SCROLL REVEAL INTERSECTION OBSERVER PIPELINE
  const revealElements = document.querySelectorAll(".reveal");
  const revealOptions = {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target); // Triggers load memory tracking once
      }
    });
  }, revealOptions);

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  // 4. NAVBAR ACTIVE TRACKING COMPONENT
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    let currentSectionId = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
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

  // 5. CONTACT FORM FORMULATION WITH TRIGGER INTERACTION MODAL
  const contactForm = document.getElementById("contactForm");
  const successPopup = document.getElementById("successPopup");

  if (contactForm && successPopup) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      // Open dialog UI box instantly
      successPopup.classList.add("show");
      contactForm.reset();

      // Automate close structure after view duration metrics pass
      setTimeout(() => {
        successPopup.classList.remove("show");
      }, 3500);
    });

    // Close on background window bounding click context
    successPopup.addEventListener("click", () => {
      successPopup.classList.remove("show");
    });
  }
});