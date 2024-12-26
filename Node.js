const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com', // 替换为您的Gmail
        pass: 'your-password',
    },
});

app.post('/send-feedback', async (req, res) => {
    const { feedbackText } = req.body;

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: 'lamvu190105@gmail.com',
        subject: '新用户反馈',
        text: feedbackText,
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: '反馈成功发送！' });
    });
});

app.listen(3000, () => console.log('Server running on port 3000'));
