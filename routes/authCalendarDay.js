const {Router} = require('express');
const router = Router();
const authCalendarDay = require('../controllers/authCalendarControllers');
const verifyToken = require('../middlewares/jwtCompare');

router.post('/description/day', verifyToken, authCalendarDay.DescriptionDay);
router.get('/description/all/days', verifyToken, authCalendarDay.DescriptionAll);
router.get('/description/day', verifyToken, authCalendarDay.DescriptionThatDay);
router.post('/users/days', verifyToken, authCalendarDay.MyDay);


module.exports = router;
