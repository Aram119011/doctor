const {Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs');
// const moment = require('moment'); // require
// moment().format();

const imageEnum = {
    defaultImage: 'default.png'
};
// const dataMessage = {
//     data: moment("MM-DD-YYYY")
// };

let arrayOfWeekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];


const UserSchema = new Schema({
    fullName: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    professionalLicenseNumber: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    newCode: {
        type: String
    },
    myPhoto: {
        type: String,
        default: imageEnum.defaultImage
    },
    about: {
        type: String
    },
    /////////////////
    // source: {
    //     card_id: []
    // },

    customer_id: {
        type: String
    },
    cardId: {
        type: String
    },
    name:{
        type: String
    },
    last4:{
        type: String
        // default:'*************'
    },
    exp_month:{
      type: String
    },
    exp_year:{
      type: String
    },


    // terapeft
    // name:{
    //   type: String
    // },
    companyName: {
        type: String
    },
    startDate: {
        type: String
    },
    present: {
        type: String
    },
    endDate: {
        type: String
    },

    // Education
    educationUniversityOrCollage: {
        type: String
    },
    educationStartDate: {
        type: String
    },
    educationPresent: {
        type: String
    },
    educationEndDate: {
        type: String
    },
    certificateUpload: {
        type: [String]
    },
    addFriend: [{
        type: Schema.Types.ObjectId
    }],
    friendNotification: [{
        type: Schema.Types.ObjectId
    }],
    acceptFriend: [{
        type: Schema.Types.ObjectId
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    IgnoreFriendsList: [{
        type: Schema.Types.ObjectId
    }],
    doctor: {
        type: Boolean,
        default: false
    },

    eventAdmin: [{
        type: Schema.Types.ObjectId,
        ref: 'UserGroup'
    }],

    userPostAcceptNotification: [{
        // type:Schema.Types.ObjectId,
        // ref:'User'
    }],

    userInvaiedId: [{
        // type:Schema.Types.ObjectId
        // type:String
    }],

    userPostAccept: [{}],
    userValid: [{}],




});


UserSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt)
};


UserSchema.methods.validatePassword = function (password) {
    return bcrypt.compare(password, this.password)
};

module.exports = model('User', UserSchema);
