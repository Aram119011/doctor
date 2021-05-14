const {Router} = require('express');
const router = Router();
const verifyToken = require('../middlewares/jwtCompare');

const controllerUpdate = require('../controllers/profileControllers');
const multer = require('../middlewares/multer');


const validatePaypal = require('../validator/validatePaypal');


const validatorChangepassword = require('../validator/validateChangepassword');
const validatorChangeinfo = require('../validator/validatorChangeinfo');
const validateChangepassword = require('../validator/validateChangepassword');




router.put('/changeinfo/:id', verifyToken,  validatorChangeinfo.rules,  controllerUpdate.saveInfoupdate);
router.put('/changepassword',  validateChangepassword.rules,  controllerUpdate.savePasswordNew);


router.post('/uploadimg', verifyToken, multer.single('myPhoto'), controllerUpdate.uplodaeProfile);
router.put('/uploadimg/delete/:id', verifyToken, controllerUpdate.uplodaeProfileDelete);

//Create
router.put('/paymentSystem', controllerUpdate.paymentSystem);
router.get('/paymentSystem/get', verifyToken, controllerUpdate.paymentSystemGet);
router.put('/paymentSystem/update', verifyToken, controllerUpdate.paymentSystemUpdate);
router.delete('/paymentSystem/delete', verifyToken, controllerUpdate.paymentSystemDelete);

module.exports = router;
