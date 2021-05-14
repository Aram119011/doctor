const socketio = require("socket.io");
const User = require('../models/user');
const UserChat = require('../models/userChat');
const Group = require('../models/GrupUser');




module.exports.listen = (app) => {
    io = socketio.listen(app);

    io.on("connection", (socket) => {
        console.log(`new connection id: ${socket.id}`);
        socket.on("sendNotification", async (data) => {
            console.log(data.userID, 'jjjj');
            const me = await User.findOne({_id: data.id}).select("addFriend");
            const isSend = me.addFriend.includes(data.userID);
            if (isSend) {
                console.log('You have been sent a friend request!');
                socket.emit('FriendsId', {data: 'You have been sent a friend request!'})
            } else {
                await User.updateOne({_id: data.userID},
                    {$push: {friendNotification: data.id}});

                await User.updateOne({_id: data.id},
                    {$push: {addFriend: data.userID}}
                );
            }
        });


        socket.on('acceptFriends', async (data) => {
            let MeacceptFriends = await User.findOne({_id: data.id}).select("friends");
            let isSendMeacceptFriends = MeacceptFriends.friends.includes(data.userID);
            if (isSendMeacceptFriends) {
                console.log('Friend request - already sent!');
                socket.emit('FriendsId', {data: 'Friend request - already sent!'})
            } else {
                await User.updateOne({_id: data.id},
                    {$push: {friends: data.userID}}
                );
                await User.updateOne({_id: data.id},
                    {$pull: {addFriend: data.userID}}
                );
                await User.updateOne({_id: data.userID},
                    {$push: {friends: data.id}}
                );
                await User.updateOne({_id: data.userID},
                    {$pull: {friendNotification: data.id}}
                );
            }
        });

        socket.on('getMyFriendsList', async (data) => {
            const myFriends = await User.findOne({_id: data.id}).select("friends")
            let friendListArray = [];
            for (let i = 0; i < myFriends.friends.length; i++) {
                const friend = await User.findOne({_id: myFriends.friends[i]});
                friendListArray.push(friend)
            }
        });
        socket.on('IgnoreFriends', async (data) => {
            const meIgnoreFriends = await User.findOne({_id: data.id}).select("friends");
            const isSendIgnoreFriends = meIgnoreFriends.friends.includes(data.userID);
            if (isSendIgnoreFriends) {
                console.log('Friend request-not accepted!');
                socket.emit('FriendsId', {data: 'Friend request-not accepted!'})
            } else {
                //id
                await User.updateOne({_id: data.id},
                    {$pull: {addFriend: data.userID}});
                //userId
                await User.updateOne({_id: data.userID},
                    {$pull: {friendNotification: data.id}});
            }
        });
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //Chat
        socket.on('sendMessage', async (data) => {
            console.log('message =>', data);
            socket.emit('eventClient', {data: 'Hello Client'});
            socket.broadcast.emit('message', 'A user has joined the chat');
            socket.emit('msgEmit', {data: data});
            let chatFind = await UserChat.findOne({$and: [{userId: data.userId}, {clientId: data.clientId}]})
                .catch(err => {
                    console.log(err);
                });
            if (chatFind === null) {
                let chat = new UserChat({
                    userId: data.userId,
                    clientId: data.clientId,
                    message: [{
                        messages: data.messages,
                        fromId: data.fromId,
                        toId: data.toId,
                        data: new Date()
                    }]
                });
                chat.save()
            } else {
                try {
                    let chatUpdate = await UserChat.updateOne({$and: [{userId: data.userId}, {clientId: data.clientId}]}, {
                        $push: {
                            message: {
                                messages: data.messages,
                                fromId: data.fromId,
                                toId: data.toId,
                                data: new Date()
                            }
                        }
                    });
                    console.log(chatUpdate, 'chatUpdate');
                } catch (e) {
                    console.log(e, 'error')
                }
            }
        });


        socket.on('uploaded', (dataImg)=> {
            console.log('uploaded', dataImg);
            socket.emit('addImage','Image Compartida', dataImg);
        });

        socket.on('getAll', async (data) => {
            try {
                let ChatGetAll = await UserChat.findOne({
                    $and: [{userId: data.userId},{clientId: data.clientId}]})
                    .populate(["userId","clientId"]);
                console.log(ChatGetAll,  'ChatGetAll')
            } catch (e) {
                console.log(e)
            }
        });


/////////////#######################################################???????????????????????????????????????
//             const userID = socket.decoded._id;
//             const id = socket.id;
//             socketIDsObject[userID] = id;
//
//             socket.on("message", async (friendID, message) => {
//                 //  socketIDsObject[friendID]
//                 socket.broadcast
//                     .to(socketIDsObject[friendID])
//                     .emit("newMessage", message);
//             });
//
//             socket.on("disconnect", async () => {
//                 console.log("user disconnected");
//             });
/////////////#######################################################???????????????????????????????????????







        //   socket.on("message", async (friendID, message) => {
        //     //  socketIDsObject[friendID]
        //     // socket.broadcast
        //     //   .to(socketIDsObject[friendID])
        //     //   .emit("newMessage", message);
        //   });

        //   socket.on("disconnect", async () => {
        //     console.log("user disconnected");
        //   });


        socket.on('acceptPostNotification', async (data) => {
            socket.emit('PostId', {data: 'PostId!'});

            let myUser = await User.findOne({_id: data.id});
            let condition = false;
            myUser.userInvaiedId.forEach((a) => {
                a._id == data.userID
                condition = true

            });
            if (!condition) {
                console.log(data.id, 'data.id');
                await User.updateOne({_id: data.id}, {
                    $push: {
                        userInvaiedId: {_id: data.userID, GroupId: data.GroupId}
                    }
                });


                let findUsers = await User.updateOne({_id: data.userID}, {
                    $push: {
                        userPostAcceptNotification: {_id: data.id, GroupId: data.GroupId}
                    }
                });

                console.log(myUser, findUsers, 'myUser')
            } else {
                console.log("duq arden friergkrtyijh");
            }

        });


        socket.on('IgnorePost', async (data) => {
            socket.emit('PostId', {data: 'PostId!'});
            let userReject = await User.update({_id: data.userID},
                {
                    $pull: {
                        userPostAcceptNotification: {$and: [{GroupId: data.GroupId}, {_id: data.id}]}
                    }

                });
            let userRejectId = await User.update({_id: data.id},
                {
                    $pull: {
                        userInvaiedId: {$and: [{GroupId: data.GroupId}, {_id: data.userID}]}
                    }
                });

            console.log(userReject, userRejectId, 'userReject');
        });


        socket.on('acceptPost', async (data) => {
            console.log(data, 'data');
            socket.emit('PostId', {data: 'PostId!'});
            let userResolve = await User.updateOne({_id: data.userID}, {
                $push: {
                    userPostAccept: {_id: data.id, GroupId: data.GroupId}
                }
            });
            let userResolve1 = await User.updateOne({_id: data.userID}, {
                $pull: {
                    userPostAcceptNotification: {$and: [{GroupId: data.GroupId}, {_id: data.id}]}
                }

            });
            let userResolve2 = await User.updateOne({_id: data.id}, {
                $push: {
                    userValid: {_id: data.userID, GroupId: data.GroupId}
                }
            });
            let userResolve2pull = await User.updateOne({_id: data.id}, {
                $pull: {
                    userInvaiedId: {$and: [{_id: data.userID}, {GroupId: data.GroupId}]}

                }
            });
            console.log(userResolve2pull, userResolve2, 'userResolve2');
            let userResolveuser = await Group.updateOne({_id: data.GroupId}, {
                $push: {
                    addGroupUser: {_id: data.userID}
                }
            });
            console.log(userResolveuser, 'userResolveuser');
        });

        socket.on('Comment', async (data) => {
            console.log(data, 'hello');
            socket.emit('Mycomment', {data: 'how comment'});

            let GroupPostComment = await Group.updateOne({_id: data.CommentPost}, {
                $push: {
                    CommentPost: {
                        messages: data.messages,
                        fromId: data.fromId,
                        data: new Date()
                    }
                }
            });
            console.log(GroupPostComment, 'GroupPostComment');
        });


        /////////////////////////////////////////////////////accept therapy user
        socket.on('acceptTherapy', async (data)=>{
           console.log('acceptTherapy');
            socket.emit('', {data: 'how comment'});
        });

        socket.on("disconnect", async () => {
            console.log("user disconnect");
        });
    });

    return io;
};
