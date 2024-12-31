const passport = require('passport');
const User = require('../models/User');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Serialize user for the session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user from the session
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findByPk(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

// Facebook Strategy
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['id', 'displayName', 'photos', 'email'],
    enableProof: true
}, async (accessToken, refreshToken, profile, done) => {
    console.log('Facebook profile:', profile);
    try {
        let user = await User.findOne({ where: { facebookId: profile.id } });

        if (!user) {
            user = await User.create({
                facebookId: profile.id,
                name: profile.displayName,
                email: profile.emails ? profile.emails[0].value : null,
                profilePicture: profile.photos ? profile.photos[0].value : null,
                provider: 'facebook',
                verified: true
            });
        }

        return done(null, user);
    } catch (error) {
        console.error('Error in Facebook strategy:', error);
        return done(error, null);
    }
}));

// تكوين استراتيجيات المصادقة فقط إذا كانت معرفات OAuth متوفرة
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        proxy: true
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findOne({ where: { googleId: profile.id } });

            if (!user) {
                user = await User.create({
                    googleId: profile.id,
                    email: profile.emails[0].value,
                    name: profile.displayName,
                    profilePicture: profile.photos[0].value,
                    provider: 'google'
                });
            }

            return done(null, user);
        } catch (error) {
            return done(error, null);
        }
    }));
} else {
    console.log('Google OAuth credentials not found. Google authentication will not be available.');
}

module.exports = passport;
