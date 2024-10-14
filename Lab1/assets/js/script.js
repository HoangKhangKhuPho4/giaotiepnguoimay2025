// ===========================
// Tính năng đăng nhập, đăng ký, và quản lý thông tin người dùng
// ===========================

// ---------------------------
// Các Tham Chiếu đến Các Phần tử
// ---------------------------
const loginForm = document.getElementById("loginForm");
const loginUsernameInput = document.getElementById("loginUsername");
const loginPasswordInput = document.getElementById("loginPassword");
const loginButton = document.getElementById("loginButton");
const logoutButton = document.getElementById("logoutButton");

const accountForm = document.getElementById("accountForm");
const saveButton = document.getElementById("saveButton");
const cancelButton = document.getElementById("cancelButton");

const uploadButton = document.getElementById("uploadButton");
const uploadInput = document.getElementById("uploadPicture");
const pictureUrlInput = document.getElementById("pictureUrl");
const profileImage = document.getElementById("profileImage");
const deleteButton = document.getElementById("deleteButton");
const uploadFeedback = document.getElementById("uploadFeedback");

const toggleCurrentPassword = document.getElementById("toggleCurrentPassword");
const currentPasswordInput = document.getElementById("currentPassword");
const toggleNewPassword = document.getElementById("toggleNewPassword");
const newPasswordInput = document.getElementById("newPassword");
const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");
const confirmPasswordInput = document.getElementById("confirmPassword");

const strengthMeter = document.getElementById("newStrengthMeter");
const strengthText = document.getElementById("newStrengthText");

const searchInput = document.getElementById("searchInput");
const menuItems = document
  .getElementById("menuItems")
  .getElementsByTagName("li");

const backToTopButton = document.getElementById("backToTopButton");

const accountCreatedAtField = document.getElementById("accountCreatedAt");
const lastUpdatedAtField = document.getElementById("lastUpdatedAt");

// Thêm biến lưu trữ dữ liệu người dùng ban đầu
let originalUserData;
const defaultImageUrl = "https://via.placeholder.com/120"; // Thay đổi URL nếu cần

// ---------------------------
// Các Hàm Hỗ Trợ
// ---------------------------

// Hàm định dạng ngày tháng
function formatDateTime(timestamp) {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(timestamp).toLocaleDateString(undefined, options);
}

// Hàm kiểm tra độ mạnh của mật khẩu
function calculatePasswordStrength(password) {
  let strength = 0;
  if (password.length > 5) strength += 20;
  if (password.length > 10) strength += 20;
  if (/[A-Z]/.test(password)) strength += 20;
  if (/[0-9]/.test(password)) strength += 20;
  if (/[\W]/.test(password)) strength += 20;
  return strength;
}

// Hàm kiểm tra tính hợp lệ của biểu mẫu
function checkFormValidity() {
  let isValid = accountForm.checkValidity();

  // Kiểm tra tính duy nhất của username (giả lập)
  const usernameInput = document.getElementById("username");
  if (usernameInput.value.trim().toLowerCase() === "existinguser") {
    usernameInput.classList.add("is-invalid");
    isValid = false;
  } else {
    usernameInput.classList.remove("is-invalid");
  }

  // Kiểm tra định dạng email
  const emailInput = document.getElementById("email");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(emailInput.value)) {
    emailInput.classList.add("is-invalid");
    isValid = false;
  } else {
    emailInput.classList.remove("is-invalid");
  }

  // Kiểm tra xác nhận mật khẩu
  if (
    confirmPasswordInput.value &&
    newPasswordInput.value !== confirmPasswordInput.value
  ) {
    confirmPasswordInput.classList.add("is-invalid");
    isValid = false;
  } else {
    confirmPasswordInput.classList.remove("is-invalid");
  }

  // Kiểm tra độ mạnh của mật khẩu
  const strengthValue = strengthMeter.value;
  if (strengthValue < 40 && newPasswordInput.value.length > 0) {
    isValid = false;
  }

  // Kiểm tra xem có thay đổi nào trong biểu mẫu hay không
  const isFormChanged =
    (originalUserData &&
      (document.getElementById("username").value !==
        originalUserData.username ||
        document.getElementById("email").value !== originalUserData.email ||
        document.getElementById("fullName").value !==
          originalUserData.fullName ||
        document.getElementById("role").value !== originalUserData.role ||
        profileImage.src !== originalUserData.profileImage)) ||
    newPasswordInput.value.length > 0 ||
    confirmPasswordInput.value.length > 0;

  // Cập nhật trạng thái của nút "Save Changes"
  saveButton.disabled = !isValid || !isFormChanged;
}

