const { check, validationResult } = require('express-validator');

exports.validateUser = [
    check('name')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Invalid! Name cannot be empty!')
    .isLength({min: 3, max: 20})
    .withMessage('Invalid! Name must be 3 to 20 characters long!'),
    
    check('email')
    .normalizeEmail()
    .isEmail()
    .withMessage('Invalid! Enter a correct Email that is existing!'),
    
    check('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Invalid! Password cannot be empty!')
    .isLength({min: 8, max: 20})
    .withMessage('Invalid! Password must be 8 to 20 characters long!')
];

exports.validate = (req, res, next) => {
    const error = validationResult(req).array();
    if(!error.length) {
        return next();
    }
    res.status(400).json({success: false, error: error[0].msg});
}