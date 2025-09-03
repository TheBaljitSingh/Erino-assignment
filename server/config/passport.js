import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';
import User from '../models/user.js';
import { configDotenv } from 'dotenv';

configDotenv({path:".env"});


// understand this one

//req.session.passport.user - it stores id only
passport.serializeUser(function(user, done) {
  done(null, user);
});


passport.deserializeUser(async function(id, done) {

    await User.findById(id, (err, user)=>{
        done(err, user);
    });
});



passport.use(new GoogleStrategy({

    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CALLBACKuRL
  },
  async function(accessToken, refreshToken, profile, cb) {

    /*
    if user is already in my db then update its info,
    else create a user with its details

    */
    try {
        console.log(profile);
        let user = await User.findOneAndUpdate({email: profile.emails[0].value});

        if(!user){
            user = await User.create({
                name:profile.displayName,
                googleId: profile.id,
                email: profile.emails[0].value,
            })
        }

        return cb(null, user);

        
    } catch (err) {
        console.log(err);
        return cb(err, null);
    }

  }
));

export default passport;