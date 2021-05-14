const {Router} = require('express');
const router = Router();
const upload = require('../middlewares/multer');
const authDoctorControllers = require('../controllers/authDoctorControllers');

// Validator
const validateDoctorsRegister = require('../validator/validateDoctorsRegister');
router.post('/registerdoctor', upload.single('myPhoto'), validateDoctorsRegister.rules, authDoctorControllers.registerDoctor);

module.exports = router;
