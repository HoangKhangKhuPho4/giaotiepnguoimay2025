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
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }

  if (window.pageYOffset > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Function to scroll to leaderboard
function scrollToLeaderboard() {
  const leaderboardSection = document.querySelector(".leaderboard-section");
  if (leaderboardSection) {
    leaderboardSection.scrollIntoView({ behavior: "smooth" });
  }
}

/* Feedback Submission Function */
function submitFeedback() {
  const textarea = document.getElementById("feedbackText");
  const feedback = textarea.value;
  const selectedExercise = document.getElementById("exerciseSelect").value;

  if (feedback.trim() === "" || selectedExercise === "") {
    alert(
      "Please select an exercise and enter your feedback before submitting."
    );
    return;
  }

  // Handle feedback submission (e.g., API call or storage)
  alert(
    "Your feedback has been saved for " + selectedExercise + ": " + feedback
  );
  textarea.value = ""; // Clear textarea after submission
  document.getElementById("exerciseSelect").selectedIndex = 0; // Reset selection
}
