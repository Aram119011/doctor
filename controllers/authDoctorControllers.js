// const User = require('../models/user');
const User = require('../models/user');
const config = require('../config/keys');
const Stripe = require('stripe').Stripe;
const stripe = new Stripe(config.Secret_key);


//Express-Validator

const {validationResult} = require('express-validator');

module.exports.registerDoctor = async (req, res) => {
    console.log('lllll');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }

    let candidateDoctor = await User.findOne({email: req.body.email});
    if (!candidateDoctor) {
        const userData = {
            fullName,
            email,
            phoneNumber,
            professionalLicenseNumber,
            password,
            newCode,
            // doctor: true
        } = req.body;

        req.file ? userData.myPhoto = req.file.filename : null;
        let customer = await stripe.customers.create({email: email});
        const user = await new User({
            email
        });
        try {
            userData.password = await user.encryptPassword(userData.password);
            userData.doctor = true;
            userData.customer_id = customer.id;
            await new User(userData).save();
            res.status(201).json({
                success: true,
                doctor: userData.doctor,
                fullName,
                email
            })
        } catch (e) {
            res.status(404).json({
                msg: 'Error: User not saved please try again later'
            })
        }
    } else {
        res.status(422).json({
            msg: 'The email is already used. Please, use another email'
        })
    }
};
