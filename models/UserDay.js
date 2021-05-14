const {Schema, model} = require('mongoose');



const UserDay = new Schema({
    UserId: {
        type: Schema.Types.ObjectId
    },
    Day: [{
        description_day: String,
        smiley: String,
        data: Date
    }]
});


module.exports = model('UserDay', UserDay);
