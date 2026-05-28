// Initial Initializer Screen Closer
window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");
  setTimeout(() => {
    if (loader) loader.classList.add("hide");
  }, 400);
});

// Structural Scroll Dynamic Element Transition Processor
const revealElements = document.querySelectorAll(".reveal");
const revealOnScroll = () => {
  revealElements.forEach((el) => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const elementVisible = 100;

    if (elementTop < windowHeight - elementVisible) {
      el.classList.add("active");
    }
  });
};
window.addEventListener("scroll", revealOnScroll);
window.addEventListener("DOMContentLoaded", revealOnScroll);

// Active Navigation Connection Intersection Tracker
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let currentId = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;

    if (window.scrollY >= sectionTop) {
      currentId = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${currentId}`) {
      link.classList.add("active");
    }
  });
});

// Core Horizontal Slideway Motion Execution Mechanics
const container = document.getElementById("sliderContainer");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

if (container && prevBtn && nextBtn) {

  const getScrollAmount = () => {
    const firstCard = container.querySelector(".slide-card");

    if (firstCard) {
      return firstCard.offsetWidth + 28;
    }

    return 350;
  };

  nextBtn.addEventListener("click", () => {
    container.scrollBy({
      left: getScrollAmount(),
      behavior: "smooth"
    });
  });

  prevBtn.addEventListener("click", () => {
    container.scrollBy({
      left: -getScrollAmount(),
      behavior: "smooth"
    });
  });

  const toggleButtonsVisibility = () => {
    const scrollLeft = container.scrollLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;

    prevBtn.style.opacity = scrollLeft <= 5 ? "0.2" : "1";
    prevBtn.style.pointerEvents = scrollLeft <= 5 ? "none" : "auto";

    nextBtn.style.opacity = scrollLeft >= maxScroll - 5 ? "0.2" : "1";
    nextBtn.style.pointerEvents = scrollLeft >= maxScroll - 5 ? "none" : "auto";
  };

  container.addEventListener("scroll", toggleButtonsVisibility);
  window.addEventListener("resize", toggleButtonsVisibility);

  setTimeout(toggleButtonsVisibility, 600);
}

// Light / Dark Theme Custom Transition Router
const themeToggle = document.getElementById("themeToggle");
const currentTheme = localStorage.getItem("theme");

if (currentTheme === "light" && themeToggle) {
  document.body.classList.add("light-mode");
  themeToggle.textContent = "☀️";
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    const isLight = document.body.classList.contains("light-mode");

    themeToggle.textContent = isLight ? "☀️" : "🌙";

    localStorage.setItem("theme", isLight ? "light" : "dark");
  });
}

// Background Form Submission via FormSubmit API
const contactForm = document.querySelector(".contact-form");
const successPopup = document.querySelector(".success-popup");
const submitBtn = document.querySelector(".submit-btn");

if (contactForm && successPopup) {

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (submitBtn) {
      submitBtn.innerText = "Sending Securely...";
      submitBtn.disabled = true;
    }

    const formData = new FormData(contactForm);

    fetch(contactForm.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json"
      }
    })

    .then((response) => {

      if (response.ok) {

        successPopup.classList.add("show");
        contactForm.reset();

        setTimeout(() => {
          successPopup.classList.remove("show");
        }, 4000);

      } else {
        showPremiumPopup(
          "Delivery Failed",
          "Unable to route the private message securely."
        );
      }
    })

    .catch(() => {
      showPremiumPopup(
        "Network Error",
        "Please check your internet connection and try again."
      );
    })

    .finally(() => {
      if (submitBtn) {
        submitBtn.innerText = "Send Private Message";
        submitBtn.disabled = false;
      }
    });
  });

  successPopup.addEventListener("click", () => {
    successPopup.classList.remove("show");
  });
}

// ==========================================================================
// 🌟 PREMIUM POPUP SYSTEM
// ==========================================================================

function showPremiumPopup(title, message, onConfirm = null) {

  const existingPopup = document.querySelector(".premium-popup-overlay");

  if (existingPopup) {
    existingPopup.remove();
  }

  const overlay = document.createElement("div");
  overlay.className = "premium-popup-overlay";

  overlay.innerHTML = `
    <div class="premium-popup-box">

      <div class="premium-popup-glow"></div>

      <div class="premium-popup-icon">
        <i class="fas fa-shield-alt"></i>
      </div>

      <h3>${title}</h3>

      <p>${message}</p>

      <div class="premium-popup-actions">

        <button class="premium-cancel-btn">
          Cancel
        </button>

        <button class="premium-confirm-btn">
          Confirm
        </button>

      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  setTimeout(() => {
    overlay.classList.add("show");
  }, 10);

  const closePopup = () => {
    overlay.classList.remove("show");

    setTimeout(() => {
      overlay.remove();
    }, 300);
  };

  overlay.querySelector(".premium-cancel-btn")
    .addEventListener("click", closePopup);

  overlay.querySelector(".premium-confirm-btn")
    .addEventListener("click", () => {

      if (onConfirm) {
        onConfirm();
      }

      closePopup();
    });

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      closePopup();
    }
  });
}

