const UserDay = require('../models/UserDay');
const User = require('../models/user');


module.exports.DescriptionDay = async (req, res) => {
    let calendarUserDay = await User.findOne({_id: req.userId});
    try {
        if (calendarUserDay.doctor === false) {
            let myDay = await UserDay.find({UserId: req.userId});
            if (myDay.length === 0) {
                let descriptionDay = await UserDay.create({
                    UserId: req.userId,
                    Day: [{
                        description_day: req.body.description_day,
                        smiley: req.body.smiley,
                        data: new Date()
                    }],
                });
                let  descriptionFull = await UserDay.find({UserId: req.userId});
                res.status(201).json({
                    msg: 'this may day success',
                    descriptionFull
                });
                console.log(descriptionDay, 'descriptionDay');
            } else {
                let descriptionDayUpdate = await UserDay.updateOne({UserId: req.userId}, {
                    $push: {
                        Day: [{
                            description_day: req.body.description_day,
                            smiley: req.body.smiley,
                            data: new Date()
                        }],
                    }
                });
                let  descriptionFull = await UserDay.find({UserId: req.userId});
                res.status(202).json({
                    msg: 'this may day update',
                    descriptionDayUpdate,
                    descriptionFull
                });
            }


        } else if (calendarUserDay.doctor === true) {
            console.log('true');
            res.status(408).json({
                msg: 'this users therapist'
            })
        }
    } catch (e) {
        res.status(409).json({
            msg: 'error'
        })
    }
};




module.exports.DescriptionAll = async (req, res) => {
    console.log(req.userId);
    try {
        let descriptionDay = await UserDay.findOne({UserId: req.userId});
        console.log(descriptionDay);
        res.status(201).json({
            msg: 'success',
            descriptionDay
        })
    } catch (e) {
        res.status(409).json({
            msg: 'error'
        })
    }
};

module.exports.DescriptionThatDay = async (req, res) => {
    try {
        let descriptionDay = await UserDay.findOne({UserId: req.userId});
        const result = descriptionDay.Day.filter(word => {
            return word._id == req.body._id
        });
        res.status(201).json({
            msg: 'ok',
            result
        });
    } catch (e) {
        console.log(e)

    }
};

module.exports.MyDay = async (req, res) => {
    let user = await User.findOne({_id: req.userId});
    console.log(user, 'MyDay');
    try {
        if (user.doctor === false) {
            console.log('false')

        } else if (user.doctor === true) {
            console.log('true')
        }
    } catch (e) {

    }
};
