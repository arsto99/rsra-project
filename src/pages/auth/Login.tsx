import { Link } from 'react-router-dom'
import { Button, Input } from '@/components/ui'

export function Login() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          تسجيل الدخول
        </h2>
      </div>

      <form className="space-y-6">
        <Input
          label="البريد الإلكتروني"
          type="email"
          placeholder="أدخل بريدك الإلكتروني"
          required
        />

        <Input
          label="كلمة المرور"
          type="password"
          placeholder="أدخل كلمة المرور"
          required
        />

        <div className="flex items-center justify-between">
          <div className="text-sm">
            <Link
              to="/forgot-password"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              نسيت كلمة المرور؟
            </Link>
          </div>
        </div>

        <Button type="submit" fullWidth>
          تسجيل الدخول
        </Button>

        <div className="text-center">
          <Link
            to="/register"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            ليس لديك حساب؟ سجل الآن
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Login
