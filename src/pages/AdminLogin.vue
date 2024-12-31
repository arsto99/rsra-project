<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-900 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          تسجيل الدخول للمدير
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email" class="sr-only">البريد الإلكتروني</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              v-model="email"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="البريد الإلكتروني"
              dir="rtl"
            />
          </div>
          <div>
            <label for="password" class="sr-only">كلمة المرور</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              v-model="password"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="كلمة المرور"
              dir="rtl"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            تسجيل الدخول
          </button>
        </div>
      </form>

      <div v-if="error" class="mt-4 text-center text-sm text-red-600">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const email = ref('');
const password = ref('');
const error = ref('');

const handleSubmit = async () => {
  try {
    const response = await axios.post('http://localhost:3002/api/auth/admin-login', {
      email: email.value,
      password: password.value
    });

    const data = await response.data;

    if (!response.ok) {
      error.value = data.message || 'خطأ في تسجيل الدخول';
      return;
    }

    router.push('/admin-dashboard');
  } catch (err) {
    error.value = 'حدث خطأ أثناء تسجيل الدخول';
  }
};

// تحذير الأمان في وحدة التحكم
onMounted(() => {
  console.log('%c⚠️ تحذير أمني!', 'color: red; font-size: 24px; font-weight: bold;');
  console.log(
    '%cهذه الميزة موجهة للمطورين فقط. إذا طلب منك شخص ما نسخ ولصق أي شيء هنا لتمكين ميزة أو "اختراق" حساب، فهذه محاولة احتيالية وقد تؤدي إلى سرقة حسابك.',
    'color: red; font-size: 14px;'
  );
  console.log(
    '%cلمزيد من المعلومات حول الأمان، يرجى زيارة: https://www.facebook.com/selfxss',
    'color: blue; font-size: 14px;'
  );
});
</script>