const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();  // 导入dotenv模块

const app = express();
app.use(express.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,  // 使用环境变量
        pass: process.env.EMAIL_PASS,  // 使用环境变量
    },
});

app.post('/send-feedback', async (req, res) => {
    const { feedbackText } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER,  // 使用环境变量
        to: 'lamvu190105@gmail.com',
        subject: '新用户反馈',
        text: feedbackText,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        res.status(200).json({ message: '反馈成功发送！', info });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
