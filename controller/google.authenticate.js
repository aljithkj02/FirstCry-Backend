let passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/google/callback",
    passReqToCallbaack: true
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile) 
       return done(null, profile);   
  }    
));
passport.serializeUser((user, done)=> {
    done(null, user);
})

passport.deserializeUser((user, done)=> {
    done(null, user);
})