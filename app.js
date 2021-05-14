const express = require('express');
const cors = require('cors');
const morgan = require('morgan');


const app = express();


const Auth = require('./routes/auth');
const AutDoctor = require('./routes/authDoctor');
const AuthSendMail = require('./routes/AuthSendMail');
const forgotPassword = require('./routes/ForgotPassword');
const ProfileRoutes = require('./routes/AuthProfile');
const CalendarDay = require('./routes/authCalendarDay');
const Comment = require('./routes/AuthComent');


const ProfileDoctor = require('./routes/AuthDoctorProfile');
const Frends = require('./routes/Frends');
const Grups = require('./routes/grups');
const DoctorCalendar = require('./routes/doctorcalendar');
const http = require("http").Server(app);
const io = require("./Socket.io/SocketChat").listen(http);

// Reset
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use('/api/auth', Auth);
app.use('/api/authdoctor', AutDoctor);
app.use('/api/authsend', AuthSendMail);
app.use('/api/forgotPass', forgotPassword);
app.use('/api/profile', ProfileRoutes);
app.use('/api/profile/doctor', ProfileDoctor);
app.use('/api/friends', Frends);

//Groups
app.use('/api/event', Grups);
app.use('/api/post', Comment);
app.use('/uploads', express.static('uploads'));
app.use('/api/calendar', CalendarDay);
app.use('/api/doctor/calendar', DoctorCalendar);

app.use(express.static(__dirname + "/uploads"));


app.use((req, res, next) => {
    const err = new Error('Not found');
    err.status = 404;
    res.status(err.status).json({error: err.message});
    next();
});

app.use((err, req, res, next) => {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).json({error: err.message});
    next();
});


// const SocketService = require('./Socket.io/SocketFriends');
// const SocketChat = require('./Socket.io/SocketChat');


// const http = require("http").createServer(app);
// SocketService.init(http);

// SocketChat.init(http);

module.exports = http;

// server.listen(PORT, () => {
//     console.log("app is running on port: ", PORT);
//   });

