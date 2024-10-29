   // Tab Functionality Script
   document.querySelectorAll('.tab-link').forEach(link => {
    link.addEventListener('click', function() {
        // Remove 'active' class from all tabs
        document.querySelectorAll('.tab-link').forEach(link => link.classList.remove('active'));
        // Add 'active' class to the clicked tab
        this.classList.add('active');

        // Hide all content sections
        document.querySelectorAll('.content-section').forEach(section => section.style.display = 'none');
        // Show the content section corresponding to the clicked tab
        const activeTab = this.getAttribute('data-tab');
        document.getElementById(activeTab).style.display = 'block';
    });
});

// Search Suggestions Script
const courseTitles = [
    'Comprehensive Introduction to Python Programming Language',
    'Mastering Advanced JavaScript Concepts and Techniques',
    'Data Structures and Algorithms in Depth for Developers',
    'Fundamentals of Machine Learning Basics and Applications',
    'Introduction to Cybersecurity Principles and Practices',
    'Building Modern Web Applications with React Framework',
    'Cloud Computing Essentials and Best Practices',
    'Understanding Blockchain Technology and Its Applications',
    'Artificial Intelligence Overview: Concepts and Trends',
    'User Experience Design Principles and Best Practices',
    'Introduction to SQL Databases and Querying Techniques',
    'Agile Project Management Techniques and Methodologies'
];

const searchInput = document.getElementById('search-input');
const suggestionsBox = document.getElementById('suggestions');

searchInput.addEventListener('input', function() {
    const input = this.value.toLowerCase();
    suggestionsBox.innerHTML = '';
    if (input) {
        const filteredCourses = courseTitles.filter(title => title.toLowerCase().includes(input));
        if (filteredCourses.length > 0) {
            filteredCourses.forEach(title => {
                const li = document.createElement('li');
                li.textContent = title;
                li.addEventListener('click', function() {
                    searchInput.value = title;
                    suggestionsBox.style.display = 'none';
                });
                suggestionsBox.appendChild(li);
            });
            suggestionsBox.style.display = 'block';
        } else {
            suggestionsBox.style.display = 'none';
        }
    } else {
        suggestionsBox.style.display = 'none';
    }
});

// Hide suggestions when clicking outside
document.addEventListener('click', function(event) {
    if (!suggestionsBox.contains(event.target) && event.target !== searchInput) {
        suggestionsBox.style.display = 'none';
    }
});

// Reset Functionality
const resetLink = document.querySelector('.reset-link');
resetLink.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
    // Reset all filter inputs to their default values
    document.getElementById('sort-by').selectedIndex = 0;
    document.getElementById('categories').selectedIndex = 0;
    document.getElementById('progress').selectedIndex = 0;
    document.getElementById('instructor').selectedIndex = 0;
    // Clear the search input and hide suggestions
    searchInput.value = '';
    suggestionsBox.style.display = 'none';
});