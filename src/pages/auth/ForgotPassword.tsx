import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Alert from '../../components/ui/Alert';
import Card from '../../components/ui/Card';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [alert, setAlert] = useState<{
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
  } | null>(null);

  const validateForm = () => {
    if (!email) {
      setError('البريد الإلكتروني مطلوب');
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError('البريد الإلكتروني غير صالح');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // TODO: Implement password reset logic
        console.log('Reset password for:', email);
        setAlert({
          type: 'success',
          message: 'تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني'
        });
      } catch (error) {
        console.error('Password reset error:', error);
        setAlert({
          type: 'error',
          message: 'حدث خطأ أثناء إرسال رابط إعادة تعيين كلمة المرور. الرجاء المحاولة مرة أخرى.'
        });
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) {
      setError('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}
        
        <Card
          title="نسيت كلمة المرور"
          subtitle="أدخل بريدك الإلكتروني وسنرسل لك رابطاً لإعادة تعيين كلمة المرور"
          className="mt-4"
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              id="email"
              name="email"
              type="email"
              label="البريد الإلكتروني"
              placeholder="أدخل بريدك الإلكتروني"
              value={email}
              onChange={handleChange}
              error={error}
            />

            <div>
              <Button type="submit" fullWidth>
                إرسال رابط إعادة التعيين
              </Button>
            </div>

            <div className="text-center space-y-2">
              <Link
                to="/login"
                className="block text-sm text-blue-600 hover:text-blue-800"
              >
                تذكرت كلمة المرور؟ سجل دخولك
              </Link>
              <Link
                to="/register"
                className="block text-sm text-blue-600 hover:text-blue-800"
              >
                ليس لديك حساب؟ سجل الآن
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
