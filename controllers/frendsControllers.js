const User = require('../models/user');




module.exports.frends = async (req, res) => {
    try {
        const {id, friendId} = req.body;
        await User.updateOne({_id: friendId},
            {$push: {friendNotification: id}});

        await User.updateOne({_id: id},
            {$push: {addFriend: friendId}}
            );
        res.status(201).send('You are request to add a new friend!')
    } catch (e) {
        res.status(500).json({
            msg: 'this addFriend no'
        })
    }
}


module.exports.accept = async (req, res) => {
    try {
        const {id, friendId} = req.body;
        await User.updateOne({_id: id},
            {$push: {friends: friendId}},
            {$pull: {friendNotification: ''}}
        );
        await User.updateOne({_id: friendId},
            {$push: {friends: id}},
            {$pull: {friendNotification: ''}}
        );
        res.status(201).send('You are request to add a new friend!')
    } catch (e) {
        res.status(500).send('this addFriend no')
    }
};

module.exports.ignore = async (req, res) => {
    try {
        const {id, friendId} = req.params;
        const userUpdate = await User.updateOne({
            _id: id,
            acceptFriend: friendId,
            delete: false,
            block: false
        }, {
            $pull: {acceptFriend: friendId}
        });
        if (userUpdate.nModified === 0) {
            res.status(409).json({msg: 'Dont find this user!'})
        }
        const acceptUpdate = await User.updateOne({_id: friendId, addFriend: id, delete: false, block: false}, {
            $pull: {addFriend: id}
        });
        if (acceptUpdate.nModified === 0) {
            res.status(408).json({msg: 'Dont find this user!'})
        }
        res.status(201).send('are ignored!')
    } catch (e) {
        res.status(500).send('this addFriend no')
    }
};

module.exports.friendsAll = async (req,res)=>{
    try{
      let friendAll =  await User.findOne({_id: req.body.id}).select('friends').populate('friends',['fullName','email','myPhoto','doctor']);
        console.log(friendAll);
        res.status(201).json({
            msg:'friends All',
            friendAll
        })
    }catch (e) {
        console.log(e,'lll');
        res.status(408).send('error')
    }

};
