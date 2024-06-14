const jwt = require('jsonwebtoken');
const { isValidObjectId } = require('mongoose');

const User = require('../models/user');
const VerificationToken = require('../models/verificationToken');
const ResetToken = require('../models/resetToken');
const { generateOTP, mailTransport, verifyEmailTemplate, welcomeEmailTemplate, resetPasswordTemplate, resetSuccessTemplate } = require('../utils/mail');
const { sendError, createRandomBytes } = require('../utils/helper');

exports.createUser = async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        return sendError(res, "This email already exists!");
    }

    const newUser = new User({
        name,
        email,
        password
    });

    const OTP = generateOTP();
    const verificationToken = new VerificationToken({
        owner: newUser._id,
        token: OTP
    });

    await verificationToken.save();
    await newUser.save();

    mailTransport().sendMail({
        from: process.env.USER_NAME,
        to: newUser.email,
        subject: 'Verify your Email Address',
        html: verifyEmailTemplate(OTP)
    });

    res.json({
        success: true,
        message: 'Sign Up Successful!',
        user: {
            name: newUser.name,
            email: newUser.email,
            id: newUser._id,
            verified: newUser.verified
        }
    });
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email.trim() || !password.trim()) {
            return sendError(res, "Incorrect email or password!");
        }

        const user = await User.findOne({ email });
        if (!user) {
            return sendError(res, 'Email not found or does not exist!');
        }

        const isMatched = await user.comparePassword(password);
        if (!isMatched) {
            return sendError(res, 'Incorrect password!');
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        res.json({
            success: true,
            message: 'Log In Successful!',
            user: {
                name: user.name,
                email: user.email,
                id: user._id,
                token
            }
        });
    }
    catch (error) {
        return sendError(res, error.message, 500);
    }
};

exports.verifyEmail = async (req, res) => {
    const { userId, otp } = req.body;
    if (!userId || !otp.trim()) {
        return sendError(res, 'Invalid request!');
    }
    if (!isValidObjectId(userId)) {
        return sendError(res, 'Invalid user ID!');
    }

    const user = await User.findById(userId);
    if (!user) {
        return sendError(res, 'User not found or does not exist!');
    }
    if (user.verified) {
        return sendError(res, 'This account is already verified!');
    }

    const token = await VerificationToken.findOne({ owner: user._id });
    if (!token) {
        return sendError(res, 'User not found or does not exist!');
    }

    const isMatched = await token.compareToken(otp);
    if (!isMatched) {
        return sendError(res, 'Invalid token!');
    }

    user.verified = true;
    await VerificationToken.findByIdAndDelete(token._id);
    await user.save();

    mailTransport().sendMail({
        from: process.env.USER_NAME,
        to: user.email,
        subject: 'Email Verification Successful',
        html: welcomeEmailTemplate('Welcome to Mern-Auth-App',
            'Your email has been verified successfully! You can now login using your new account.')
    });

    res.json({
        success: true,
        message: "Email Verification Successful!",
        user: {
            name: user.name,
            email: user.email,
            id: user._id
        }
    });
};

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return sendError(res, 'Please provide a valid email address!');
    }

    const user = await User.findOne({ email });
    if (!user) {
        return sendError(res, 'User not found or does not exist!');
    }

    const token = await ResetToken.findOne({ owner: user._id });
    if (token) {
        return sendError(res, 'Please wait for 1 hour to request for another token!');
    }

    const randomBytes = await createRandomBytes();
    const resetToken = new ResetToken({ owner: user._id, token: randomBytes });
    await resetToken.save();

    mailTransport().sendMail({
        from: process.env.USER_NAME,
        to: user.email,
        subject: 'Reset your Password',
        html: resetPasswordTemplate(`http://localhost:3000/reset-password?token=${randomBytes}&id=${user._id}`)
    });

    res.json({
        success: true,
        message: 'Password reset link has been sent to your email!'
    });
};

exports.resetPassword = async (req, res) => {
    const { password } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
        return sendError(res, 'User not found or does not exist!');
    }

    const isSamePassword = await user.comparePassword(password);
    if (isSamePassword) {
        return sendError(res, 'Please enter a different password!');
    }

    if (password.trim().length < 8 || password.trim().length > 20) {
        return sendError(res, 'Password must be 8 to 20 characters long!');
    }

    user.password = password.trim();
    await user.save();
    await ResetToken.findOneAndDelete({ owner: user._id });

    mailTransport().sendMail({
        from: process.env.USER_NAME,
        to: user.email,
        subject: 'Password Reset Successful',
        html: resetSuccessTemplate('Congratulations!',
            'Your password has been changed successfully! You can now login with your new password.')
    });

    res.json({
        success: true,
        message: "Password Reset Successful!"
    });
};