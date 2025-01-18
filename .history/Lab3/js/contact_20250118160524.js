// Đợi cho đến khi DOM được tải đầy đủ
document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contactForm");
    const successMessage = document.getElementById("successMessage");
    const submitBtn = document.getElementById("submitBtn");

    // Hàm để escape HTML, ngăn chặn XSS
    function escapeHTML(str) {
      return str.replace(/[&<>"'`=\/]/g, function (s) {
        return {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
          "/": "&#x2F;",
          "`": "&#x60;",
          "=": "&#x3D;",
        }[s];
      });
    }

    // Hàm hiển thị thông báo lỗi
    function showError(inputId, message) {
      const errorElement = document.getElementById(inputId + "Error");
      const inputElement = document.getElementById(inputId);
      const formGroup = document.getElementById(inputId + "Group");
      errorElement.textContent = message;
      inputElement.setAttribute("aria-invalid", "true");
      formGroup.classList.add("error");
    }

    // Hàm xóa thông báo lỗi
    function clearError(inputId) {
      const errorElement = document.getElementById(inputId + "Error");
      const inputElement = document.getElementById(inputId);
      const formGroup = document.getElementById(inputId + "Group");
      errorElement.textContent = "";
      inputElement.setAttribute("aria-invalid", "false");
      formGroup.classList.remove("error");
    }

    // Hàm kiểm tra tên đầy đủ
    function validateName() {
      const name = document.getElementById("name").value.trim();
      if (name === "") {
        showError("name", "Full Name is required.");
        return false;
      }
      if (name.length > 100) {
        showError("name", "Full Name must be less than 100 characters.");
        return false;
      }
      // Kiểm tra xem tên chỉ chứa chữ cái và một số ký tự đặc biệt hợp lệ
      const nameRegex = /^[A-Za-zÀ-ỹ\s.'-]{2,100}$/;
      if (!nameRegex.test(name)) {
        showError("name", "Full Name contains invalid characters.");
        return false;
      }
      clearError("name");
      return true;
    }

    // Hàm kiểm tra email
    function validateEmail() {
      const email = document.getElementById("email").value.trim();
      // RFC 5322 Official Standard regex
      const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
      if (email === "") {
        showError("email", "Email is required.");
        return false;
      } else if (!emailRegex.test(email)) {
        showError("email", "Please enter a valid email address.");
        return false;
      }
      if (email.length > 100) {
        showError("email", "Email must be less than 100 characters.");
        return false;
      }
      clearError("email");
      return true;
    }

    // Hàm kiểm tra số điện thoại
    function validatePhone() {
      const phone = document.getElementById("phone").value.trim();
      if (phone === "") {
        clearError("phone");
        return true; // Phone is optional
      }
      // Regex số điện thoại quốc tế cho phép +, dấu cách, dấu gạch ngang và dấu ngoặc đơn
      const phoneRegex = /^\+?[\d\s\-()]{7,15}$/;
      if (!phoneRegex.test(phone)) {
        showError("phone", "Please enter a valid phone number.");
        return false;
      }
      if (phone.length > 15) {
        showError("phone", "Phone number must be less than 15 characters.");
        return false;
      }
      clearError("phone");
      return true;
    }

    // Hàm kiểm tra dịch vụ cần thiết
    function validateServices() {
      const services = document.getElementById("services").value;
      if (services === "") {
        showError("services", "Please select a service.");
        return false;
      }
      clearError("services");
      return true;
    }

    // Hàm kiểm tra tin nhắn
    function validateMessage() {
      const message = document.getElementById("message").value.trim();
      if (message.length > 1000) {
        showError("message", "Message must be less than 1000 characters.");
        return false;
      }
      // Kiểm tra xem tin nhắn có chứa các ký tự không hợp lệ
      // (Có thể mở rộng nếu cần)
      clearError("message");
      return true;
    }

    // Hàm kiểm tra toàn bộ form
    function validateForm() {
      const isNameValid = validateName();
      const isEmailValid = validateEmail();
      const isPhoneValid = validatePhone();
      const isServicesValid = validateServices();
      const isMessageValid = validateMessage();
      return (
        isNameValid &&
        isEmailValid &&
        isPhoneValid &&
        isServicesValid &&
        isMessageValid
      );
    }

    // Hàm xử lý gửi form
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault(); // Ngăn chặn gửi form mặc định

      // Disable nút submit để ngăn chặn gửi nhiều lần
      submitBtn.disabled = true;

      if (validateForm()) {
        // Thu thập dữ liệu form
        const formData = {
          from_name: escapeHTML(
            document.getElementById("name").value.trim()
          ),
          reply_to: escapeHTML(
            document.getElementById("email").value.trim()
          ),
          phone: escapeHTML(document.getElementById("phone").value.trim()),
          services: escapeHTML(document.getElementById("services").value),
          message: escapeHTML(
            document.getElementById("message").value.trim()
          ),
        };

        // Xử lý dữ liệu form tại đây
        // Ví dụ: gửi dữ liệu đến server qua fetch
        // Nếu bạn không có server, bạn có thể hiển thị thông báo thành công

        // Dưới đây là ví dụ về cách hiển thị thông báo thành công
        setTimeout(function () {
          successMessage.textContent =
            "Your message has been sent successfully!";
          successMessage.style.display = "block";
          contactForm.reset();
          // Xóa tất cả thông báo lỗi
          ["name", "email", "phone", "services", "message"].forEach(
            function (id) {
              clearError(id);
            }
          );
          // Ẩn thông báo sau 5 giây
          setTimeout(function () {
            successMessage.style.display = "none";
            successMessage.textContent =
              "Your message has been sent successfully!";
          }, 5000);
          submitBtn.disabled = false;
        }, 1000);

        // Nếu bạn muốn gửi dữ liệu đến server, hãy sử dụng fetch hoặc XMLHttpRequest
        /*
        fetch('YOUR_SERVER_ENDPOINT', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data);
            successMessage.textContent = "Your message has been sent successfully!";
            successMessage.style.display = "block";
            contactForm.reset();
            // Xóa tất cả thông báo lỗi
            ["name", "email", "phone", "services", "message"].forEach(function (id) {
              clearError(id);
            });
          })
          .catch((error) => {
            console.error('Error:', error);
            successMessage.textContent = "There was an error sending your message. Please try again later.";
            successMessage.style.color = "red";
            successMessage.style.display = "block";
          })
          .finally(() => {
            // Ẩn thông báo sau 5 giây
            setTimeout(function () {
              successMessage.style.display = "none";
              successMessage.style.color = "green";
            }, 5000);
            // Re-enable nút submit
            submitBtn.disabled = false;
          });
        */
      } else {
        // Nếu form không hợp lệ, hiển thị thông báo lỗi
        successMessage.style.display = "none";
        submitBtn.disabled = false;
      }
    });

    // Thêm các sự kiện kiểm tra theo thời gian thực
    document.getElementById("name").addEventListener("input", validateName);
    document.getElementById("email").addEventListener("input", validateEmail);
    document.getElementById("phone").addEventListener("input", validatePhone);
    document.getElementById("services").addEventListener("change", validateServices);
    document.getElementById("message").addEventListener("input", validateMessage);
  });