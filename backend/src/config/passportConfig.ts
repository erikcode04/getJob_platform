import passport from 'passport';
import dotenv from 'dotenv';
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from 'passport-google-oauth20';
import User, { IUser } from '../models/userSchema';


dotenv.config();

try {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackURL: "http://localhost:5000/auth/google/callback",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
  }, async (accessToken: string, refreshToken: string, profile: Profile, cb: VerifyCallback) => {
    const user: IUser = await User.findOneAndUpdate(
      { id: profile.id },
      {
        id: profile.id,
        displayName: profile.displayName,
        email: profile.emails ? profile.emails[0].value : '',
        profilePicture: profile.photos ? profile.photos[0].value : '',
      },
      { new: true, upsert: true }
    );
    return cb(null, user);
  }));


passport.serializeUser((user, done) => {
    done(null, user);
  });


  passport.deserializeUser((obj:Express.User, done) => {
    done(null, obj);
  });
} catch (error) {
  console.error(error);
  }
export default passport;
