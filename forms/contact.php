<?php
header('Content-Type: application/json');

$name = $_POST['name'];
$email = $_POST['email'];
$subject = $_POST['subject'];
$message = $_POST['message'];

// Kiểm tra dữ liệu và xử lý form
if ($name && $email && $subject && $message) {
    // Xử lý thành công (ví dụ gửi email)
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Please fill all fields.']);
}
