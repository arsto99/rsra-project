const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { adminPasswordHash } = require('../config/password');

// بيانات الأدمن
const ADMIN_EMAIL = 'ddfty543@gmail.com';
const ADMIN_PASSWORD_HASH = adminPasswordHash;

router.post('/login', async (req, res) => {
    console.log('=== بداية محاولة تسجيل دخول الأدمن ===');
    console.log('البيانات المستلمة:', req.body);
    
    const { email, password } = req.body;

    // التحقق من وجود البيانات
    if (!email || !password) {
        console.log('البيانات غير مكتملة');
        return res.status(400).json({
            success: false,
            message: 'يرجى إدخال البريد الإلكتروني وكلمة المرور'
        });
    }

    // التحقق من البريد الإلكتروني
    if (email !== ADMIN_EMAIL) {
        console.log('البريد الإلكتروني غير صحيح');
        return res.status(401).json({
            success: false,
            message: 'البريد الإلكتروني غير صحيح'
        });
    }

    try {
        // التحقق من كلمة المرور
        const isMatch = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
        
        if (!isMatch) {
            console.log('كلمة المرور غير صحيحة');
            return res.status(401).json({
                success: false,
                message: 'كلمة المرور غير صحيحة'
            });
        }

        console.log('البيانات صحيحة - إنشاء التوكن');
        
        // إنشاء رمز الدخول JWT
        const token = jwt.sign(
            { isAdmin: true },
            'your-secret-key',
            { expiresIn: '24h' }
        );

        console.log('تم إنشاء التوكن بنجاح');
        return res.json({
            success: true,
            token,
            message: 'تم تسجيل الدخول بنجاح'
        });
    } catch (error) {
        console.error('خطأ في السيرفر:', error);
        res.status(500).json({
            success: false,
            message: 'خطأ في السيرفر'
        });
    }
});

module.exports = router;
