document
  .getElementById("scrollRightBtn")
  .addEventListener("click", function () {
    const recommendations = document.getElementById("recommendations");
    recommendations.scrollBy({
      top: 0,
      left: 350, // Adjust this value based on card width (350px)
      behavior: "smooth",
    });
  });

// JavaScript to handle close button click
const closeButton = document.querySelector(".personalize .close-personalize");
const personalizeContainer = document.querySelector(".personalize");

closeButton.addEventListener("click", function () {
  personalizeContainer.style.display = "none"; // Hide the container
});

// Tab switching functionality
const tabs = document.querySelectorAll(".learning-section .tabs a");
const coursesTab = document.getElementById("courses");
const learningPathsTab = document.getElementById("learning-paths");
const certPrepTab = document.getElementById("cert-prep");

tabs.forEach((tab) => {
  tab.addEventListener("click", function (e) {
    e.preventDefault();
    // Remove active class from all tabs
    tabs.forEach((t) => t.classList.remove("active"));
    // Add active class to the clicked tab
    this.classList.add("active");

    // Hide all tab contents
    coursesTab.style.display = "none";
    learningPathsTab.style.display = "none";
    certPrepTab.style.display = "none";

    // Show the selected tab content
    const selectedTab = this.getAttribute("data-tab");
    if (selectedTab === "courses") {
      coursesTab.style.display = "flex";
    } else if (selectedTab === "learning-paths") {
      learningPathsTab.style.display = "flex";
    } else if (selectedTab === "cert-prep") {
      certPrepTab.style.display = "flex";
    }
  });
});

// JavaScript for Tooltip (optional enhancement)
// If you want the tooltip to disappear when clicking elsewhere
document.addEventListener("click", function (event) {
  const tooltips = document.querySelectorAll(".tooltip");
  tooltips.forEach((tooltip) => {
    if (!tooltip.parentElement.contains(event.target)) {
      tooltip.style.visibility = "hidden";
      tooltip.style.opacity = "0";
    }
  });
});
