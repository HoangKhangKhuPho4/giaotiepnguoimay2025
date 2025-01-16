// Function to show the problem based on difficulty level
function showProblem(difficulty) {
  // Hide all problem sets
  document.querySelectorAll(".ProblemSet").forEach(function (el) {
    el.classList.remove("active");
  });

  // Show the selected problem set
  const selected = document.getElementById(difficulty);
  if (selected) {
    selected.classList.add("active");
    // Scroll to the selected problem
    selected.scrollIntoView({ behavior: "smooth" });
  }

  // Reset IDE iframe for new problem
  const ideIframe = document.querySelector(".editor-container iframe");
  ideIframe.src = ideIframe.src;
  document.getElementById("output-result").textContent =
    "Results will be displayed here...";
}

// Automatically show the 'Easy' problem when the page loads
window.onload = function () {
  showProblem("easy");
};

// Function to clear the IDE code
function clearCode() {
  const ideIframe = document.querySelector(".editor-container iframe");
  ideIframe.src = ideIframe.src; // Reload iframe to clear code
  document.getElementById("output-result").textContent =
    "Results will be displayed here...";
}

// Function to run the code
function runCode() {
  // If the embedded IDE supports API calls, integrate here
  // Currently, prompt user to run within the iframe
  alert("Please click the Run button within the IDE to execute your code.");
}

// Function to submit the code (Requires backend integration)
function submitCode() {
  // Placeholder for submitting code to backend
  alert("Submit Code feature needs to be integrated with the backend.");
}

// Function to scroll to exercises
function scrollToExercises() {
  const exercisesSection = document.querySelector(".difficulty-selector");
  exercisesSection.scrollIntoView({ behavior: "smooth" });
}

// Hamburger Menu Toggle
function toggleMenu() {
  const navLinks = document.querySelector(".nav-links");
  const hamburger = document.querySelector(".hamburger");
  navLinks.classList.toggle("open");
  hamburger.classList.toggle("active");
}

// Back to Top Button Logic
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

// Scroll to Top Function
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Accessibility: Close mobile menu when a link is clicked
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
