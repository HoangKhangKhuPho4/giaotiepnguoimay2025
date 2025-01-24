// Tab Functionality Script
document.querySelectorAll(".tab-link").forEach((link) => {
  link.addEventListener("click", function () {
    // Remove 'active' class from all tabs
    document
      .querySelectorAll(".tab-link")
      .forEach((link) => link.classList.remove("active"));
    // Add 'active' class to the clicked tab
    this.classList.add("active");

    // Hide all content sections
    document
      .querySelectorAll(".content-section")
      .forEach((section) => (section.style.display = "none"));
    // Show the content section corresponding to the clicked tab
    const activeTab = this.getAttribute("data-tab");
    document.getElementById(activeTab).style.display = "block";
  });
});

// Search Suggestions Script
const courseTitles = [
  "Comprehensive Introduction to Python Programming Language",
  "Mastering Advanced JavaScript Concepts and Techniques",
  "Data Structures and Algorithms in Depth for Developers",
  "Fundamentals of Machine Learning Basics and Applications",
  "Introduction to Cybersecurity Principles and Practices",
  "Building Modern Web Applications with React Framework",
  "Cloud Computing Essentials and Best Practices",
  "Understanding Blockchain Technology and Its Applications",
  "Artificial Intelligence Overview: Concepts and Trends",
  "User Experience Design Principles and Best Practices",
  "Introduction to SQL Databases and Querying Techniques",
  "Agile Project Management Techniques and Methodologies",
];

const searchInput = document.getElementById("search-input");
const suggestionsBox = document.getElementById("suggestions");

// Hàm lọc khóa học dựa trên truy vấn tìm kiếm
function filterCourses(query) {
  const courses = document.querySelectorAll('.course');
  courses.forEach(course => {
    const title = course.querySelector('.course-content h3').textContent.toLowerCase();
    if (title.includes(query.toLowerCase())) {
      course.style.display = 'flex';
    } else {
      course.style.display = 'none';
    }
  });
}

searchInput.addEventListener("input", function () {
  const input = this.value.toLowerCase();
  suggestionsBox.innerHTML = "";
  if (input) {
    const filteredCourses = courseTitles.filter((title) =>
      title.toLowerCase().includes(input)
    );
    if (filteredCourses.length > 0) {
      filteredCourses.forEach((title) => {
        const li = document.createElement("li");
        li.textContent = title;
        li.addEventListener("click", function () {
          searchInput.value = title;
          suggestionsBox.style.display = "none";
          filterCourses(title); // Áp dụng lọc khi chọn gợi ý
        });
        suggestionsBox.appendChild(li);
      });
      suggestionsBox.style.display = "block";
    } else {
      suggestionsBox.style.display = "none";
    }
  } else {
    suggestionsBox.style.display = "none";
    // Hiển thị tất cả khóa học khi ô tìm kiếm được xóa
    const courses = document.querySelectorAll('.course');
    courses.forEach(course => {
      course.style.display = 'flex';
    });
  }
});

// Hide suggestions when clicking outside
document.addEventListener("click", function (event) {
  if (!suggestionsBox.contains(event.target) && event.target !== searchInput) {
    suggestionsBox.style.display = "none";
  }
});

// Reset Functionality
const resetLink = document.querySelector(".reset-link");
resetLink.addEventListener("click", function (event) {
  event.preventDefault(); // Ngăn chặn hành vi mặc định của liên kết
  // Reset tất cả các trường lọc về giá trị mặc định
  document.getElementById("sort-by").selectedIndex = 0;
  document.getElementById("categories").selectedIndex = 0;
  document.getElementById("progress").selectedIndex = 0;
  document.getElementById("instructor").selectedIndex = 0;
  // Xóa nội dung ô tìm kiếm và ẩn hộp gợi ý
  searchInput.value = "";
  suggestionsBox.style.display = "none";
  // Hiển thị tất cả khóa học khi reset
  const courses = document.querySelectorAll('.course');
  courses.forEach(course => {
    course.style.display = 'flex';
  });
});