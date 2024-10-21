document.addEventListener('DOMContentLoaded', function () {
    const videoPlayer = document.querySelector('.video-player');
    const videoEmbed = document.getElementById('video-embed');
    const sections = document.querySelectorAll('.sidebar .section');

    sections.forEach(function (section) {
        const header = section.querySelector('h4');
        const content = section.querySelector('ul');
        const icon = header.querySelector('i');

        // Ẩn nội dung ban đầu
        content.style.display = 'none';

        header.addEventListener('click', function () {
            if (content.style.display === 'none') {
                content.style.display = 'block';
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            } else {
                content.style.display = 'none';
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
        });

        // Thêm sự kiện click cho từng mục trong sidebar để thay đổi video
        const listItems = content.querySelectorAll('li');
        listItems.forEach(function (item) {
            item.addEventListener('click', function () {
                const videoUrl = item.getAttribute('data-video-url');
                videoEmbed.src = videoUrl;
                videoPlayer.classList.add('active');
                // Cuộn đến video player
                videoPlayer.scrollIntoView({ behavior: 'smooth' });
            });
        });
    });

    // Chức năng đóng sidebar (nếu cần)
    const closeButton = document.querySelector('.close-button');
    closeButton.addEventListener('click', function () {
        document.querySelector('.sidebar').style.display = 'none';
    });

    // Chức năng cho Navbar
    // Leave a Rating
    const leaveRatingLink = document.getElementById('leave-rating');
    leaveRatingLink.addEventListener('click', function (e) {
        e.preventDefault();
        alert('Thank you for choosing to leave a rating!');
    });

    // Your Progress Dropdown
    const yourProgressLink = document.getElementById('your-progress');
    const progressDropdown = document.getElementById('progress-dropdown');
    yourProgressLink.addEventListener('click', function (e) {
        e.preventDefault();
        progressDropdown.style.display = progressDropdown.style.display === 'none' ? 'block' : 'none';
        // Ẩn các dropdown khác nếu đang mở
        shareDropdown.style.display = 'none';
        moreOptionsDropdown.style.display = 'none';
    });

    // Share Dropdown
    const shareButton = document.getElementById('share-button');
    const shareDropdown = document.getElementById('share-dropdown');
    shareButton.addEventListener('click', function () {
        shareDropdown.style.display = shareDropdown.style.display === 'none' ? 'block' : 'none';
        // Ẩn các dropdown khác nếu đang mở
        progressDropdown.style.display = 'none';
        moreOptionsDropdown.style.display = 'none';
    });

    // More Options Dropdown
    const moreOptionsButton = document.getElementById('more-options-button');
    const moreOptionsDropdown = document.getElementById('more-options-dropdown');
    moreOptionsButton.addEventListener('click', function () {
        moreOptionsDropdown.style.display = moreOptionsDropdown.style.display === 'none' ? 'block' : 'none';
        // Ẩn các dropdown khác nếu đang mở
        progressDropdown.style.display = 'none';
        shareDropdown.style.display = 'none';
    });

    // Đóng dropdown khi click bên ngoài
    document.addEventListener('click', function (event) {
        if (!yourProgressLink.contains(event.target) && !progressDropdown.contains(event.target)) {
            progressDropdown.style.display = 'none';
        }
        if (!shareButton.contains(event.target) && !shareDropdown.contains(event.target)) {
            shareDropdown.style.display = 'none';
        }
        if (!moreOptionsButton.contains(event.target) && !moreOptionsDropdown.contains(event.target)) {
            moreOptionsDropdown.style.display = 'none';
        }
    });

    // Chức năng cho Menu Bar
    const menuItems = document.querySelectorAll('.menu-item');
    const contentSections = document.querySelectorAll('.content-section');

    menuItems.forEach(function (menuItem) {
        menuItem.addEventListener('click', function (e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');

            // Xóa class 'active' từ tất cả menu items
            menuItems.forEach(function (item) {
                item.classList.remove('active');
            });

            // Ẩn tất cả content sections
            contentSections.forEach(function (section) {
                section.classList.remove('active');
            });

            // Thêm class 'active' cho menu item được click
            this.classList.add('active');

            // Hiển thị content section tương ứng
            document.getElementById(targetSection).classList.add('active');
        });
    });
});


// js/scripts.js

document.addEventListener('DOMContentLoaded', () => {
    // Chuyển đổi các URL không đúng định dạng sang định dạng embed
    const lessonItems = document.querySelectorAll('.sidebar .section ul li');

    lessonItems.forEach(lesson => {
        let videoUrl = lesson.getAttribute('data-video-url');

        // Kiểm tra nếu URL bắt đầu bằng 'https://youtu.be/'
        if (videoUrl.startsWith('https://youtu.be/')) {
            // Tách VIDEO_ID từ URL
            const urlParts = videoUrl.split('/');
            const videoIdWithParams = urlParts[urlParts.length - 1];
            const videoId = videoIdWithParams.split('?')[0]; // Loại bỏ các tham số

            // Tạo lại URL embed
            const embedUrl = `https://www.youtube.com/embed/${videoId}`;

            // Cập nhật thuộc tính 'data-video-url'
            lesson.setAttribute('data-video-url', embedUrl);
        }
    });

    // Xử lý việc mở rộng/thu gọn các sections trong sidebar
    const sections = document.querySelectorAll('.sidebar .section h4');

    sections.forEach(section => {
        section.addEventListener('click', () => {
            // Toggle active class
            section.classList.toggle('active');

            // Toggle the visibility of the corresponding ul
            const ul = section.nextElementSibling;
            if (ul.style.display === 'block') {
                ul.style.display = 'none';
            } else {
                ul.style.display = 'block';
            }

            // Toggle chevron direction
            const chevron = section.querySelector('i.fas');
            chevron.classList.toggle('fa-chevron-down');
            chevron.classList.toggle('fa-chevron-up');
        });
    });

    // Xử lý việc nhấp vào các mục bài học để phát video
    const updatedLessonItems = document.querySelectorAll('.sidebar .section ul li');

    updatedLessonItems.forEach(lesson => {
        lesson.addEventListener('click', (e) => {
            // Ngăn chặn sự kiện từ checkbox
            if (e.target.tagName.toLowerCase() === 'input') {
                return;
            }

            const videoUrl = lesson.getAttribute('data-video-url');
            const videoEmbed = document.getElementById('video-embed');

            // Cập nhật src của iframe video
            videoEmbed.src = videoUrl;

            // Hiển thị video player nếu đang ẩn
            const videoPlayer = document.querySelector('.video-player');
            if (!videoPlayer.classList.contains('active')) {
                videoPlayer.classList.add('active');
            }

            // Gỡ bỏ lớp active khỏi tất cả các lesson-item khác
            updatedLessonItems.forEach(item => {
                item.classList.remove('active');
            });

            // Thêm lớp active cho lesson đã chọn
            lesson.classList.add('active');
        });
    });

    // Xử lý các dropdown menus trong navbar
    // Toggle progress dropdown
    const progressContainer = document.getElementById('progress-container');
    progressContainer.addEventListener('click', (e) => {
        e.stopPropagation();
        const dropdown = document.getElementById('progress-dropdown');
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });

    // Toggle share dropdown
    const shareButton = document.getElementById('share-button');
    shareButton.addEventListener('click', (e) => {
        e.stopPropagation();
        const dropdown = document.getElementById('share-dropdown');
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });

    // Toggle more options dropdown
    const moreOptionsButton = document.getElementById('more-options-button');
    moreOptionsButton.addEventListener('click', (e) => {
        e.stopPropagation();
        const dropdown = document.getElementById('more-options-dropdown');
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });

    // Close all dropdowns when clicking outside
    document.addEventListener('click', () => {
        const dropdowns = document.querySelectorAll('.navbar .dropdown-menu');
        dropdowns.forEach(dropdown => {
            dropdown.style.display = 'none';
        });
    });

    // Xử lý nút Close trong sidebar (nếu có)
    const closeButton = document.querySelector('.sidebar .close-button');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            const sidebar = document.querySelector('.sidebar');
            sidebar.style.display = 'none';
        });
    }
});
