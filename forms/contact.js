document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm"); // Lấy form dựa vào id

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Ngăn chặn hành vi gửi form mặc định

      // Lấy dữ liệu từ form
      const formData = new FormData(form);
      const name = formData.get("name");
      const email = formData.get("email");
      const subject = formData.get("subject");
      const message = formData.get("message");

      // Kiểm tra xem form có dữ liệu không (có thể bỏ qua nếu bạn đã dùng `required` trong HTML)
      if (!name || !email || !subject || !message) {
        alert("Please fill in all fields");
        return;
      }

      // Hiển thị thông báo đang xử lý
      document.querySelector(".loading").style.display = "block";
      document.querySelector(".error-message").style.display = "none";
      document.querySelector(".sent-message").style.display = "none";

      // Gửi dữ liệu qua AJAX tới endpoint xử lý (ví dụ tới một API hoặc server khác)
      fetch("https://example.com/submit-form", {
        // Thay đổi URL này cho đúng endpoint bạn muốn gửi đến
        method: "POST",
        body: formData,
      })
        .then((response) => response.json()) // Giả sử server trả về JSON
        .then((data) => {
          // Tắt loading
          document.querySelector(".loading").style.display = "none";

          if (data.success) {
            // Hiển thị thông báo thành công
            document.querySelector(".sent-message").style.display = "block";
            form.reset(); // Reset form sau khi gửi thành công
          } else {
            // Hiển thị thông báo lỗi
            document.querySelector(".error-message").innerHTML =
              data.message || "There was an error sending the message.";
            document.querySelector(".error-message").style.display = "block";
          }
        })
        .catch((error) => {
          // Tắt loading
          document.querySelector(".loading").style.display = "none";

          // Hiển thị thông báo lỗi
          document.querySelector(".error-message").innerHTML =
            "Failed to send message. Please try again.";
          document.querySelector(".error-message").style.display = "block";
        });
    });
  }
});
