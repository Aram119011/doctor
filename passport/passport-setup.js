const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const config = require('../config/keys');

passport.use(new GoogleStrategy({
        clientID: '704933951753-iop7kf33o2nrgad96ks5rd0tr2a1',
        clientSecret: '7ThJWTdVYXwHMOZnK-VnYB-9',
        callbackURL: "http://www.example.com/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
            return done(err, user);
        });
    }
));
