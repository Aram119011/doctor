const nodemailer = require('nodemailer');
const User = require('../models/user');


const {validationResult} = require('express-validator')

module.exports.Mail = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }

    async function main() {
        console.log(main);
        let newCode = Math.random().toString(15).substring(2, 8);


        User.findOne({'email': req.body.email}, (err, user) => {
            if (!user)
            // return
                res.status(404).json({
                    msg: 'Could not find email'
                });
            else {
                user.newCode = newCode;
                user.save(function (err) {
                    let user = req.body;
                    sendMail(user, info => {
                        console.log(`The mail has bead send 😃 and the id is ${info.messageId}`);

                        res.status(201).send(info);
                    });

                    // console.log(err);

                    async function sendMail(user, callback) {
                        let transporter = nodemailer.createTransport({
                            host: "smtp.gmail.com",
                            port: 587,
                            secure: false, // true for 465, false for other ports
                            auth: {
                                user: 'anew87582@gmail.com',
                                pass: 'davmark11'
                            }
                        });
                        console.log(newCode, 'bbbbbb');

                        let mailOptions = {

                            from: 'anew87582@gmail.com', // sender address
                            to: `${req.body.email}`, // list of receivers
                            subject: "Welcome to Fun Of Heuristic", // Subject line
                            // html: "<a href='https://www.youtube.com/watch?v=FiJlwWoX148&list=RDFiJlwWoX148&start_radio=1'>" +
                            //     "https://www.youtube.com/watch?v=FiJlwWoX148&list=RDFiJlwWoX148&start_radio=1" + 'hi broo' +
                            //     "</a>"
                            // html: `<p>Your new code: ${newCode} your token ${emailToken}</p>`
                            html: `<p>Please click this email to confirm your email your new code ${newCode}</p>`
                        };
                        let info = await transporter.sendMail(mailOptions);
                        callback(info);
                    }
                })
            }
        });
    }
    main().catch(console.error);
}
