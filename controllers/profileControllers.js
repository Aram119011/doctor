const User = require('../models/user');
const fs = require('fs');
const config = require('../config/keys');
const Stripe = require('stripe').Stripe;
const stripe = new Stripe(config.Secret_key);


//Express-Validator
const {validationResult} = require('express-validator');

module.exports.saveInfoupdate = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
    const id = req.params.id;
    try {
        await User.updateOne({_id: id},
            {
                email: req.body.email,
                fullName: req.body.fullName,
                $set: {
                    about: req.body.about
                }
            }, () => {
                console.log(req.body);
                res.status(201).json(
                    {
                        msg: "updated successfully a post with id = " + id,
                        success: {
                            email: req.body.email,
                            fullName: req.body.fullName,
                            about: req.body.about
                        }
                    })
            })
    } catch (e) {
        res.status(480).json({msg: 'error', delete: e})
    }
};

module.exports.savePasswordNew = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
    try {
        const {
            email,
            oldPassword,
            newPassword,
        } = req.body;
        const user = await User.findOne({email: email});
        const validatePassword = await user.validatePassword(oldPassword);
        if (!validatePassword) {
            return res.status(500).json({msg: 'error'})
        }
        const newPassupdate = await user.encryptPassword(newPassword);
        await User.updateOne({email}, {
            password: newPassupdate
        });
        res.status(201).json({message: 'Password changed'});
        console.log(
            email,
            oldPassword
        );

    } catch (e) {
        res.status(404).json({
            message: 'error'
        })
    }
};


module.exports.uplodaeProfile = async (req, res) => {
    let userId = await User.findOne({_id: req.userId});
    if (userId.myPhoto &&
        fs.existsSync(__dirname + `/../uploads/users/${userId.myPhoto}`))
        fs.unlinkSync(__dirname + `/../uploads/users/${userId.myPhoto}`);
    try {
        let user = await User.updateOne({_id: req.userId}, {
            myPhoto: req.file.filename,
        });
        res.status(201).json({
            success: {
                myPhoto: `${req.protocol}://${req.get("host")}/uploads/users/${req.file.filename}`,
                msg: 'success'
            }
        });
    } catch (e) {
        res.status(404).json({
            msg: 'error',
            delete: e
        })
    }

};

module.exports.uplodaeProfileDelete = async (req, res) => {
    let userId = await User.findOne({_id: req.params.id});
    if (userId.myPhoto &&
        fs.existsSync(__dirname + `/../uploads/users/${userId.myPhoto}`))
        fs.unlinkSync(__dirname + `/../uploads/users/${userId.myPhoto}`);
    try {
        let user = await User.updateOne({_id: req.params.id}, {
            myPhoto: 'default.png'
        });
        res.status(201).json({
            success: true,
            user: {
                _id: user.id,
                myPhoto: user.myPhoto ? `${req.protocol}://${req.get("host")}/uploads/users/${user.myPhoto}` : ""
            }
        })

    } catch (e) {
        res.status(404).json({msg: 'error', delete: e})
    }
};



module.exports.paymentSystem = async (req, res) => {
    try {
        let doc = await User.findOne({_id: req.body.id});
        console.log(doc.customer_id, 'doc');
        const token = await stripe.tokens.create({
            card: {
                name: req.body.name,
                number: req.body.number,
                exp_month: req.body.exp_month,
                exp_year: req.body.exp_year,
                cvc: req.body.cvc
            }
        });
        const card = await stripe.customers.createSource(
            doc.customer_id,
            {source: token.id}
        );

        await User.updateOne({_id: req.body.id}, {
            $set: {
                cardId: card.id,
                name:card.name,
                last4:card.last4,
                exp_month:card.exp_month,
                exp_year:card.exp_year
            }
        });
        res.status(201).json({
            msg: 'success',
            cardId: card.id,
            customer_id:doc.customer_id,
            name:card.name,
            last4:card.last4,
            exp_month:card.exp_month,
            exp_year:card.exp_year
        })
    } catch (e) {
        res.status(409).json({
            msg: 'error',
            err:e.raw.message
        });
    }

};

//Get
module.exports.paymentSystemGet = async (req, res) => {
    try {
        let UserPayment = await User.findOne({_id: req.userId});
        console.log(UserPayment.cardId);
        const customer = await stripe.customers.retrieve(
            req.body.customer_id
        );
        res.status(201).json({
            msg: 'success',
            customer
        })
    } catch (e) {
        res.status(409).json({
            msg: 'error'
        })
    }
};


module.exports.paymentSystemUpdate = async (req, res) => {
    try {
        let UserPayment = await User.findOne({_id: req.userId});
        console.log(UserPayment.cardId);
        const card = await stripe.customers.updateSource(
            req.body.customer_id,
            req.body.cardId,
            {name: req.body.name},
        );
        res.status(201).json({
            msg: 'success',
            card
        })
    } catch (e) {
        res.status(409).json({
            msg: 'error'
        })

    }
};

module.exports.paymentSystemDelete = async (req, res) => {
    try {
        let UserPayment = await User.findOne({_id: req.userId});
        console.log(UserPayment.cardId);
         await stripe.customers.deleteSource(
            req.body.customer_id,
            req.body.cardId
        );
        await User.updateOne({_id: req.userId},
            {
                $set: {
                    cardId: '',
                    name: '',
                    last4: '',
                    exp_month:'',
                    exp_year:''
                }
            });
        res.status(201).json({
            msg: 'success'
        });
    } catch (e) {
        res.status(409).json({
            msg: 'error',
            err:e.raw.message
        })
    }
};
