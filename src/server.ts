import express from 'express';
import path from 'path';
import cors from 'cors';
import adminAuthRouter from './server/routes/admin.auth';
import passport from 'passport';
import './config/passport';
import User from './models/User'; // Assuming you have a User model

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../dist')));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user: any, done: any) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done: any) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    next();
});

// Routes
app.use('/api/auth/admin', adminAuthRouter);

// Google OAuth routes
app.get('/api/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/api/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  }
);

// Facebook OAuth routes
app.get('/api/auth/facebook',
  passport.authenticate('facebook', { scope: ['email'] })
);

app.get('/api/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  }
);

// Privacy Policy
app.get('/privacy-policy', (req, res) => {
  res.redirect('https://arsto99.github.io/RSAR-policies/privacy-policy.html');
});

// Terms of Service
app.get('/terms-of-service', (req, res) => {
  res.redirect('https://arsto99.github.io/RSAR-policies/terms-of-service.html');
});

// Data Deletion Instructions
app.get('/data-deletion', (req, res) => {
  res.redirect('https://arsto99.github.io/RSAR-policies/data-deletion.html');
});

// Serve the login page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('خطأ في السيرفر:', err);
    res.status(500).json({
        success: false,
        message: 'خطأ في السيرفر'
    });
});

const PORT = 2003;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});
