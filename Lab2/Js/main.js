document.addEventListener("DOMContentLoaded", function () {
  try {
    const form = document.querySelector(".form");
    const nameInput = form.querySelector("input[type='text']");
    const emailInput = form.querySelector("input[type='email']");
    const messageInput = form.querySelector("textarea");
    const button = form.querySelector("button");

    button.addEventListener("click", function (event) {
      try {
        event.preventDefault(); // Prevent form submission

        // Get input values
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        // Basic validation
        if (!name) {
          alert("Please enter your name.");
          return;
        }
        if (!email) {
          alert("Please enter your email.");
          return;
        }
        if (!validateEmail(email)) {
          alert("Please enter a valid email address.");
          return;
        }
        if (!message) {
          alert("Please enter your message.");
          return;
        }

        // Simulate form submission
        alert(
          "Thank you, " + name + ". Your message has been sent successfully!"
        );

        // Clear form fields
        nameInput.value = "";
        emailInput.value = "";
        messageInput.value = "";
      } catch (error) {
        console.error("An error occurred during form submission: ", error);
        alert("An unexpected error occurred. Please try again later.");
      }
    });

    // Function to validate email format
    function validateEmail(email) {
      try {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
      } catch (error) {
        console.error("An error occurred during email validation: ", error);
        return false;
      }
    }
  } catch (error) {
    console.error("An error occurred while initializing the form: ", error);
    alert(
      "An unexpected error occurred while loading the form. Please refresh the page and try again."
    );
  }
});
