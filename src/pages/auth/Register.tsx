import { Link } from 'react-router-dom'
import { Button, Input } from '@/components/ui'

export function Register() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          إنشاء حساب جديد
        </h2>
      </div>

      <form className="space-y-6">
        <Input
          label="الاسم الكامل"
          type="text"
          placeholder="أدخل اسمك الكامل"
          required
        />

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

        <Input
          label="تأكيد كلمة المرور"
          type="password"
          placeholder="أدخل كلمة المرور مرة أخرى"
          required
        />

        <Button type="submit" fullWidth>
          إنشاء حساب
        </Button>

        <div className="text-center">
          <Link
            to="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            لديك حساب بالفعل؟ سجل دخولك
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Register
