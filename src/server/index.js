const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const authRouter = require('./routes/auth');
const sequelize = require('./config/database');

// تكوين Passport
require('./config/passport');

const app = express();

// إعدادات CORS
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));

// ميدلوير
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// تكوين الجلسات
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-session-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// تهيئة Passport
app.use(passport.initialize());
app.use(passport.session());

// الملفات الثابتة
app.use(express.static('public'));

// المسارات
app.use('/api/auth', authRouter);

// اختبار الاتصال بقاعدة البيانات
sequelize.authenticate()
    .then(() => {
        console.log('Database connection has been established successfully.');
        
        // مزامنة النماذج مع قاعدة البيانات
        sequelize.sync()
            .then(() => {
                console.log('Database synchronized successfully.');
            })
            .catch((error) => {
                console.error('Error synchronizing database:', error);
            });
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });

// تشغيل الخادم
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
