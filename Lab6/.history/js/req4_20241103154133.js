document.addEventListener("DOMContentLoaded", function () {
    // Initialize Bootstrap Tooltips
    var tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Reference to the modal
    var editChallengeModal = document.getElementById("editChallengeModal");

    // Close button event
    var closeButton = editChallengeModal.querySelector(".btn-close");
    closeButton.addEventListener("click", function () {
      // Hide the modal by removing 'show' and 'd-block' classes
      editChallengeModal.classList.remove("show", "d-block");
      // Optionally, you can add 'fade' class back for future toggles
      editChallengeModal.classList.add("fade");
    });

    // Update button event
    var updateButton = document.getElementById("updateChallengeBtn");
    updateButton.addEventListener("click", function () {
      // Gather form data
      var inputType = document.getElementById("inputType").value.trim();
      var outputType = document.getElementById("outputType").value.trim();

      // Collect all test cases
      var testCaseElements = document.querySelectorAll(".input-group.mb-3");
      var testCases = [];
      var isValid = true;

      testCaseElements.forEach(function (testCase, index) {
        var inputData = testCase.querySelector(".input-case.form-control:nth-child(1)").value.trim();
        var expectedOutput = testCase.querySelector(".input-case.form-control:nth-child(3)").value.trim();

        if (inputData === "" || expectedOutput === "") {
          isValid = false;
          alert("Please fill in all fields for test case " + (index + 1) + ".");
          return;
        }

        testCases.push({
          input: inputData,
          output: expectedOutput,
        });
      });

      if (!isValid) {
        return;
      }

      if (inputType === "" || outputType === "") {
        alert("Please select both input type and output type.");
        return;
      }

      // Prepare data object
      var challengeData = {
        inputType: inputType,
        outputType: outputType,
        testCases: testCases,
      };

      // For demonstration, log the data
      console.log("Updated Custom Challenge:", challengeData);

      // Show success message
      alert("Custom Challenge updated successfully!");

      // Optionally, hide the modal
      editChallengeModal.classList.remove("show", "d-block");
      editChallengeModal.classList.add("fade");

      // Here, you can also send the data to the server using fetch or AJAX
      // Example:
      /*
      fetch('/api/update-challenge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(challengeData),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          alert('Custom Challenge updated successfully!');
          // Hide modal
          editChallengeModal.classList.remove('show', 'd-block');
          editChallengeModal.classList.add('fade');
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('An error occurred while updating the challenge.');
        });
      */
    });
  });