const {Router} = require('express');
const  router = Router();

const CommentControllers = require('../controllers/CommentAllControllers');
const verifyToken = require('../middlewares/jwtCompare');

router.get('/CommentAll', CommentControllers.allComment);
router.delete('/CommentDelete', verifyToken, CommentControllers.DeleteComment);


module.exports = router;
