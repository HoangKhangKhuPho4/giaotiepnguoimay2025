// Initialize AOS
AOS.init({
  duration: 1000,
  once: true,
});

// Display Back to Top Button and Change Navbar on Scroll
window.addEventListener("scroll", function () {
  const backToTop = document.querySelector(".back-to-top");
  const navbar = document.getElementById("navbar");

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

// Light/Dark Mode Toggle
const toggleSwitch = document.getElementById("theme-toggle");
const currentTheme = localStorage.getItem("theme");

if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);
  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
  }
}

if (toggleSwitch) {
  // Check if toggleSwitch exists
  toggleSwitch.addEventListener("change", function (e) {
    if (e.target.checked) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  });
}

// Navbar Hamburger Toggle
function toggleHamburger() {
  const navLinks = document.querySelector(".nav-links");
  if (navLinks) {
    // Check if navLinks exists
    navLinks.classList.toggle("active");
  }
}

// Dropdown Menu Toggle for Mobile (If any dropdown exists)
const dropdowns = document.querySelectorAll(".nav-links .dropdown");
dropdowns.forEach((dropdown) => {
  dropdown.addEventListener("click", (e) => {
    e.preventDefault();
    dropdown.classList.toggle("active");
  });
});

// Optional: Implement Search Functionality
const searchInput = document.querySelector(".search-container input");
const suggestionsBox = document.querySelector(".autocomplete-suggestions");

// Sample data for autocomplete
const suggestions = [
  {
    category: "Algorithms",
    text: "Binary Tree Vertical Order Traversal",
  },
  { category: "Data Structures", text: "Array" },
  { category: "System Design", text: "Design a URL Shortener" },
  // Add more suggestions as needed
];

searchInput.addEventListener("input", function () {
  const query = this.value.toLowerCase();
  if (query.length === 0) {
    suggestionsBox.classList.remove("active");
    suggestionsBox.innerHTML = "";
    return;
  }
  const filtered = suggestions.filter((s) =>
    s.text.toLowerCase().includes(query)
  );
  if (filtered.length > 0) {
    suggestionsBox.innerHTML = filtered
      .map(
        (s) => `
        <div class="autocomplete-suggestion">
          <a href="#">${s.text}</a>
          <i class="fas fa-arrow-right"></i>
        </div>
      `
      )
      .join("");
    suggestionsBox.classList.add("active");
  } else {
    suggestionsBox.classList.remove("active");
    suggestionsBox.innerHTML = "";
  }
});

// Hide suggestions when clicking outside
document.addEventListener("click", function (e) {
  if (!e.target.closest(".search-container")) {
    suggestionsBox.classList.remove("active");
  }
});
