const User = require('../models/user');
const fs = require('fs');
const Experience = require('../models/Experience');
const Education = require('../models/Education');

module.exports.saveInfoDoctorupdate = async (req, res) => {
    let updateInfo = await User.findOne({_id: req.userId});
    const id = req.userId;
    try {
        if (updateInfo.doctor === true) {
            await User.updateOne({_id: id},
                {
                    email: req.body.email,
                    fullName: req.body.fullName,
                    phoneNumber: req.body.phoneNumber,
                    professionalLicenseNumber: req.body.professionalLicenseNumber,
                    $set: {
                        about: req.body.about
                    }
                }, () => {
                    res.status(201).json({msg: "updated successfully a Doctor with id = " + id})
                })
        } else if (updateInfo.doctor === false) {
            res.status(408).json({
                mag: 'this users'
            })
        }
    } catch (e) {
        res.status(409).json({msg: 'error', delete: e})
    }
};

module.exports.Certificate = async (req, res) => {
    let certificate = await User.findOne({_id: req.userId});
    if (certificate.doctor === true) {
        let certificateLength = certificate.certificateUpload.length;
        let certificateMyUpload = req.files.length;
        let certificateLimit = 6;
        if (certificateLength + certificateMyUpload <= certificateLimit) {
            try {
                await User.updateOne({_id: req.userId}, {$push: {certificateUpload: req.files.map(file => file.filename)}});
                res.status(201).json({
                    msg: 'Updated success fully',
                    success: true
                })
            } catch (e) {
                res.status(409).json({
                    msg: 'error',
                    delete: e
                })
            }
        } else {
            res.status(409).send(' There are more than 6')
        }
    } else if (certificate.doctor === false) {
        res.status(408).json({
            mag: 'this users'
        })
    }
};


module.exports.uplodaeProfileDelete = async (req, res) => {
    let user = await User.findOne({_id: req.userId});
    try {

        if (user.doctor === true) {
            let deleteCertificates = req.body.certificateUpload;
            if (!fs.existsSync(user.certificateUpload)) {
                user.certificateUpload.forEach(image => {
                    deleteCertificates.forEach(deleteCertificate => {
                        console.log(image, deleteCertificate, 'jjjj');
                        if (image === deleteCertificate) {
                            fs.unlinkSync(__dirname + '/../uploads/certificate/' + image);
                        }
                    })
                })
            }
            deleteCertificates.map(certificate => {
                user.certificateUpload = user.certificateUpload.filter(images => images !== certificate);
            });
            user.save();
            console.log('exist', user.certificateUpload);
            res.status(201).json({
                msg: 'updated successfully a Doctor'
            })
        } else if (user.doctor === false) {
            res.status(408).json({
                msg: 'this user'
            })
        }
    } catch (e) {
        res.status(409).json({
            msg: "error"
        });
    }
};

/////////////////////////////////////////////////////////////////////////
module.exports.newsExperience = async (req, res) => {
    let users = await User.findOne({_id: req.userId});
    try {
        let calendarUserDay = await Experience.find({UserId: req.userId});
        console.log(calendarUserDay, 'calendarUserDay');
        if (users.doctor === true) {
            let descriptionDay = await Experience.create({
                UserId: req.userId,
                companyName: req.body.companyName,
                startDate: req.body.startDate,
                present: req.body.present,
                endDate: req.body.endDate
            });
            let experienceFull = await Experience.find({UserId: req.userId});
            console.log(descriptionDay, 'descriptionDay');
            res.status(201).json({
                msg: 'this may day success',
                experienceFull
            });
        } else if (users.doctor === false) {
            res.status(408).json({
                msg: 'this user'
            })
        }
    } catch (e) {
        res.status(409).json({
            msg: 'error'
        })
    }
};

module.exports.newsUpdate = async (req, res) => {
    let user = await User.findOne({_id: req.userId});
    try {
        if (user.doctor === true) {
            let experienceUser = await Experience.updateOne({_id: req.body.id}, {
                companyName: req.body.companyName,
                startDate: req.body.startDate,
                present: req.body.present,
                endDate: req.body.endDate
            });
            let experienceFull = await Experience.find({UserId: req.userId});
            res.status(201).json({
                msg: 'this experience success',
                experienceUser,
                experienceFull
            });
        } else if (user.doctor === false) {
            res.status(408).json({
                msg: 'this user'
            })
        }
    } catch (e) {
        res.status(409).json({
            msg: 'error'
        })
    }
};

module.exports.Experience = async (req, res) => {
    let usersTherapyExperience = await User.findOne({_id: req.userId});
    try {
        if (usersTherapyExperience.doctor === true) {
            let experience = await User.updateOne({_id: req.userId}, {
                companyName,
                startDate,
                present,
                endDate
            } = req.body);

            let x = await Experience.find({UserId: req.userId});
            res.status(201).json({
                msg: 'updated successfully experience',
                x,
                experience
            })
        } else if (usersTherapyExperience.doctor === false) {
            res.status(408).json({
                mag: 'this users'
            })
        }
    } catch (e) {
        res.status(409).json({
            msg: 'error'
        })
    }
};

// education
module.exports.Education = async (req, res) => {
    let users = await User.findOne({_id: req.userId});
    try {
        await Education.find({UserId: req.userId});
        if (users.doctor === true) {
            let education = await Education.create({
                UserId: req.userId,
                educationUniversity: req.body.educationUniversity,
                educationStartDate: req.body.educationStartDate,
                educationPresent: req.body.educationPresent,
                educationEndDate: req.body.educationEndDate
            });
            let experienceFull = await Education.find({UserId: req.userId});
            res.status(201).json({
                msg: 'this may education',
                experienceFull
            });
        } else if (users.doctor === false) {
            res.status(408).json({
                msg: 'this user'
            })
        }
    } catch (e) {
        res.status(409).json({
            msg: 'error'
        })
    }
};

module.exports.EducationUpdate = async (req, res) => {
    let user = await User.findOne({_id: req.userId});
    try {
        if (user.doctor === true) {
            let educationUser = await Education.updateOne({_id: req.body.id}, {
                educationUniversity: req.body.educationUniversity,
                educationStartDate: req.body.educationStartDate,
                educationPresent: req.body.educationPresent,
                educationEndDate: req.body.educationEndDate
            });
            let experienceFull = await Education.find({UserId: req.userId});
            res.status(201).json({
                msg: 'this education success',
                educationUser,
                experienceFull
            });
        } else if (user.doctor === false) {
            res.status(408).json({
                msg: 'this user'
            })
        }
    } catch (e) {
        res.status(409).json({
            msg: 'error'
        })
    }
};
