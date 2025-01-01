import { Link } from 'react-router-dom'
import { Button, Input } from '@/components/ui'

export function ForgotPassword() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          نسيت كلمة المرور
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          أدخل بريدك الإلكتروني وسنرسل لك رابطاً لإعادة تعيين كلمة المرور
        </p>
      </div>

      <form className="space-y-6">
        <Input
          label="البريد الإلكتروني"
          type="email"
          placeholder="أدخل بريدك الإلكتروني"
          required
        />

        <Button type="submit" fullWidth>
          إرسال رابط إعادة التعيين
        </Button>

        <div className="text-center">
          <Link
            to="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            العودة لتسجيل الدخول
          </Link>
        </div>
      </form>
    </div>
  )
}

export default ForgotPassword
