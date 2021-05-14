const {Schema, model} = require('mongoose');


let arrayOfWeekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

const UserBusy = new Schema({
    _id: {
        type: Schema.Types.ObjectId
    },
    weekDay: [{
        enum:arrayOfWeekdays,
        startTime:String,
        endTime:String,
        data: String
    }]
});

module.exports = model('UserBusy', UserBusy);
