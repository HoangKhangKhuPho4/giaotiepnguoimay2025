document
.getElementById("openIDEButton")
.addEventListener("click", function () {
  // Get form elements
  const challengeName = document
    .getElementById("challengeName")
    .value.trim();
  const difficulty = document.getElementById("difficulty").value;
  const shortDescription = document
    .getElementById("shortDescription")
    .value.trim();

  // Check if all fields are filled
  if (challengeName && difficulty && shortDescription) {
    // All fields are filled, redirect to req3.html
    window.location.href = "req3.html";
  } else {
    // Alert user to fill all fields
    alert("Please fill in all required fields before proceeding.");
  }
});