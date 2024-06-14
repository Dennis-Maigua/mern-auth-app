const router = require('express').Router();

const { createUser, verifyEmail, login, forgotPassword, resetPassword } = require('../controllers/user');
const { validateUser, validate } = require('../middlewares/validator');
const { isResetTokenValid } = require('../middlewares/user');

router.post('/register', validateUser, validate, createUser);
router.post('/login', login);
router.post('/verify-email', verifyEmail);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', isResetTokenValid, resetPassword);
router.get('/verify-token', isResetTokenValid, (req, res) => {
    res.json({
        success: true
    });
});

module.exports = router;