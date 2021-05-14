const {Router} = require('express');
const router = Router();

const ForgotResetPassword = require('../controllers/ResetPassword');
// Vlidator-express
const NewCodeSend = require('../validator/validateNewCodeSend');
const validatorforgot = require('../validator/validatorForgotPass');

router.post('/newCode', NewCodeSend.rules, ForgotResetPassword.newCode);
router.post('/reset',validatorforgot.rules, ForgotResetPassword.ResetPassword);

module.exports = router;

