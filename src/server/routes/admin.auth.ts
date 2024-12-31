import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { adminPasswordHash } from '../config/password';

const router = Router();

// بيانات الأدمن
const ADMIN_EMAIL = 'ddfty543@gmail.com';
const ADMIN_PASSWORD_HASH = adminPasswordHash;

router.post('/login', async (req: Request, res: Response) => {
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

// وسيط حماية مسارات الأدمن
export const adminAuth = (req: Request, res: Response, next: express.NextFunction) => {
    const token = req.header('x-auth-token');
    
    if (!token) {
        return res.status(401).json({ message: 'لا يوجد توكن، الدخول مرفوض' });
    }

    try {
        const decoded = jwt.verify(token, 'your-secret-key');
        if (!(decoded as any).isAdmin) {
            return res.status(401).json({ message: 'غير مصرح للمستخدم' });
        }
        (req as any).admin = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'توكن غير صالح' });
    }
};

export default router;
