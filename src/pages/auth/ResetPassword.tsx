import { Link } from 'react-router-dom'
import { Button, Input } from '@/components/ui'

export function ResetPassword() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          إعادة تعيين كلمة المرور
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          أدخل كلمة المرور الجديدة
        </p>
      </div>

      <form className="space-y-6">
        <Input
          label="كلمة المرور الجديدة"
          type="password"
          placeholder="أدخل كلمة المرور الجديدة"
          required
        />

        <Input
          label="تأكيد كلمة المرور"
          type="password"
          placeholder="أدخل كلمة المرور مرة أخرى"
          required
        />

        <Button type="submit" fullWidth>
          تغيير كلمة المرور
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

export default ResetPassword
