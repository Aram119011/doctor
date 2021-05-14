const {Router} = require('express');
const router =Router();
const GroupPicture = require('../middlewares/UploadGroup');
const validatorGroup = require('../validator/validateGroup');
const AuthGrups = require('../controllers/AuthGrups');

router.post('/grups',  GroupPicture.single('GroupPicture'), validatorGroup.rules,  AuthGrups.grupsPost);
router.delete('/groups/:id', AuthGrups.grupsDelete);
router.get('/groupss/:id', AuthGrups.getGroupss);

module.exports = router;
