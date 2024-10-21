// js/scripts.js

document.addEventListener('DOMContentLoaded', function () {
    // 1. Chuyển đổi các URL không đúng định dạng sang định dạng embed
    const lessonItems = document.querySelectorAll('.sidebar .section ul li');

    lessonItems.forEach(lesson => {
        let videoUrl = lesson.getAttribute('data-video-url');

        // Kiểm tra nếu URL bắt đầu bằng 'https://youtu.be/' hoặc 'https://www.youtube.com/watch?v='
        if (videoUrl.startsWith('https://youtu.be/')) {
            // Tách VIDEO_ID từ URL dạng youtu.be
            const urlParts = videoUrl.split('/');
            const videoIdWithParams = urlParts[urlParts.length - 1];
            const videoId = videoIdWithParams.split('?')[0]; // Loại bỏ các tham số

            // Tạo lại URL embed
            const embedUrl = `https://www.youtube.com/embed/${videoId}`;

            // Cập nhật thuộc tính 'data-video-url'
            lesson.setAttribute('data-video-url', embedUrl);
        } else if (videoUrl.startsWith('https://www.youtube.com/watch?v=')) {
            // Tách VIDEO_ID từ URL dạng youtube.com/watch
            const urlParams = new URLSearchParams(videoUrl.split('?')[1]);
            const videoId = urlParams.get('v');

            if (videoId) {
                // Tạo lại URL embed
                const embedUrl = `https://www.youtube.com/embed/${videoId}`;

                // Cập nhật thuộc tính 'data-video-url'
                lesson.setAttribute('data-video-url', embedUrl);
            }
        }
        // Nếu URL đã ở dạng embed chính xác, không làm gì
    });

    // 2. Xử lý việc mở rộng/thu gọn các sections trong sidebar
    const sections = document.querySelectorAll('.sidebar .section h4');

    sections.forEach(section => {
        const content = section.nextElementSibling; // <ul>
        const icon = section.querySelector('i.fas');

        // Kiểm tra trạng thái hiện tại và áp dụng class 'active' nếu cần
        if (content.style.display === 'block') {
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-up');
        } else {
            content.style.display = 'none';
            icon.classList.remove('fa-chevron-up');
            icon.classList.add('fa-chevron-down');
        }

        section.addEventListener('click', function () {
            if (content.style.display === 'none' || content.style.display === '') {
                content.style.display = 'block';
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            } else {
                content.style.display = 'none';
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
        });
    });

    // 3. Xử lý việc nhấp vào biểu tượng phát video để phát video
    const videoIcons = document.querySelectorAll('.lesson-time i.fas');

    videoIcons.forEach(icon => {
        icon.addEventListener('click', function (e) {
            e.stopPropagation(); // Ngăn sự kiện click từ cha (nếu có)

            const lessonItem = this.closest('li');
            const videoUrl = lessonItem.getAttribute('data-video-url');
            const videoEmbed = document.getElementById('video-embed');

            // Cập nhật src của iframe video
            videoEmbed.src = videoUrl;

            // Hiển thị video player nếu đang ẩn
            const videoPlayer = document.querySelector('.video-player');
            if (!videoPlayer.classList.contains('active')) {
                videoPlayer.classList.add('active');
            }

            // Cuộn đến video player
            videoPlayer.scrollIntoView({ behavior: 'smooth' });

            // Gỡ bỏ lớp active khỏi tất cả các lesson-item khác
            lessonItems.forEach(item => {
                item.classList.remove('active');
            });

            // Thêm lớp active cho lesson đã chọn
            lessonItem.classList.add('active');
        });
    });

    // 4. Chức năng đóng sidebar (nếu cần)
    const closeButton = document.querySelector('.sidebar .close-button');
    if (closeButton) {
        closeButton.addEventListener('click', function () {
            document.querySelector('.sidebar').style.display = 'none';
        });
    }

    // 5. Chức năng cho Navbar
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
        progressDropdown.style.display = progressDropdown.style.display === 'block' ? 'none' : 'block';
        // Ẩn các dropdown khác nếu đang mở
        shareDropdown.style.display = 'none';
        moreOptionsDropdown.style.display = 'none';
    });

    // Share Dropdown
    const shareButton = document.getElementById('share-button');
    const shareDropdown = document.getElementById('share-dropdown');
    shareButton.addEventListener('click', function (e) {
        e.preventDefault();
        shareDropdown.style.display = shareDropdown.style.display === 'block' ? 'none' : 'block';
        // Ẩn các dropdown khác nếu đang mở
        progressDropdown.style.display = 'none';
        moreOptionsDropdown.style.display = 'none';
    });

    // More Options Dropdown
    const moreOptionsButton = document.getElementById('more-options-button');
    const moreOptionsDropdown = document.getElementById('more-options-dropdown');
    moreOptionsButton.addEventListener('click', function (e) {
        e.preventDefault();
        moreOptionsDropdown.style.display = moreOptionsDropdown.style.display === 'block' ? 'none' : 'block';
        // Ẩn các dropdown khác nếu đang mở
        progressDropdown.style.display = 'none';
        shareDropdown.style.display = 'none';
    });

    // Đóng dropdown khi click bên ngoài
    document.addEventListener('click', function (event) {
        // Nếu click không phải là trong progress container
        if (!document.getElementById('progress-container').contains(event.target)) {
            progressDropdown.style.display = 'none';
        }

        // Nếu click không phải là trong share button
        if (!shareButton.contains(event.target) && !shareDropdown.contains(event.target)) {
            shareDropdown.style.display = 'none';
        }

        // Nếu click không phải là trong more options button
        if (!moreOptionsButton.contains(event.target) && !moreOptionsDropdown.contains(event.target)) {
            moreOptionsDropdown.style.display = 'none';
        }
    });

    // 6. Chức năng cho Menu Bar
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
