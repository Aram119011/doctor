const {Router} = require('express');
const router = Router();

const sendMail = require('../controllers/authSendMail');
const validateNodeMailer = require('../validator/validateNodemailer');
router.post('/mail',validateNodeMailer.rules, sendMail.Mail);

module.exports = router;