// Hàm cập nhật "Last Updated At"
function updateLastUpdatedAt() {
  const now = new Date().toISOString();
  localStorage.setItem("lastUpdatedAt", now);
  lastUpdatedAtField.value = formatDateTime(now);
}

// Hàm khởi tạo "Account Created At"
function initializeAccountCreatedAt() {
  if (!localStorage.getItem("accountCreatedAt")) {
    const now = new Date().toISOString();
    localStorage.setItem("accountCreatedAt", now);
  }
  accountCreatedAtField.value = formatDateTime(
    localStorage.getItem("accountCreatedAt")
  );
}

// Hàm khởi tạo "Last Updated At"
function initializeLastUpdatedAt() {
  if (!localStorage.getItem("lastUpdatedAt")) {
    localStorage.setItem(
      "lastUpdatedAt",
      localStorage.getItem("accountCreatedAt")
    );
  }
  lastUpdatedAtField.value = formatDateTime(
    localStorage.getItem("lastUpdatedAt")
  );
}

// Hàm hiển thị/ẩn các nút đăng nhập và đăng xuất
function toggleLoginLogoutButtons() {
  const currentUserId = localStorage.getItem("currentUserId");
  if (currentUserId) {
    logoutButton.style.display = "block";
    loginButton.style.display = "none";
  } else {
    logoutButton.style.display = "none";
    loginButton.style.display = "block";
  }
}

// ---------------------------
// Xử Lý Đăng Nhập
// ---------------------------
// loginForm.addEventListener("submit", async function (e) {
//   e.preventDefault();

//   const credentials = {
//     username: loginUsernameInput.value.trim(),
//     password: loginPasswordInput.value.trim(),
//   };

//   try {
//     const response = await fetch("http://localhost:5000/api/users/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(credentials),
//     });

//     const data = await response.json();
//     if (response.ok) {
//       alert(data.message);
//       // Lưu ID người dùng và token vào localStorage
//       localStorage.setItem("currentUserId", data.user._id);
//       localStorage.setItem("authToken", data.token);
//       // Đóng modal đăng nhập
//       const loginModal = bootstrap.Modal.getInstance(
//         document.getElementById("loginModal")
//       );
//       loginModal.hide();
//       // Tải lại thông tin người dùng
//       fetchUserData(data.user._id);
//       toggleLoginLogoutButtons();
//     } else {
//       alert(data.message);
//     }
//   } catch (error) {
//     console.error("Error:", error);
//     alert("Đã xảy ra lỗi khi đăng nhập.");
//   }
// });

// ---------------------------
// Xử Lý Đăng Xuất
// ---------------------------
logoutButton.addEventListener("click", function () {
  localStorage.removeItem("currentUserId");
  localStorage.removeItem("authToken");
  alert("Đã đăng xuất.");
  toggleLoginLogoutButtons();
  // Làm trống các trường trong biểu mẫu
  accountForm.reset();
  profileImage.src = defaultImageUrl; // Đặt hình ảnh về mặc định
  accountCreatedAtField.value = "";
  lastUpdatedAtField.value = "";
  uploadFeedback.innerHTML = "";
  // Xóa dữ liệu người dùng gốc
  originalUserData = null;
  // Vô hiệu hóa nút "Save Changes"
  saveButton.disabled = true;
});

// ---------------------------
// Xử Lý Tải và Cập Nhật Thông Tin Người Dùng
// ---------------------------
async function fetchUserData(userId) {
  const token = localStorage.getItem("authToken");
  try {
    const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const user = await response.json();
      populateForm(user);
    } else {
      alert("Không thể lấy thông tin người dùng.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Đã xảy ra lỗi khi lấy thông tin người dùng.");
  }
}

function populateForm(user) {
  document.getElementById("username").value = user.username;
  document.getElementById("email").value = user.email;
  // Không điền mật khẩu
  document.getElementById("fullName").value = user.fullName || "";
  document.getElementById("role").value = user.role;
  profileImage.src = user.profileImage || defaultImageUrl; // Sử dụng URL mặc định nếu không có hình ảnh
  accountCreatedAtField.value = formatDateTime(user.createdAt);
  lastUpdatedAtField.value = formatDateTime(user.updatedAt);

  // Lưu trữ dữ liệu gốc của người dùng
  originalUserData = {
    username: user.username,
    email: user.email,
    fullName: user.fullName || "",
    role: user.role,
    profileImage: user.profileImage || defaultImageUrl,
  };

  // Đặt lại trạng thái của nút "Save Changes"
  saveButton.disabled = true;
}

accountForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const currentUserId = localStorage.getItem("currentUserId");
  const token = localStorage.getItem("authToken");

  if (!currentUserId) {
    alert("Vui lòng đăng nhập để cập nhật thông tin.");
    return;
  }

  // Thu thập dữ liệu từ biểu mẫu
  const formData = {
    username: document.getElementById("username").value.trim(),
    email: document.getElementById("email").value.trim(),
    // Nếu người dùng muốn cập nhật mật khẩu, hãy thêm vào đây
    // password: document.getElementById("newPassword").value.trim(),
    fullName: document.getElementById("fullName").value.trim(),
    role: document.getElementById("role").value,
    profileImage: profileImage.src,
  };

  try {
    const response = await fetch(
      `http://localhost:5000/api/users/${currentUserId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      }
    );

    const data = await response.json();
    if (response.ok) {
      alert(data.message);
      populateForm(data.user);
      updateLastUpdatedAt();
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Đã xảy ra lỗi khi cập nhật thông tin người dùng.");
  }
});

// ---------------------------
// Xử Lý Nút "Cancel"
// ---------------------------
cancelButton.addEventListener("click", function (e) {
  e.preventDefault();
  // Đặt lại biểu mẫu về dữ liệu ban đầu
  if (originalUserData) {
    populateForm(originalUserData);
  } else {
    accountForm.reset();
    profileImage.src = defaultImageUrl; // Đặt về hình mặc định
  }

  // Xóa các thông báo lỗi (nếu có)
  const invalidFields = accountForm.querySelectorAll(".is-invalid");
  invalidFields.forEach((field) => field.classList.remove("is-invalid"));

  // Đặt lại thanh đo độ mạnh mật khẩu
  strengthMeter.value = 0;
  strengthText.textContent = "";

  // Vô hiệu hóa nút "Save Changes" vì không có thay đổi
  saveButton.disabled = true;

  // Xóa thông báo phản hồi upload ảnh (nếu có)
  uploadFeedback.innerHTML = "";
});

// ---------------------------
// Xử Lý Upload Hình Ảnh Hồ Sơ
// ---------------------------
// Click event for the upload button
uploadButton.addEventListener("click", function (e) {
  e.preventDefault();
  uploadInput.click();
});

// Event listener for file input change
uploadInput.addEventListener("change", function () {
  const file = uploadInput.files[0];
  if (file) {
    if (file.size > 15 * 1024 * 1024) {
      uploadFeedback.innerHTML =
        '<div class="alert alert-danger" role="alert">File size exceeds 15MB.</div>';
      return;
    }
    const reader = new FileReader();

    reader.onloadend = function () {
      profileImage.src = reader.result;
      uploadFeedback.innerHTML =
        '<div class="alert alert-success" role="alert">Profile picture updated successfully.</div>';
      pictureUrlInput.value = "";
      updateLastUpdatedAt();
      checkFormValidity();
    };

    reader.readAsDataURL(file);
  }
});

// Event listener for URL input change
pictureUrlInput.addEventListener("change", function () {
  const url = pictureUrlInput.value.trim();
  if (url) {
    // Simple URL validation
    const urlPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/i;
    if (urlPattern.test(url)) {
      profileImage.src = url;
      uploadFeedback.innerHTML =
        '<div class="alert alert-success" role="alert">Profile picture updated successfully.</div>';
      uploadInput.value = "";
      updateLastUpdatedAt();
      checkFormValidity();
    } else {
      uploadFeedback.innerHTML =
        '<div class="alert alert-danger" role="alert">Invalid image URL.</div>';
    }
  }
});

// Xử lý nút Delete
deleteButton.addEventListener("click", function (e) {
  e.preventDefault();
  profileImage.src = defaultImageUrl; // Đặt hình ảnh về mặc định
  uploadInput.value = ""; // Xóa file upload
  pictureUrlInput.value = ""; // Xóa URL hình ảnh
  uploadFeedback.innerHTML =
    '<div class="alert alert-info" role="alert">Profile picture has been reset.</div>';
  updateLastUpdatedAt();
  checkFormValidity();
});

// ---------------------------
// Xử Lý Toggle Password Visibility
// ---------------------------
toggleCurrentPassword.addEventListener("click", function () {
  const type =
    currentPasswordInput.getAttribute("type") === "password"
      ? "text"
      : "password";
  currentPasswordInput.setAttribute("type", type);
  this.textContent = this.textContent === "Show" ? "Hide" : "Show";
});

toggleNewPassword.addEventListener("click", function () {
  const type =
    newPasswordInput.getAttribute("type") === "password" ? "text" : "password";
  newPasswordInput.setAttribute("type", type);
  this.textContent = this.textContent === "Show" ? "Hide" : "Show";
});

toggleConfirmPassword.addEventListener("click", function () {
  const type =
    confirmPasswordInput.getAttribute("type") === "password"
      ? "text"
      : "password";
  confirmPasswordInput.setAttribute("type", type);
  this.textContent = this.textContent === "Show" ? "Hide" : "Show";
});

// ---------------------------
// Xử Lý Password Strength Meter
// ---------------------------
newPasswordInput.addEventListener("input", function () {
  const strength = calculatePasswordStrength(this.value);
  strengthMeter.value = strength;

  if (strength < 40) {
    strengthText.textContent = "Weak";
    strengthText.style.color = "red";
  } else if (strength < 70) {
    strengthText.textContent = "Medium";
    strengthText.style.color = "orange";
  } else {
    strengthText.textContent = "Strong";
    strengthText.style.color = "green";
  }
  checkFormValidity();
});

// ---------------------------
// Xử Lý Form Validation
// ---------------------------
accountForm.addEventListener("input", checkFormValidity);

accountForm.addEventListener("input", function () {
  // Validate password confirmation
  const newPassword = newPasswordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  if (confirmPassword && newPassword !== confirmPassword) {
    confirmPasswordInput.classList.add("is-invalid");
  } else {
    confirmPasswordInput.classList.remove("is-invalid");
  }
});

// ---------------------------
// Xử Lý Search Sidebar
// ---------------------------
searchInput.addEventListener("input", function () {
  const filter = searchInput.value.toLowerCase();
  for (let i = 0; i < menuItems.length; i++) {
    const textValue = menuItems[i].textContent || menuItems[i].innerText;
    if (textValue.toLowerCase().indexOf(filter) > -1) {
      menuItems[i].style.display = "";
    } else {
      menuItems[i].style.display = "none";
    }
  }
});

// ---------------------------
// Xử Lý Back to Top Button
// ---------------------------
backToTopButton.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ---------------------------
// Xử Lý Khởi Tạo Thời Gian
// ---------------------------
function initializeTimestamps() {
  initializeAccountCreatedAt();
  initializeLastUpdatedAt();
}

window.addEventListener("DOMContentLoaded", () => {
  initializeTimestamps();
  toggleLoginLogoutButtons();

  const currentUserId = localStorage.getItem("currentUserId");
  if (currentUserId) {
    fetchUserData(currentUserId);
  }
});

// ---------------------------
// Xử Lý Kéo và Thả Hình Ảnh
// ---------------------------
const dropArea = document.getElementById("dropArea");

// Ngăn chặn hành động mặc định khi kéo và thả
["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
  dropArea.addEventListener(eventName, preventDefaults, false);
  document.body.addEventListener(eventName, preventDefaults, false);
});

// Thêm các lớp cho khu vực kéo và thả khi người dùng kéo vào
["dragenter", "dragover"].forEach((eventName) => {
  dropArea.addEventListener(eventName, highlight, false);
});

// Xóa lớp khi không kéo vào khu vực
["dragleave", "drop"].forEach((eventName) => {
  dropArea.addEventListener(eventName, unhighlight, false);
});

// Xử lý hình ảnh khi thả
dropArea.addEventListener("drop", handleDrop, false);

// Ngăn chặn hành động mặc định
function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

// Thêm lớp highlight
function highlight() {
  dropArea.classList.add("highlight");
}

// Xóa lớp highlight
function unhighlight() {
  dropArea.classList.remove("highlight");
}

// Xử lý hình ảnh thả
function handleDrop(e) {
  const dt = e.dataTransfer;
  const files = dt.files;
  handleFiles(files);
}

// Hàm xử lý hình ảnh
function handleFiles(files) {
  const file = files[0];
  const reader = new FileReader();

  reader.onload = function () {
    profileImage.src = reader.result; // Cập nhật hình ảnh hồ sơ
    uploadFeedback.innerHTML =
      '<div class="alert alert-success" role="alert">Profile picture updated successfully.</div>';
    pictureUrlInput.value = ""; // Xóa URL
    updateLastUpdatedAt();
    checkFormValidity();
  };

  if (file) {
    reader.readAsDataURL(file);
  }
}

// Xử lý nút Delete
deleteButton.addEventListener("click", function (e) {
  e.preventDefault();
  profileImage.src = defaultImageUrl; // Đặt hình ảnh về mặc định
  uploadInput.value = ""; // Xóa file upload
  pictureUrlInput.value = ""; // Xóa URL hình ảnh
  uploadFeedback.innerHTML =
    '<div class="alert alert-info" role="alert">Profile picture has been reset.</div>';
  updateLastUpdatedAt();
  checkFormValidity();
});
