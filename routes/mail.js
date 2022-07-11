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
    var email = `prateekchandra27@outlook.com`;
    var heading = `
    Welcome to the HR book Store.
    `
    var message = `here you find the book's information.
                    Please help other users by providing your review about books
                `;
    var footerMessage = `Thanks for joining us.`;
    
    const result = await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: 'no-reply__HR_BookStore ',
        html: `
            <div style="width: 80%; margin: auto;">
                <div style="width: 100%; max-width: 300px; height: 120px; margin: auto;">
                    <img src='cid:logo' height="100%" width="100%">
                </div>
                <h1 style="font-size: 24px; text-align: center;">HR BOOK STORE</h1>
                <h6 style="font-size: 14px; padding: 0; margin: 0; margin-top: 50px; text-align: left;">
                    ${heading}
                </h6>
                <p>${message}</p>
                <p>${footerMessage}</p>
                <p style="font-size: 14px; padding: 0; margin: 0; margin-top: 50px; text-align: left;">
                    Regards
                </p>
                <h1 style="font-size: 16px; padding: 0; margin: 0; margin-top: 5px; text-align: left;">Harsh Rastogi,</h1>
                <h3 style="font-size: 14px; padding: 0; margin: 0; text-align: left;">
                    Admin,
                </h3>
                <h3 style="font-size: 14px; padding: 0; margin: 0; margin-bottom: 50px; text-align: left;">
                    <a href="https://harshrastogi15.github.io/Personal/">Profile</a>
                </h3>
                <h3 style="font-size: 14px; padding: 0; margin: 0; margin-top: 10px; margin-bottom: 10px; text-align: center;">
                    Please Visit : https://hrbookstore.herokuapp.com/
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
