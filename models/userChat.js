const {Schema, model} = require('mongoose');


const UserChatSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    clientId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    message:[{
        messages: String,
        img:[String],
        fromId:Schema.Types.ObjectId,
        toId:Schema.Types.ObjectId,
        data: Date
    }]
});



module.exports = model('UserChat', UserChatSchema);
