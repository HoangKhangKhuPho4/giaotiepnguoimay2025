/* Navbar Toggle Function */
function toggleMenu() {
  const navLinks = document.querySelector(".nav-links");
  const hamburger = document.querySelector(".hamburger");
  navLinks.classList.toggle("open");
  hamburger.classList.toggle("active");
}

// Close mobile menu when a link is clicked
document.querySelectorAll(".nav-links a").forEach(function (link) {
  link.addEventListener("click", function () {
    const navLinks = document.querySelector(".nav-links");
    const hamburger = document.querySelector(".hamburger");
    if (navLinks.classList.contains("open")) {
      navLinks.classList.remove("open");
      hamburger.classList.remove("active");
    }
  });
});

/* Scroll to Leaderboard */
function scrollToLeaderboard() {
  const leaderboardSection = document.getElementById("leaderboard");
  if (leaderboardSection) {
    leaderboardSection.scrollIntoView({ behavior: "smooth" });
  }
}

/* Scroll to Feedback */
function scrollToFeedback() {
  const feedbackSection = document.getElementById("feedback");
  if (feedbackSection) {
    feedbackSection.scrollIntoView({ behavior: "smooth" });
  }
}

/* Feedback Submission Function */
function submitFeedback() {
  const textarea = document.querySelector(".feedback-form textarea");
  const feedback = textarea.value;
  const selectedTopic = document.querySelector(".feedback-form select").value;

  if (feedback.trim() === "" || selectedTopic === "") {
    alert("Please select a topic and enter your feedback before submitting.");
    return;
  }

  // Placeholder for actual feedback submission logic
  alert(
    "Your feedback on " + selectedTopic + " has been submitted: " + feedback
  );
  textarea.value = ""; // Clear textarea after submitting
  document.querySelector(".feedback-form select").selectedIndex = 0; // Reset select
}

/* Scroll to Top Function */
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

/* Back to Top Button Logic */
window.addEventListener("scroll", function () {
  const backToTop = document.querySelector(".back-to-top");
  const navbar = document.querySelector("nav");

  if (window.pageYOffset > 300) {
    backToTop.style.display = "flex";
  } else {
    backToTop.style.display = "none";
  }

  if (window.pageYOffset > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});
