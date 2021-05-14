const {Schema, model} = require('mongoose');

const UserEvent = new Schema({

    groupName: {
        type: String
    },
    ChooseCategory: {
        type: String
    },
    GroupDescription: {
        type: String
    },
    GroupPicture: {
        type: String,
        default:"therapist.jpg"
    },
    adminUser:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    // comment
    CommentPost:[{
        fromId: Schema.Types.ObjectId,
        messages: String,
        data: Date
    }],

    addGroupUser:[{

    }]
});

module.exports = model('UserGroup', UserEvent);
