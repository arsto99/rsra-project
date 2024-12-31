import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User';

// تكوين Facebook Strategy
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID || '',
    clientSecret: process.env.FACEBOOK_APP_SECRET || '',
    callbackURL: process.env.FACEBOOK_CALLBACK_URL || "http://localhost/api/auth/facebook/callback",
    profileFields: ['id', 'emails', 'name']
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const existingUser = await User.findOne({
        where: { facebookId: profile.id }
      });

      if (existingUser) {
        return done(null, existingUser);
      }

      // البحث عن مستخدم بنفس البريد الإلكتروني
      const email = profile.emails?.[0]?.value;
      if (email) {
        const userWithEmail = await User.findOne({
          where: { email }
        });

        if (userWithEmail) {
          // ربط حساب فيسبوك بالحساب الموجود
          userWithEmail.facebookId = profile.id;
          await userWithEmail.save();
          return done(null, userWithEmail);
        }
      }

      // إنشاء مستخدم جديد
      const newUser = await User.create({
        email: email,
        facebookId: profile.id,
        name: `${profile.name?.givenName} ${profile.name?.familyName}`,
      });

      done(null, newUser);
    } catch (error) {
      done(error as Error, undefined);
    }
  }
));

// تكوين Google Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackURL: process.env.GOOGLE_CALLBACK_URL || "http://localhost/api/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const existingUser = await User.findOne({
        where: { googleId: profile.id }
      });

      if (existingUser) {
        return done(null, existingUser);
      }

      // البحث عن مستخدم بنفس البريد الإلكتروني
      const email = profile.emails?.[0]?.value;
      if (email) {
        const userWithEmail = await User.findOne({
          where: { email }
        });

        if (userWithEmail) {
          // ربط حساب جوجل بالحساب الموجود
          userWithEmail.googleId = profile.id;
          await userWithEmail.save();
          return done(null, userWithEmail);
        }
      }

      // إنشاء مستخدم جديد
      const newUser = await User.create({
        email: email,
        googleId: profile.id,
        name: profile.displayName,
      });

      done(null, newUser);
    } catch (error) {
      done(error as Error, undefined);
    }
  }
));

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
