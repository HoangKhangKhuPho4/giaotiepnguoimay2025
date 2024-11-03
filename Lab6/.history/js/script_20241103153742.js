document.addEventListener("DOMContentLoaded", function () {
    const guideButtons = document.querySelectorAll(".btn-guide");
    const guideModal = new bootstrap.Modal(
      document.getElementById("guideModal")
    );
    const guideModalLabel = document.getElementById("guideModalLabel");
    const guideModalBody = document.getElementById("guideModalBody");

    const guideContent = {
      JavaScript: {
        framework: "Mocha",
        description:
          "Mocha is a feature-rich JavaScript test framework running on Node.js and in the browser, making asynchronous testing simple and fun.",
        link: "https://mochajs.org/",
      },
      TypeScript: {
        framework: "Mocha",
        description:
          "Using Mocha with TypeScript allows you to write clear and concise unit tests with type safety.",
        link: "https://mochajs.org/",
      },
      Python: {
        framework: "pytest",
        description:
          "pytest is a mature full-featured Python testing tool that helps you write better programs.",
        link: "https://docs.pytest.org/",
      },
      PHP: {
        framework: "PHPUnit",
        description:
          "PHPUnit is a programmer-oriented testing framework for PHP. It is an instance of the xUnit architecture for unit testing frameworks.",
        link: "https://phpunit.de/",
      },
      Java: {
        framework: "JUnit",
        description:
          "JUnit is a simple framework to write repeatable tests for Java programming language.",
        link: "https://junit.org/junit5/",
      },
      Kotlin: {
        framework: "JUnit",
        description:
          "JUnit is widely used in the Kotlin ecosystem for writing unit tests. It integrates seamlessly with Kotlin's features.",
        link: "https://junit.org/junit5/",
      },
    };

    guideButtons.forEach((button) => {
      button.addEventListener("click", function (e) {
        e.preventDefault();
        const language = this.getAttribute("data-language");
        const framework = this.getAttribute("data-framework");

        if (guideContent[language]) {
          guideModalLabel.textContent = `${language} Guide - ${framework}`;
          guideModalBody.innerHTML = `
            <p>${guideContent[language].description}</p>
            <p>For more information, visit the <a href="${guideContent[language].link}" target="_blank">${framework} Documentation</a>.</p>
          `;
          guideModal.show();
        } else {
          guideModalLabel.textContent = "Guide";
          guideModalBody.innerHTML = "<p>Guide information is not available.</p>";
          guideModal.show();
        }
      });
    });
  });