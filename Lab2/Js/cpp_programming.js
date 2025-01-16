// Function to change exercise content based on difficulty level
function loadExercise(difficulty) {
  // Hide all problem sets
  document.querySelectorAll(".ProblemSet").forEach(function (el) {
    el.classList.remove("active");
  });

  // Show the selected problem set
  const selectedSection = document.getElementById(difficulty);
  if (selectedSection) {
    selectedSection.classList.add("active");
    // Scroll to the selected problem
    selectedSection.scrollIntoView({ behavior: "smooth" });
  }

  // Reset the embedded IDE to default or specific code
  const jdoodleIframe = document.querySelector(".editor-container iframe");
  jdoodleIframe.src = jdoodleIframe.src; // Reload iframe to reset code
  document.getElementById("output-result").textContent =
    "Kết quả sẽ hiển thị ở đây...";
}

// Automatically show the 'Easy' problem when the page loads
window.onload = function () {
  loadExercise("easy");
};

// Toggle Navbar for Mobile View
function toggleMenu() {
  const navLinks = document.querySelector(".nav-links");
  navLinks.classList.toggle("open");
  const hamburger = document.querySelector(".menu-toggle");
  hamburger.classList.toggle("active");
}

// Scroll to Content
function scrollToContent() {
  const selector = document.querySelector(".difficulty-selector");
  window.scrollTo({
    top: selector.offsetTop - 70, // Adjust to avoid overlapping with navbar
    behavior: "smooth",
  });
}

// Clear Code Function
function clearCode() {
  const jdoodleIframe = document.querySelector(".editor-container iframe");
  jdoodleIframe.src = jdoodleIframe.src; // Reload iframe to clear code
  document.getElementById("output-result").textContent =
    "Kết quả sẽ hiển thị ở đây...";
}

// Run Code Function
function runCode() {
  // JDoodle Embedded IDE handles run internally. Inform the user to run code within the iframe.
  alert("Vui lòng nhấn nút Run trong IDE để chạy mã.");
}

// Submit Code Function (Requires Backend Integration)
function submitCode() {
  // Placeholder for code submission logic
  alert("Tính năng Submit Code cần được tích hợp với backend.");
}

// Back to Top Button Logic
window.addEventListener("scroll", function () {
  const backToTop = document.querySelector(".back-to-top");

  if (window.pageYOffset > 300) {
    backToTop.style.display = "flex";
  } else {
    backToTop.style.display = "none";
  }

  // Add or remove 'scrolled' class for Navbar
  const navbar = document.querySelector("nav");
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
    const hamburger = document.querySelector(".menu-toggle");
    if (navLinks.classList.contains("open")) {
      navLinks.classList.remove("open");
      hamburger.classList.remove("active");
    }
  });
});
