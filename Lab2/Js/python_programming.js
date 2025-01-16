function showProblem(difficulty) {
  // Hide all problem sets
  document.querySelectorAll(".ProblemSet").forEach(function (el) {
    el.classList.remove("active");
  });

  // Show the selected problem set
  document.getElementById(difficulty).classList.add("active");
}

// Automatically show the 'Easy' problem when the page loads
window.onload = function () {
  showProblem("easy");
};

function toggleMenu() {
  const navLinks = document.querySelector(".nav-links");
  const hamburger = document.querySelector(".hamburger");
  navLinks.classList.toggle("open");
  hamburger.classList.toggle("active");
}

function scrollToContent() {
  window.scrollTo({
    top: document.querySelector(".difficulty-selector").offsetTop - 70,
    behavior: "smooth",
  });
}

// Hàm Clear Code
function clearCode() {
  const iframe = document.querySelector(".editor-container iframe");
  // Reload iframe để clear code
  iframe.src = iframe.src;
  document.getElementById("output-result").textContent =
    "Kết quả sẽ hiển thị ở đây...";
}

// Hàm Run Code
function runCode() {
  // Với Trinket, Run Code được tích hợp trong iframe, bạn không thể kích hoạt từ parent
  // Do đó, nút Run Code sẽ hiển thị thông báo hướng dẫn người dùng chạy mã trực tiếp trong iframe
  alert("Vui lòng nhấn nút Run trong IDE để chạy mã.");
}

// Hàm Submit Code (Cần Backend để xử lý)
function submitCode() {
  // Đây là nơi bạn có thể thêm logic để nộp mã, ví dụ:
  // Lấy mã từ Trinket (có thể thông qua API nếu Trinket hỗ trợ)
  // Gửi mã đến backend để đánh giá và nhận điểm
  alert("Tính năng Submit Code cần được tích hợp với backend.");
}

// Nút Back to Top Button Logic
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
