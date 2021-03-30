const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
var userProfile ;
passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
   
      done(null, user);
 
  });

passport.use(new GoogleStrategy({
    clientID: "802215900857-jc28s3g74g4gklhi1iipu2p6ghr9cc38.apps.googleusercontent.com",
    clientSecret: "udXrTJxp5zw7mVl0n9aW2G5y",
    callbackURL: "http://localhost:8000/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    userProfile = profile ;
      return done(null, userProfile);
 
  }
));
