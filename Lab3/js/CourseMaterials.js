$(document).ready(function () {
  // Initialize tooltips
  $('[data-toggle="tooltip"]').tooltip();

  // Search functionality
  $("#searchInput").on("input", function () {
    var searchTerm = $(this).val().toLowerCase();
    if (searchTerm.trim() !== "") {
      // Iterate over each table and filter rows
      $(".table-hover").each(function () {
        $(this)
          .find("tbody tr")
          .each(function () {
            var rowText = $(this).text().toLowerCase();
            if (rowText.indexOf(searchTerm) !== -1) {
              $(this).show();
            } else {
              $(this).hide();
            }
          });
      });
    } else {
      // Show all rows if search term is empty
      $(".table-hover tbody tr").show();
    }

    // Handle suggestion box visibility
    if (searchTerm.trim() !== "") {
      $(".suggestion-box").addClass("show");
    } else {
      $(".suggestion-box").removeClass("show");
    }
  });

  // Trigger search on Enter key
  $("#searchInput").keypress(function (e) {
    if (e.which == 13) {
      e.preventDefault(); // Ngăn chặn hành vi mặc định khi nhấn Enter
      var searchTerm = $(this).val().toLowerCase();
      if (searchTerm.trim() !== "") {
        // Iterate over each table and filter rows
        $(".table-hover").each(function () {
          $(this)
            .find("tbody tr")
            .each(function () {
              var rowText = $(this).text().toLowerCase();
              if (rowText.indexOf(searchTerm) !== -1) {
                $(this).show();
              } else {
                $(this).hide();
              }
            });
        });
      } else {
        // Show all rows if search term is empty
        $(".table-hover tbody tr").show();
      }
    }
  });

  // Pre-fill document type in upload modal based on button clicked
  $(".upload-btn").click(function () {
    var docType = $(this).data("type");
    $("#documentType").val(docType);
  });

  // Preview functionality
  $(".preview-btn").click(function () {
    var docUrl = $(this).data("url");
    $("#documentPreview").attr("src", docUrl);
    $("#previewModal").modal("show");
  });

  // Handle form submission for uploads
  $("#uploadForm").submit(function (e) {
    e.preventDefault();
    // Get form data
    var docName = $("#documentName").val();
    var docType = $("#documentType").val();
    var docFile = $("#documentFile")[0].files[0];

    if (docName && docType && docFile) {
      // Create a new table row based on the document type
      var newRow =
        "<tr>" +
        "<td>" +
        docName +
        "</td>" +
        "<td>" +
        new Date().toLocaleDateString("vi-VN") +
        "</td>" +
        '<td class="text-center">' +
        '<button class="btn btn-info btn-sm preview-btn" data-url="' +
        URL.createObjectURL(docFile) +
        '" title="Preview" data-toggle="tooltip" data-placement="top" data-original-title="Preview">' +
        '<i class="fas fa-eye"></i> Preview' +
        "</button>" +
        '<a href="' +
        URL.createObjectURL(docFile) +
        '" class="btn btn-danger btn-sm ml-2" download="' +
        docFile.name +
        '" title="Download" data-toggle="tooltip" data-placement="top" data-original-title="Download">' +
        '<i class="fas fa-download"></i> Download' +
        "</a>" +
        '<button class="btn btn-success btn-sm upload-btn ml-2" data-type="' +
        docType +
        '" data-toggle="modal" data-target="#uploadModal" title="Upload" data-original-title="Upload">' +
        '<i class="fas fa-upload"></i> Upload' +
        "</button>" +
        "</td>" +
        "</tr>";

      // Append the new row to the appropriate table
      if (docType === "Lecture") {
        $("#lecturesTable tbody").append(newRow);
        // Switch to Lectures tab
        $("#lectures-tab").tab("show");
      } else if (docType === "Assignment") {
        $("#assignmentsTable tbody").append(newRow);
        // Switch to Assignments tab
        $("#assignments-tab").tab("show");
      } else if (docType === "Exam") {
        $("#examsTable tbody").append(newRow);
        // Switch to Exams tab
        $("#exams-tab").tab("show");
      } else if (docType === "Resource") {
        $("#resourcesTable tbody").append(newRow);
        // Switch to Resources tab
        $("#resources-tab").tab("show");
      }

      // Reset the form and close the modal
      $("#uploadForm")[0].reset();
      $("#uploadModal").modal("hide");

      // Re-initialize tooltips for dynamically added buttons
      $('[data-toggle="tooltip"]').tooltip();

      // Optionally, display a success message
      alert("Document uploaded successfully!");
    } else {
      alert("Please fill in all fields and select a file.");
    }
  });

  // Ensure hover effects remain after switching tabs
  $('a[data-toggle="tab"]').on("shown.bs.tab", function (e) {
    // Remove active class from all tab blocks
    $(".tab-block").removeClass("active");
    // Add active class to the clicked tab block
    $(e.target).addClass("active");
  });

  // Delegate event for dynamically added preview buttons
  $(document).on("click", ".preview-btn", function () {
    var docUrl = $(this).data("url");
    $("#documentPreview").attr("src", docUrl);
    $("#previewModal").modal("show");
  });

  // Delegate event for dynamically added upload buttons
  $(document).on("click", ".upload-btn", function () {
    var docType = $(this).data("type");
    $("#documentType").val(docType);
  });
});

// Cập nhật tên file khi người dùng chọn file
document.getElementById("documentFile").addEventListener("change", function () {
  var fileName = this.files[0].name;
  document.querySelector(".selected-file-name").textContent = fileName;
});

// Cải thiện hộp gợi ý
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const suggestionBox = document.getElementById("suggestionBox");

  const suggestions = [
    "Introduction to HTML5",
    "CSS3 Fundamentals",
    "JavaScript Basics",
    "Assignment 1: Building a Simple Webpage",
    "Responsive Design Guide",
    "Midterm Exam Review",
    "Final Exam Overview",
    "HTML5 Cheat Sheet",
    "CSS3 Flexbox Guide",
    "JavaScript Reference",
  ];

  searchInput.addEventListener("input", function () {
    const query = searchInput.value.toLowerCase();
    suggestionBox.innerHTML = "";

    if (query) {
      const filteredSuggestions = suggestions.filter(function (suggestion) {
        return suggestion.toLowerCase().includes(query);
      });

      if (filteredSuggestions.length > 0) {
        filteredSuggestions.forEach(function (suggestion) {
          const suggestionItem = document.createElement("div");
          suggestionItem.classList.add("suggestion-item");
          suggestionItem.textContent = suggestion;
          suggestionItem.addEventListener("click", function () {
            searchInput.value = suggestion;
            suggestionBox.classList.remove("show");
            // Trigger search after selecting a suggestion
            $(".table-hover").each(function () {
              $(this)
                .find("tbody tr")
                .each(function () {
                  var rowText = $(this).text().toLowerCase();
                  if (rowText.indexOf(suggestion.toLowerCase()) !== -1) {
                    $(this).show();
                  } else {
                    $(this).hide();
                  }
                });
            });
          });
          suggestionBox.appendChild(suggestionItem);
        });
        suggestionBox.classList.add("show");
      } else {
        suggestionBox.classList.remove("show");
      }
    } else {
      suggestionBox.classList.remove("show");
    }
  });

  document.addEventListener("click", function (e) {
    if (!searchInput.contains(e.target) && !suggestionBox.contains(e.target)) {
      suggestionBox.classList.remove("show");
    }
  });
});


document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
      searchInput.focus();
    }
  });