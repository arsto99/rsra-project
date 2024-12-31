import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Alert from '../../components/ui/Alert';
import Card from '../../components/ui/Card';

const EmailVerification = () => {
  const { token } = useParams();
  const [verificationStatus, setVerificationStatus] = useState<{
    type: 'success' | 'error' | 'info';
    message: string;
  }>({
    type: 'info',
    message: 'جارٍ التحقق من بريدك الإلكتروني...'
  });

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // TODO: Implement email verification logic with token
        console.log('Verifying email with token:', token);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        setVerificationStatus({
          type: 'success',
          message: 'تم التحقق من بريدك الإلكتروني بنجاح!'
        });
      } catch (error) {
        console.error('Email verification error:', error);
        setVerificationStatus({
          type: 'error',
          message: 'حدث خطأ أثناء التحقق من بريدك الإلكتروني. الرجاء المحاولة مرة أخرى.'
        });
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <Card
          title="التحقق من البريد الإلكتروني"
          subtitle="نتحقق من صحة بريدك الإلكتروني"
          className="mt-4"
        >
          <div className="space-y-6">
            <Alert
              type={verificationStatus.type}
              message={verificationStatus.message}
            />

            <div className="text-center space-y-4">
              {verificationStatus.type === 'success' && (
                <Link to="/login">
                  <Button fullWidth>
                    الذهاب إلى صفحة تسجيل الدخول
                  </Button>
                </Link>
              )}

              {verificationStatus.type === 'error' && (
                <Button
                  fullWidth
                  onClick={() => window.location.reload()}
                >
                  إعادة المحاولة
                </Button>
              )}

              <Link
                to="/support"
                className="block text-sm text-blue-600 hover:text-blue-800"
              >
                تحتاج إلى مساعدة؟ تواصل مع الدعم الفني
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EmailVerification;
