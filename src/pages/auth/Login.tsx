import React, { useState } from 'react';
import PasswordStrength from '../../components/ui/PasswordStrength';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Alert from '../../components/ui/Alert';
import Card from '../../components/ui/Card';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });
  const [alert, setAlert] = useState<{
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
  } | null>(null);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: '', password: '' };

    if (!formData.email) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'البريد الإلكتروني غير صالح';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'كلمة المرور مطلوبة';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // TODO: Implement login logic
        console.log('Form submitted:', formData);
        setAlert({
          type: 'success',
          message: 'تم تسجيل الدخول بنجاح!'
        });
      } catch (error) {
        console.error('Login error:', error);
        setAlert({
          type: 'error',
          message: 'حدث خطأ أثناء تسجيل الدخول. الرجاء المحاولة مرة أخرى.'
        });
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (errors[e.target.name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
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
          title="تسجيل الدخول"
          subtitle="قم بتسجيل الدخول للوصول إلى لوحة التحكم"
          className="mt-4"
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <Input
                id="email"
                name="email"
                type="email"
                label="البريد الإلكتروني"
                placeholder="أدخل بريدك الإلكتروني"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                required
              />
              
              <Input
                id="password"
                name="password"
                type="password"
                label="كلمة المرور"
                placeholder="أدخل كلمة المرور"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                required
              />
            </div>

            <PasswordStrength password={formData.password} />

            <Button
              type="submit"
              variant="primary"
              fullWidth
            >
              تسجيل الدخول
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
