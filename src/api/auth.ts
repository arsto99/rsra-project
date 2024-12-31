import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost/api',
    withCredentials: true
});

export const loginAdmin = async (email: string, password: string) => {
    try {
        const response = await api.post('/auth/admin/login', {
            email,
            password
        });
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data.message);
        }
        throw new Error('حدث خطأ في الاتصال بالسيرفر');
    }
};

export const loginWithGoogle = async () => {
    try {
        const response = await api.get('/auth/google');
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data.message);
        }
        throw new Error('حدث خطأ في تسجيل الدخول باستخدام Google');
    }
};

export const loginWithFacebook = async () => {
    try {
        const response = await api.get('/auth/facebook');
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data.message);
        }
        throw new Error('حدث خطأ في تسجيل الدخول باستخدام Facebook');
    }
};

export const getCurrentUser = async () => {
    try {
        const response = await api.get('/auth/user');
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data.message);
        }
        throw new Error('حدث خطأ في جلب بيانات المستخدم');
    }
};

export const logout = async () => {
    try {
        const response = await api.post('/auth/logout');
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data.message);
        }
        throw new Error('حدث خطأ في تسجيل الخروج');
    }
};

export const register = async (userData: { name: string; username: string; email: string; password: string }) => {
    try {
        const response = await api.post('/auth/register', userData);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data.message);
        }
        throw new Error('حدث خطأ في عملية التسجيل');
    }
};
