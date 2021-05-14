const {check} = require('express-validator');


const rules =[
    check('CreditCard')
        .not().isEmpty()
        .withMessage('CreditCard is required')
    .isLength({min: 16, max:50}).withMessage('please min more than 16 characters')
        .matches(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,
        )
        .withMessage('please write only numbers'),
    check('nameOnCard')
        .not().isEmpty()
        .withMessage('CreditCard is required')
        .isLength({min: 5, max:50}).withMessage('please min more than 5 characters'),
    check('ExpirationDate')
        .not().isEmpty()
        .withMessage('ExpirationDate is required')
        .isLength({min: 2, max:8}).withMessage('please min more than 2 characters'),
    check('CVVCode')
        .not().isEmpty()
        .withMessage('CVVCode is required')
        .isLength({min: 2, max:8}).withMessage('please min more than 2 characters'),
];

module.exports ={
    rules
};
