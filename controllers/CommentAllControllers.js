const Group = require('../models/GrupUser');
const User = require('../models/user')

module.exports.allComment = async (req, res) => {
    try {
        let commentAll = await Group.findOne({_id: req.body.id}).select('CommentPost').populate('CommentPost');
        console.log(commentAll, 'commentAll');
        res.status(201).json({
            msg: 'success',
            commentAll
        })
    } catch (e) {
        res.status(409).send('error')
    }

};


module.exports.DeleteComment = async (req, res) => {
    try {
        let user = await User.findOne({_id: req.body.userId}).select(['fullName', 'email', 'myPhoto', 'doctor']);
        console.log(user, 'user');
        let post = await Group.findOne({_id: req.body.postId});
        let AllComment = post.CommentPost;
        let {
            fromId,
            commentId,
            adminUser
        }= req.body;

        let RemoveComment = AllComment.find((item) => {
            return (item._id !== commentId && item.fromId !== fromId)
        });
        // console.log(RemoveComment,'RemoveComment+++++++++++++');
        console.log(typeof adminUser,'llllll');
        console.log(typeof fromId,'llllll');
        console.log(typeof post.adminUser.toString(),'jjjjjjjjjjjjjjj');
        // console.log(adminUser == post.adminUser, 'havasar en');
        console.log(fromId === RemoveComment.fromId.toString(),'asfhsdhfgsdhg');
        if(fromId === RemoveComment.fromId.toString() || adminUser === post.adminUser.toString()){
            console.log('ADMINIS NODEMIN');
            let comments = post.CommentPost.filter((item)=>RemoveComment._id !== item._id);
            console.log(comments,'kkkk');

            post.CommentPost= comments;
            post.save()
        }
        res.status(201).json({
            msg: 'ok',
        })

    } catch (e) {
        res.status(409).json({
            msg: 'error'
        })
    }
};
