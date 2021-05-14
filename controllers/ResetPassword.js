const User = require('../models/user');
const {validationResult} = require('express-validator');

//Express-Validator
module.exports.newCode = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
    const user = await User.findOne({email: req.body.email});
    if (!user) {
        return res.status(404).send("There is no such email")
    }
    if (user.newCode === req.body.newCode) {
        res.status(201).send({
            success: true,
            msg: 'success'
        })
    } else {
        res.status(404).send('must be completed by all means')
    }
};

module.exports.ResetPassword = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
    const user = await User.findOne({email: req.body.email});
    if (!user) {
        return res.status(404).send("There is no such email")
    }
    const newPassword = await user.encryptPassword(req.body.password);
    try {
        await User.updateOne({email: req.body.email}, {password: newPassword});
        res.status(201).json({msg: 'updated successfully a password'})
    } catch (e) {
        res.status(404).json({
            msg: 'error',
            details: e
        })
    }
};
