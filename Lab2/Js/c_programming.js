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
    "Kết quả sẽ hiển thị ở đây...";
}

// Automatically show the 'Easy' problem when the page loads
window.onload = function () {
  showProblem("easy");
};

// Function to toggle the mobile menu
function toggleMenu() {
  const navLinks = document.querySelector(".nav-links");
  const hamburger = document.querySelector(".hamburger");
  navLinks.classList.toggle("open");
  hamburger.classList.toggle("active");
}

// Function to scroll to exercises
function scrollToContent() {
  const selector = document.getElementById("difficulty-selector");
  window.scrollTo({
    top: selector.offsetTop - 60, // Adjust to avoid being hidden by navbar
    behavior: "smooth",
  });
}

// Function to clear the IDE code
function clearCode() {
  const iframe = document.querySelector(".editor-container iframe");
  iframe.src = iframe.src; // Reload iframe to clear code
  document.getElementById("output-result").textContent =
    "Kết quả sẽ hiển thị ở đây...";
}

// Function to run the code
function runCode() {
  // If the embedded IDE supports API calls, integrate here
  // Currently, prompt user to run within the iframe
  alert("Vui lòng nhấn nút Run trong IDE để chạy mã.");
}

// Function to submit the code (Requires backend integration)
function submitCode() {
  // Placeholder for submitting code to backend
  alert("Tính năng Submit Code cần được tích hợp với backend.");
}

// Function to scroll to top
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Back to Top Button Logic
window.addEventListener("scroll", function () {
  const backToTop = document.querySelector(".back-to-top");
  if (window.pageYOffset > 300) {
    backToTop.style.display = "flex";
  } else {
    backToTop.style.display = "none";
  }
});

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
