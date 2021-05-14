const {Router} = require('express');
const router = Router();

const friendsControllers = require('../controllers/frendsControllers');

router.post('/addFriend', friendsControllers.frends);
router.put('/accept', friendsControllers.accept)
router.put('/ignore',friendsControllers.ignore)
router.get('/user_friends', friendsControllers.friendsAll);


module.exports = router;