// ==========================================================================
// 🌟 USER-OWNED EDIT & INSTANT REVIEWS ENHANCED CLEAN CONTROLLER
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {

  // One-time storage cleanup
  if (!localStorage.getItem("storage-wiped-v2")) {
    localStorage.removeItem("public-reviews-db");
    localStorage.setItem("storage-wiped-v2", "true");
  }

  const reviewForm = document.getElementById("publicReviewForm");
  const streamContainer = document.getElementById("reviewsStreamContainer");
  const starNodes = document.querySelectorAll(".star-node");
  const formTitleHeader = document.getElementById("formTitleHeader");
  const submitReviewBtn = document.getElementById("submitReviewBtn");
  const cancelEditBtn = document.getElementById("cancelEditBtn");
  const editReviewIdInput = document.getElementById("editReviewId");

  let selectedRating = 5;

  // Unique viewer token
  let clientUserToken = localStorage.getItem("viewer-client-token");

  if (!clientUserToken) {
    clientUserToken =
      "usr_" +
      Math.random().toString(36).substr(2, 9) +
      Date.now().toString(36);

    localStorage.setItem("viewer-client-token", clientUserToken);
  }

  const getReviewsFromStorage = () => {

    const stored = localStorage.getItem("public-reviews-db");

    if (!stored) return [];

    let parsedReviews = JSON.parse(stored);

    return parsedReviews.filter(
      (rev) =>
        rev.name !== "Jürgen John" &&
        rev.name !== "Michael R."
    );
  };

  const updateStarDisplay = (ratingValue) => {

    starNodes.forEach((star) => {

      const val = parseInt(star.getAttribute("data-value"));

      star.style.color =
        val <= ratingValue ? "#d4af37" : "#4b5563";
    });
  };

  updateStarDisplay(selectedRating);

  starNodes.forEach((star) => {

    star.addEventListener("click", () => {

      selectedRating = parseInt(
        star.getAttribute("data-value")
      );

      updateStarDisplay(selectedRating);
    });
  });

  // Render Reviews
  const renderReviewsBoardList = () => {

    const reviews = getReviewsFromStorage();

    streamContainer.innerHTML = "";

    if (reviews.length === 0) {

      streamContainer.innerHTML = `
        <div style="text-align:center; color:var(--text-muted); padding:40px; border:1px dashed rgba(255,255,255,0.05); border-radius:12px;">
          <i class="fas fa-comments" style="font-size:32px; margin-bottom:10px; color:rgba(255,255,255,0.1);"></i>
          <p style="font-size:14px; margin:0;">
            No reviews published yet. Be the first to express thoughts!
          </p>
        </div>
      `;

      return;
    }

    reviews.forEach((rev) => {

      let dynamicStarsMarkup = "";

      for (let i = 1; i <= 5; i++) {

        dynamicStarsMarkup += `
          <i class="fas fa-star"
             style="color:${i <= rev.rating ? '#d4af37' : '#1f2937'};
             font-size:11px;
             margin-right:2px;">
          </i>
        `;
      }

      const isOwnerOfPost =
        rev.ownerToken === clientUserToken;

      const cardMarkup = `
        <div class="live-review-card"
          style="background:rgba(255,255,255,0.01);
          border:1px solid rgba(255,255,255,0.04);
          padding:20px;
          border-radius:12px;
          position:relative;">

          <div style="display:flex;
            justify-content:space-between;
            align-items:flex-start;
            margin-bottom:6px;">

            <div>
              <strong style="color:var(--text-main);
                font-size:15px;
                display:block;">
                ${rev.name}
              </strong>

              <div style="margin-top:4px;">
                ${dynamicStarsMarkup}
              </div>
            </div>

            <span style="color:var(--text-muted);
              font-size:11px;
              font-style:italic;">
              ${rev.date}
            </span>

          </div>

          <p style="font-size:13.5px;
            line-height:1.5;
            color:var(--text-muted);
            margin:12px 0 0 0;
            word-break:break-word;">
            "${rev.text}"
          </p>

          <div class="card-actions"
            style="display:flex;
            gap:14px;
            margin-top:14px;
            justify-content:flex-end;
            border-top:1px solid rgba(255,255,255,0.03);
            padding-top:10px;">

            ${isOwnerOfPost ? `

              <button class="review-edit-btn"
                data-id="${rev.id}"
                style="background:none;
                border:none;
                color:var(--gold);
                font-size:12px;
                cursor:pointer;
                display:flex;
                align-items:center;
                gap:4px;
                opacity:0.8;
                transition:0.2s;">

                <i class="fas fa-edit"></i>
                Edit

              </button>

              <button class="review-delete-btn"
                data-id="${rev.id}"
                style="background:none;
                border:none;
                color:#f43f5e;
                font-size:12px;
                cursor:pointer;
                display:flex;
                align-items:center;
                gap:4px;
                opacity:0.8;
                transition:0.2s;">

                <i class="fas fa-trash-alt"></i>
                Delete

              </button>

            ` : ""}
          </div>
        </div>
      `;

      streamContainer.innerHTML += cardMarkup;
    });
  };

  // ======================================================================
  // EVENT ACTIONS
  // ======================================================================

  streamContainer.addEventListener("click", (e) => {

    // DELETE
    const deleteBtn = e.target.closest(".review-delete-btn");

    if (deleteBtn) {

      const targetId = deleteBtn.getAttribute("data-id");

      let reviews = getReviewsFromStorage();

      const match = reviews.find((r) => r.id === targetId);

      if (match && match.ownerToken === clientUserToken) {

        showPremiumPopup(
          "Delete Review",
          "Are you sure you want to permanently remove this review?",
          () => {

            reviews = reviews.filter(
              (r) => r.id !== targetId
            );

            localStorage.setItem(
              "public-reviews-db",
              JSON.stringify(reviews)
            );

            if (editReviewIdInput.value === targetId) {
              resetReviewFormState();
            }

            renderReviewsBoardList();
          }
        );
      }

      return;
    }

    // EDIT
    const editBtn = e.target.closest(".review-edit-btn");

    if (editBtn) {

      const targetId = editBtn.getAttribute("data-id");

      const reviews = getReviewsFromStorage();

      const match = reviews.find(
        (r) => r.id === targetId
      );

      if (!match || match.ownerToken !== clientUserToken) {
        return;
      }

      editReviewIdInput.value = match.id;

      document.getElementById("revName").value =
        match.name;

      document.getElementById("revMessage").value =
        match.text;

      selectedRating = match.rating;

      updateStarDisplay(selectedRating);

      formTitleHeader.innerText = "Modify Your Review";

      submitReviewBtn.innerText = "Save Changes";

      cancelEditBtn.style.display = "block";

      document.getElementById("reviews")
        .scrollIntoView({
          behavior: "smooth"
        });
    }
  });

  const resetReviewFormState = () => {

    reviewForm.reset();

    editReviewIdInput.value = "";

    selectedRating = 5;

    updateStarDisplay(selectedRating);

    formTitleHeader.innerText = "Write a Review";

    submitReviewBtn.innerText = "Publish Review";

    cancelEditBtn.style.display = "none";
  };

  if (cancelEditBtn) {
    cancelEditBtn.addEventListener(
      "click",
      resetReviewFormState
    );
  }

  // Submit Review
  if (reviewForm) {

    reviewForm.addEventListener("submit", (e) => {

      e.preventDefault();

      const nameInput =
        document.getElementById("revName")
        .value.trim();

      const messageInput =
        document.getElementById("revMessage")
        .value.trim();

      const activeEditId =
        editReviewIdInput.value;

      if (!nameInput || !messageInput) return;

      let reviews = getReviewsFromStorage();

      const dateToday = new Date();

      const formattedDate =
        dateToday.toLocaleDateString(
          "en-US",
          {
            year: "numeric",
            month: "long",
            day: "numeric"
          }
        );

      if (activeEditId) {

        const matchIndex = reviews.findIndex(
          (r) => r.id === activeEditId
        );

        if (
          matchIndex > -1 &&
          reviews[matchIndex].ownerToken === clientUserToken
        ) {

          reviews[matchIndex].name = nameInput;
          reviews[matchIndex].text = messageInput;
          reviews[matchIndex].rating = selectedRating;
          reviews[matchIndex].date =
            formattedDate + " (Edited)";
        }

      } else {

        const newReviewNode = {
          id:
            "rev_" +
            Date.now() +
            "_" +
            Math.random().toString(36).substr(2, 5),

          ownerToken: clientUserToken,
          name: nameInput,
          rating: selectedRating,
          text: messageInput,
          date: formattedDate
        };

        reviews.unshift(newReviewNode);
      }

      localStorage.setItem(
        "public-reviews-db",
        JSON.stringify(reviews)
      );

      resetReviewFormState();

      renderReviewsBoardList();

      streamContainer.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  renderReviewsBoardList();

  // ======================================================================
  // 🌟 NEW DYNAMIC PREMIUM ENGAGEMENTS
  // ======================================================================
  
  // Speaking Invitation Dynamic Prefill and Scroll Handler
  const inviteBtn = document.getElementById("inviteCTABtn");
  const contactMessage = document.getElementById("contactMessageArea");
  
  if (inviteBtn && contactMessage) {
    inviteBtn.addEventListener("click", () => {
      contactMessage.value = `Dear Francis,\n\nI would love to invite you to speak at our upcoming engagement.\n\nType of Invitation: [Speaking Panel / Retreat / Chaplaincy Talk / School & College / Wellness]\nProposed Date & Time: \nExpected Audience: \nLocation/Venue: \n\nLooking forward to connecting!`;
      
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => {
          contactMessage.focus();
        }, 800);
      }
    });
  }
});