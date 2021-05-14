const {check} = require('express-validator');


const rules = [
    check('email')
        .not().isEmpty()
        .withMessage('E-mail is required')
        .isEmail().withMessage('Please provide a valid email address')
        .matches(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        ),
    check("oldPassword",
        "Please enter a oldPassword at least 8 character and contain At least one uppercase.At least one lower case.At least one special character. ",
    )
        .isLength({min: 8})
        .matches(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,
        ),
    check('newPassword', 'confirm_password')
        .isLength({min: 8})
        .withMessage('Can not be more than 8 characters')
        .matches(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,
        )
        .withMessage('The password must contain both capital letters and numbers')
        .custom((value, {req, loc, path}) => {
            // if (req.body.password === req.body.confirm_password) {
            console.log(req.body, 'jjhjkhjkh');
            if (value !== req.body.confirm_password) {
                throw new Error("Passwords don't match");
            } else {
                return value;
            }
        })
];

module.exports = {
    rules
}
