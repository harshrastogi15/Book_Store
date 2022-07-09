const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

async function send() {
    const result = await transporter.sendMail({
        from: process.env.EMAIL,
        to: 'harshrastogi172000@gmail.com',
        subject: 'No reply - Book Store ',
        html: `
            <div style="width: 80%; margin: auto;">
                <div style="width: 300px; height: 120px; margin: auto;">
                    <img src='cid:logo' height="100%" width="100%">
                </div>
                <h1 style="font-size: 24px; text-align: center;">HR BOOK STORE</h1>
                <h1 style="font-size: 16px; padding: 0; margin: 0; margin-top: 50px; text-align: left;">HARSH RASTOGI</h1>
                <h3 style="font-size: 14px; padding: 0; margin: 0; margin-bottom: 50px; text-align: left;">
                    <a href="https://harshrastogi15.github.io/Personal/">Profile</a>
                </h3>
                
            </div>
        `,
        attachments: [
            {
                filename: "logo.png",
                path: "Logocomp.png",
                cid: "logo",
            },
        ]
    });
    console.log(JSON.stringify(result, null, 4));
}

router.post('/verify', async(req, res) => {
    try {
        await send();
        res.json({ status: 0 });
    } catch (error) {
        res.json({ status: -2 });
    }
})


module.exports = router
