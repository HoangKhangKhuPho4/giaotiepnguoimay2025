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
    alert("Vui lòng chọn bài tập và nhập phản hồi trước khi gửi.");
    return;
  }

  // Xử lý việc gửi phản hồi (ví dụ: gọi API hoặc lưu trữ)
  alert(
    "Phản hồi của bạn đã được lưu cho " + selectedExercise + ": " + feedback
  );
  textarea.value = ""; // Xóa nội dung textarea sau khi gửi
  document.getElementById("exerciseSelect").selectedIndex = 0; // Đặt lại lựa chọn
}
