
let passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GoogleUser = require('../models/googleUser.model');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://firstcry-ix8k.onrender.com/google/callback",
    passReqToCallbaack: true
  },
  async function(accessToken, refreshToken, profile, done) {
      let userObj = {
            name: profile.displayName,
            email: profile.emails[0].value,
            login_type: 'google'
      }
      await GoogleUser.create(userObj);
      return done(null, profile);   
  }    
));
passport.serializeUser((user, done)=> {
    done(null, user);
})

passport.deserializeUser((user, done)=> {
    done(null, user);
})