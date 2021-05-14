const {check} = require('express-validator');
// ChooseCategory
const rules = [
    check('groupName')
        .not().isEmpty()
        .withMessage('groupName is required'),
    check('ChooseCategory')
        .not().isEmpty()
        .withMessage('ChooseCategory is required'),
    check('GroupDescription')
        .not().isEmpty()
        .withMessage('GroupDescription is required'),
];


module.exports = {
    rules
};
