const CalendarDoctor = require('../models/CallendarDoctor');
const user = require('../models/user');
const Busy = require('../models/busy');

module.exports.busDayUpdate = async (req, res) => {
    console.log("busDayUpdate");
    try {
        let usersTherapyUpdate = await CalendarDoctor.updateOne({_id: req.userId}, {
            therapistId: req.body.therapistId,
            weekDay: [{
                enum: req.body.enum,
                startTime: req.body.startTime,
                endTime: req.body.endTime
            }],
        });
        console.log(usersTherapyUpdate, 'usersTherapyUpdate');
        res.status(201).json({
            msg: 'ok',
            usersTherapyUpdate
        })
    } catch (e) {
        res.status(409).json({
            msg: 'error'
        })
    }
};

module.exports.busDay = async (req, res) => {
    console.log(req.userId);
    let usersTherapy = await user.findOne({_id: req.userId});
    console.log(usersTherapy, 'usersTherapy');
    try {
        if (usersTherapy.doctor === true) {
            let calendarUserDay = await CalendarDoctor.find({_id: req.userId});
            console.log(calendarUserDay, 'calendarUserDay');
            if (calendarUserDay.length === 0) {
                let usersTherapyCreat = await CalendarDoctor.create({
                    _id: req.userId,
                    weekDay: [{
                        enum: req.body.enum,
                        startTime: req.body.startTime,
                        endTime: req.body.endTime
                    }],
                });

                let x = await Busy.create({
                    _id: req.userId,
                    weekDay: [{
                        enum: req.body.enum,
                        startTime: req.body.startTime,
                        endTime: req.body.endTime,
                        data: new Date()
                    }],
                });
                console.log(x, usersTherapyCreat, 'x');
                res.status(201).json({
                    msg: 'ok'
                })
            } else {
                let usersTherapyUpdate = await CalendarDoctor.updateOne({_id: req.userId}, {
                    $push: {
                        weekDay: [{
                            enum: req.body.enum,
                            startTime: req.body.startTime,
                            endTime: req.body.endTime
                        }],
                    }
                });


                let usersTherapyaxUpdate = await Busy.updateOne({_id: req.userId},{
                    $push: {
                        weekDay: [{
                            enum: req.body.enum,
                            startTime: req.body.startTime,
                            endTime: req.body.endTime,
                            data: new Date()
                        }],
                    }
                });
                res.status(201).json({
                    msg: 'This may users therapy update',
                    usersTherapyUpdate,
                    usersTherapyaxUpdate
                });


                console.log(usersTherapyUpdate, 'usersTherapyUpdate')
            }
        } else if (usersTherapy.doctor === false) {
            res.status(408).json({
                mag: 'erb vor false e'
            })
        }
    } catch (e) {
        console.log(e);
        res.send('error')
    }
};


module.exports.busDayGet = async (req, res) => {
    console.log('busDayGet');
    console.log(req.userId);
    try {
        let usersTherapyGet = await CalendarDoctor.findOne({_id: req.userId});
        // console.log(usersTherapyGet)
        res.status(201).json({
            msg: 'ok',
            usersTherapyGet
        })
    } catch (e) {
        res.status(408).json({
            msg: 'error'
        })
    }
};


module.exports.busyData = async (req, res) => {
    let usersTherapy = await user.findOne({_id: req.userId});
    try {
        if (usersTherapy.doctor === false) {
            let usersTherapyGetData = await Busy.findOne({_id: req.userId});
            res.status(201).json({
                msg: 'this user therapy false',
                usersTherapyGetData
            })
        } else if (usersTherapy.doctor === true) {
            res.status(408).json({
                msg:'this user therapy true'
            })
        }
    } catch (e) {
        res.status(408).json({
            msg: 'error'
        })
    }
};
