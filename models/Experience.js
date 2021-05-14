const {Schema, model} = require('mongoose');


const Experience = new Schema({
    UserId: {
        type: Schema.Types.ObjectId
    },
    companyName: String,
    startDate: String,
    present: String,
    endDate: String
});


module.exports = model('Experience', Experience);
