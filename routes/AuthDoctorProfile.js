const {Router} = require('express');
const router = Router();
const verifyToken = require('../middlewares/jwtCompare');

const uploadCertificate = require('../middlewares/uploadCertificate');
const controllerDoctorUpdate = require('../controllers/profileDoctorControllers');
router.put('/change/doctor/info',verifyToken, controllerDoctorUpdate.saveInfoDoctorupdate);
router.put('/upload', verifyToken, uploadCertificate.array('Certificate', 6), controllerDoctorUpdate.Certificate);
router.put('/upload/images/delete', verifyToken, controllerDoctorUpdate.uplodaeProfileDelete);
// experience
router.post('/experience', verifyToken, controllerDoctorUpdate.newsExperience);
router.put('/update/post', verifyToken, controllerDoctorUpdate.newsUpdate);
// education
router.post('/education', verifyToken, controllerDoctorUpdate.Education);
router.put('/education/update', verifyToken, controllerDoctorUpdate.EducationUpdate);

module.exports = router;
