const {check} = require('express-validator');


const rules = [
    check('email')
        .not().isEmpty()
        .withMessage('E-mail is required')
        .isEmail().withMessage('Please provide a valid email address')
        .matches(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        ),
    check('password',
        'confirm_password',
        "Please enter a password at least 8 character and contain At least one uppercase.At least one lower case.At least one special character. ",

    )
        .isLength({min: 8}).withMessage('Can not be more than 8 characters')
        .custom((value, {req, loc, path}) => {
            // if (req.body.password === req.body.confirm_password) {
            console.log(req.body,'jjhjkhjkh');
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
