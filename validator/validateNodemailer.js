const {check}= require('express-validator');


const rules = [
    check('email')
        .not().isEmpty()
        .withMessage('E-mail is required')
        .isEmail().withMessage('Please provide a valid email address')
        .matches(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        )
];

module.exports ={
    rules
};
