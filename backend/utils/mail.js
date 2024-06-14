const nodemailer = require('nodemailer');

exports.generateOTP = () => {
    let otp = '';
    for (let i = 0; i <= 3; i++) {
        const randVal = Math.round(Math.random() * 9);
        otp = otp + randVal;
    }
    return otp;
};

exports.mailTransport = () => {
    var transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: process.env.USER_NAME,
            pass: process.env.PASS_WORD
        },
        tls: {
            ciphers: "SSLv3"
        }
    });

    return transport;
};

exports.verifyEmailTemplate = code => {
    return `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <style>
                @media only screen and (max-width: 620px) {
                    h1 {
                        font-size: 20px;
                        padding: 5px;
                    }
                }
                div {
                    margin: 0 auto;
                    text-align: center;
                    font-family: sans-serif;
                    color: #272727;
                }
                h1 {
                    background: #f6f6f6;
                    padding: 10px;
                }
                .otp {
                    width: 80px;
                    margin: 0 auto;
                    font-weight: bold;
                    background: #f6f6f6;
                    border-radius: 5px;
                    font-size: 25px;
                }
            </style>
        </head>
        <body>
            <div>
                <h1> Email Verification </h1>
                <p> Please enter this OTP code to verify your email address: </p>
                <p class="otp"> ${code} </p>
                <br />
                <p> This code is only valid for 1 hour and will expire after use! </p>
            </div>
        </body>
    </html>
    `;
};

exports.welcomeEmailTemplate = (heading, message) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <style>
                @media only screen and (max-width: 620px) {
                    h1 {
                        font-size: 20px;
                        padding: 5px;
                    }
                }
                div {
                    margin: 0 auto;
                    font-family: sans-serif;
                    text-align: center;
                    color: #272727;
                }
                h1 {
                    background: #f6f6f6;
                    padding: 10px;
                }
            </style>
        </head>
        <body>
            <div>
                <h1> ${heading} </h1>
                <p> ${message} </p>
                <br />
                <p> Thank you for joining our community! </p>
            </div>
        </body>
    </html>
    `;
};

exports.resetPasswordTemplate = url => {
    return `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <style>
                @media only screen and (max-width: 620px) {
                    h1 {
                        font-size: 20px;
                        padding: 5px;
                    }
                }
                div {
                    margin: 0 auto;
                    font-family: sans-serif;
                    text-align: center;
                    color: #272727;
                }
                h1 {
                    background: #f6f6f6;
                    padding: 10px;
                }
                button {
                    color: white;
                    background: #E8363C;
                    padding: 15px 30px;
                    border-radius: 5px;
                    border: 0;
                    font-size: 16px;
                }
            </style>
        </head>
        <body>
            <div>
                <h1> Reset Password </h1>
                <p> Please click the reset link below to change your password: </p>
                <a href="${url}"> <button> Reset Password </button> </a>
                <br />
                <p> If this was a mistake, please ignore this email and nothing will happen. </p>
            </div>
        </body>
    </html>
    `;
};

exports.resetSuccessTemplate = (heading, message) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <style>
                @media only screen and (max-width: 620px) {
                    h1 {
                        font-size: 20px;
                        padding: 5px;
                    }
                }
                div {
                    margin: 0 auto;
                    font-family: sans-serif;
                    text-align: center;
                    color: #272727;
                }
                h1 {
                    background: #f6f6f6;
                    padding: 10px;
                }
            </style>
        </head>
        <body>
            <div>
                <h1> ${heading} </h1>
                <p> ${message} </p>
                <br />
                <p> If this was a mistake, please ignore this email and nothing will happen. </p>
            </div>
        </body>
    </html>
    `;
};