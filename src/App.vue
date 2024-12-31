<template>
  <div id="app">
    <loading-spinner :loading="isLoading" />
    <router-view v-slot="{ Component }">
      <component :is="Component" @loading="setLoading" />
    </router-view>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import LoadingSpinner from './components/LoadingSpinner.vue';

const isLoading = ref(false);

const setLoading = (value) => {
  isLoading.value = value;
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

<style>
#app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}

/* إعادة تعيين CSS الافتراضي */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  margin: 0;
  direction: rtl;
}

/* متغيرات CSS العامة */
:root {
  --primary-color: #2a5298;
  --secondary-color: #1e3c72;
  --text-color: #333;
  --background-color: #f5f5f5;
  --error-color: #dc3545;
  --success-color: #28a745;
}

/* الأنماط العامة */
button {
  cursor: pointer;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

input {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

input:focus {
  outline: none;
  border-color: var(--primary-color);
}

/* تخطيط الشبكة الأساسي */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* الأنماط المتجاوبة */
@media (max-width: 768px) {
  .container {
    padding: 0 0.5rem;
  }
}
</style>
