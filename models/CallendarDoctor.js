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



const UserTherapist = new Schema({
    _id: {
        type: Schema.Types.ObjectId
    },
    weekDay: [{
        enum:arrayOfWeekdays,
        startTime:String,
        endTime:String
    }]
});

module.exports = model('UserTherapist', UserTherapist);
