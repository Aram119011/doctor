const {Schema, model} = require('mongoose');


const Education = new Schema({
    UserId: {
        type: Schema.Types.ObjectId
    },
    educationUniversity: String,
    educationStartDate:String,
    educationPresent:String,
    educationEndDate: String
});

module.exports = model('Education', Education);
