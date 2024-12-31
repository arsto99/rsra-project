const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const sequelize = require('../db/connection');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

// إعداد Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Google OAuth Routes
router.get('/google',
  (req, res, next) => {
    try {
      passport.authenticate('google', { 
        scope: ['profile', 'email'],
        accessType: 'offline',
        prompt: 'consent'
      })(req, res, next);
    } catch (error) {
      console.error('Error initiating Google OAuth:', error);
      res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_init_failed`);
    }
  }
);

router.get('/google/callback',
  (req, res, next) => {
    passport.authenticate('google', { 
      failureRedirect: `${process.env.FRONTEND_URL}/login`,
      session: false 
    }, async (err, user, info) => {
      if (err) {
        console.error('Google authentication error:', err);
        return res.redirect(`${process.env.FRONTEND_URL}/login?error=${encodeURIComponent(err.message)}`);
      }

      if (!user) {
        console.error('Google authentication failed:', info);
        return res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);
      }

      try {
        const token = jwt.sign(
          { 
            userId: user.id, 
            role: user.role,
            provider: 'google'
          },
          process.env.JWT_SECRET,
          { expiresIn: '24h' }
        );

        // تحديث آخر تسجيل دخول
        await user.update({ 
          lastLogin: new Date(),
          lastLoginProvider: 'google'
        }).catch(err => {
          console.error('Error updating last login:', err);
        });

        // تخزين التوكن في كوكي آمن
        res.cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });

        res.redirect(`${process.env.FRONTEND_URL}/dashboard?token=${token}`);
      } catch (error) {
        console.error('Error in Google callback:', error);
        res.redirect(`${process.env.FRONTEND_URL}/login?error=server_error`);
      }
    })(req, res, next);
  }
);

// Facebook OAuth Routes
router.get('/facebook', (req, res, next) => {
  console.log('Starting Facebook authentication...');
  try {
    console.log('Facebook auth config:', {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: '***',
      callbackURL: process.env.FACEBOOK_CALLBACK_URL
    });
    
    passport.authenticate('facebook', {
      scope: ['public_profile', 'email'],
      authType: 'rerequest',
      auth_type: 'rerequest'
    })(req, res, next);
  } catch (error) {
    console.error('Error initiating Facebook OAuth:', error);
    res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_init_failed`);
  }
});

router.get('/facebook/callback', (req, res, next) => {
  passport.authenticate('facebook', {
    session: false,
    failureMessage: true
  }, async (err, user, info) => {
    if (err) {
      console.error('Facebook authentication error:', err);
      return res.redirect(`${process.env.FRONTEND_URL}/login?error=${encodeURIComponent(err.message)}`);
    }

    if (!user) {
      console.error('Facebook authentication failed:', info);
      return res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);
    }

    try {
      const token = jwt.sign(
        {
          userId: user.id,
          role: user.role,
          provider: 'facebook'
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      // تحديث آخر تسجيل دخول
      await user.update({
        lastLogin: new Date(),
        lastLoginProvider: 'facebook'
      }).catch(err => {
        console.error('Error updating last login:', err);
      });

      // تخزين التوكن في كوكي آمن
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
      });

      res.redirect(`${process.env.FRONTEND_URL}/dashboard?token=${token}`);
    } catch (error) {
      console.error('Error in Facebook callback:', error);
      res.redirect(`${process.env.FRONTEND_URL}/login?error=server_error`);
    }
  })(req, res, next);
});

// تسجيل الدخول العادي
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const token = jwt.sign(
      { 
        userId: user.id, 
        role: user.role,
        provider: user.provider 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });

    await user.update({ lastLogin: new Date() });

    return res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        profilePicture: user.profilePicture,
        provider: user.provider
      },
      message: 'Login successful'
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// تسجيل حساب جديد
router.post('/register', async (req, res) => {
  const { name, username, email, password } = req.body;

  try {
    // التحقق من وجود المستخدم
    const existingUser = await User.findOne({ 
      where: { 
        [sequelize.Op.or]: [
          { email },
          { username }
        ]
      } 
    });
    
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'البريد الإلكتروني أو اسم المستخدم مسجل مسبقاً'
      });
    }

    // إنشاء رمز التحقق
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const verificationCodeExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 ساعة

    // إنشاء المستخدم
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
      verificationCode,
      verificationCodeExpires,
      isVerified: false
    });

    // إرسال رمز التحقق عبر البريد
    await sendVerificationEmail(email, verificationCode);

    res.status(201).json({
      success: true,
      message: 'تم إنشاء الحساب بنجاح. يرجى التحقق من بريدك الإلكتروني'
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في الخادم'
    });
  }
});

// التحقق من البريد الإلكتروني
router.post('/verify-email', async (req, res) => {
  const { code } = req.body;

  try {
    const user = await User.findOne({
      where: {
        verificationCode: code,
        verificationCodeExpires: {
          [sequelize.Op.gt]: new Date()
        },
        isVerified: false
      }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired verification code'
      });
    }

    await user.update({
      isVerified: true,
      verificationCode: null,
      verificationCodeExpires: null
    });

    res.json({
      success: true,
      message: 'Email verified successfully'
    });

  } catch (error) {
    console.error('Error in email verification:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// إعادة إرسال رمز التحقق
router.post('/resend-verification', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user || user.isVerified) {
      return res.status(400).json({
        success: false,
        message: 'Invalid request'
      });
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const verificationCodeExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await user.update({
      verificationCode,
      verificationCodeExpires
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'رمز التحقق الجديد - RSAR',
      html: `
        <div style="direction: rtl; text-align: right;">
          <h2>مرحباً ${user.name}،</h2>
          <p>تم إرسال رمز تحقق جديد. يرجى إدخال الرمز التالي:</p>
          <h1 style="font-size: 32px; letter-spacing: 5px;">${verificationCode}</h1>
          <p>ينتهي هذا الرمز خلال 24 ساعة.</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: 'Verification code sent successfully'
    });

  } catch (error) {
    console.error('Error in resending verification code:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// تسجيل الخروج
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ success: true, message: 'Logged out successfully' });
});

// ربط حساب Google
router.get('/link/google',
  passport.authenticate('google', { 
    scope: ['profile', 'email'],
    successRedirect: `${process.env.FRONTEND_URL}/dashboard`,
    failureRedirect: `${process.env.FRONTEND_URL}/login`
  })
);

// ربط حساب Facebook
router.get('/link/facebook',
  passport.authenticate('facebook', { 
    scope: ['email'],
    successRedirect: `${process.env.FRONTEND_URL}/dashboard`,
    failureRedirect: `${process.env.FRONTEND_URL}/login`
  })
);

// استرجاع معلومات المستخدم الحالي
router.get('/me', async (req, res) => {
  try {
    const token = req.header('x-auth-token');
    if (!token) {
      return res.status(401).json({ message: 'No token, access denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      profilePicture: user.profilePicture,
      facebookLinked: !!user.facebookId,
      googleLinked: !!user.googleId
    });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

module.exports = router;
