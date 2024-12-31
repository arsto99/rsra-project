import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../../models/User';

const router = express.Router();

// تسجيل الدخول للمدير
router.post('/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email, role: 'admin' } });

    if (!user || !user.password) {
      return res.status(401).json({ message: 'بيانات غير صحيحة' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'بيانات غير صحيحة' });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'حدث خطأ في تسجيل الدخول' });
  }
});

// تسجيل الدخول باستخدام Google
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    const token = jwt.sign(
      { userId: req.user.id, role: req.user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000
    });

    res.send(`
      <script>
        window.opener.postMessage({ type: 'social_login_success' }, 'http://localhost:3002');
        window.close();
      </script>
    `);
  }
);

// تسجيل الدخول باستخدام Facebook
router.get('/facebook',
  passport.authenticate('facebook', { scope: ['email'] })
);

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    const token = jwt.sign(
      { userId: req.user.id, role: req.user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000
    });

    res.send(`
      <script>
        window.opener.postMessage({ type: 'social_login_success' }, 'http://localhost:3002');
        window.close();
      </script>
    `);
  }
);

// جلب بيانات المستخدم الحالي
router.get('/user', async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'غير مصرح' });
    }

    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'المستخدم غير موجود' });
    }

    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'حدث خطأ في جلب بيانات المستخدم' });
  }
});

// تسجيل الخروج
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  req.logout();
  res.json({ message: 'تم تسجيل الخروج بنجاح' });
});

export default router;
