const {check} = require('express-validator');

const rules = [
    check('fullName').not().isEmpty()
        .isLength({min: 4, max:50}).withMessage('FirstName is required')
        .matches(
            /^[a-zA-Z\-]{4,}$/
        ).withMessage('Your full name must contain only letters'),
    check('professionalLicenseNumber').not().isEmpty()
        .isLength({min: 4, max:50}).withMessage('professionalLicenseNumber is required'),

    check('phoneNumber').not().isEmpty()
        .isLength({min: 9, max:80}).withMessage('phone number please be at least 9 characters')
        .matches(
            /[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9, ]/
        ).withMessage('Your phoneNumber string'),
    check('email')
        .not().isEmpty()
        .withMessage('E-mail is required')
        .isEmail().withMessage('Please provide a valid email address')
        .matches(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        ),

    check('password', 'confirm_password',
        "Please enter a password at least 8 character and contain At least one uppercase.At least one lower case.At least one special character. ",

    )
        .isLength({min: 8}).withMessage('Can not be more than 8 characters')
        .matches(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,
        ).withMessage('The password must contain both capital letters and numbers')
        .custom((value, {req, loc, path}) => {
            if (value !== req.body.confirm_password) {
                throw new Error("Passwords don't match");
            } else {
                return value;
            }
        })
];

module.exports = {
    rules
};

