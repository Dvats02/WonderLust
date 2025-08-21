require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../Models/User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  }).catch(done);
});

passport.use(new GoogleStrategy(
  {
    // CORRECT: Use the environment variable NAME (key)
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Find the primary email for the user
      const email = profile.emails?.[0]?.value?.toLowerCase() || null;

      // Find a user by their Google ID, or by their email if they already have an account
      let user = await User.findOne({ googleId: profile.id }) ||
                 (email ? await User.findOne({ email }) : null);

      if (user) {
        // If user exists, update their Google info (like avatar or name) if it's missing
        if (!user.googleId) user.googleId = profile.id;
        if (!user.displayName) user.displayName = profile.displayName;
        if (!user.avatar) user.avatar = profile.photos?.[0]?.value;
        await user.save();
      } else {
        // If user does not exist, create a new one
        user = await User.create({
          googleId: profile.id,
          email: email,
          displayName: profile.displayName,
          avatar: profile.photos?.[0]?.value
        });
      }
      // Return the user profile
      return done(null, user);
    } catch (e) {
      // Return any errors
      return done(e, null);
    }
  }
));

module.exports = passport;
