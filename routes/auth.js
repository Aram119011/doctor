const {Router} = require('express');
const router = Router();


const authControllers = require('../controllers/authControllers');
const upload = require('../middlewares/multer');
const verifyToken = require('../middlewares/jwtCompare');

// Validator
const validateRegister = require('../validator/validateRegister');
const validateLogin = require('../validator/validateLogin');
router.post('/register', upload.single('myPhoto'), validateRegister.rules, authControllers.register);
router.post('/login', validateLogin.rules, authControllers.login);
router.get('/me', verifyToken, authControllers.myProfile);

module.exports = router;
