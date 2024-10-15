// netlify/functions/contact.js

const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const data = JSON.parse(event.body);

        // Cấu hình transporter với SMTP server của bạn
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'your-email@gmail.com',
                pass: 'your-email-password'
            }
        });

        const mailOptions = {
            from: data.email,
            to: 'your-email@gmail.com',
            subject: `New Contact Form Submission from ${data.name}`,
            text: `
                Name: ${data.name}
                Email: ${data.email}
                Phone: ${data.phone}
                Service: ${data.services}
                Message: ${data.message}
            `
        };

        await transporter.sendMail(mailOptions);

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, message: 'Email sent successfully' })
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, message: 'Internal Server Error' })
        };
    }
};
