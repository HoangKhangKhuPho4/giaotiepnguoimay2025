// Smooth scrolling function
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Enable smooth scrolling
  });
}

// Show or hide the button based on scroll position
window.onscroll = function () {
  const button = document.querySelector(".back-to-top");
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    button.style.display = "block";
  } else {
    button.style.display = "none";
  }
};
