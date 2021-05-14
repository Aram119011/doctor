const {Router} = require('express');
const router = Router();

const calendarDoctor = require('../controllers/CalendarDoctor');
const verifyToken = require('../middlewares/jwtCompare');

router.get('/busy/day/all', verifyToken, calendarDoctor.busDayGet);
router.post('/busy/day', verifyToken, calendarDoctor.busDay);
router.put('/busy/day/update', verifyToken, calendarDoctor.busDayUpdate);
router.get('/busy/day/data', verifyToken, calendarDoctor.busyData);

module.exports = router;
