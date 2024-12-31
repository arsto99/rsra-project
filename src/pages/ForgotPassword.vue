<template>
  <div class="min-h-screen bg-gradient-to-br from-black to-blue-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <LanguageButton @update:language="updateLanguage" />
    <div class="max-w-4xl w-full flex bg-black rounded-lg shadow-2xl overflow-hidden">
      <!-- Left side - Form -->
      <div class="w-1/2 p-8">
        <h1 class="text-3xl text-white mb-4" data-lang data-ar="نسيت كلمة المرور؟" data-en="Forgot Password?">Forgot Password?</h1>
        <p class="text-gray-400 mb-8" data-lang data-ar="أدخل بريدك الإلكتروني وسنرسل لك رابط إعادة تعيين كلمة المرور" data-en="Enter your email and we'll send you a reset link">
          Enter your email and we'll send you a reset link
        </p>
        
        <form @submit.prevent="handleSubmit" class="space-y-6" autocomplete="off">
          <div>
            <input
              type="email"
              v-model="email"
              class="input-primary"
              required
              autocomplete="new-email"
              autocorrect="off"
              autocapitalize="off"
              spellcheck="false"
              :placeholder="currentLanguage === 'ar' ? 'البريد الإلكتروني' : 'Email'"
            />
          </div>
          
          <div>
            <button type="submit" class="btn-primary w-full" data-lang data-ar="إرسال رابط إعادة التعيين" data-en="Send Reset Link">
              Send Reset Link
            </button>
          </div>
          
          <div class="flex justify-between text-sm text-gray-400">
            <router-link to="/login" class="hover:text-blue-400 transition-all duration-300" data-lang data-ar="العودة لتسجيل الدخول" data-en="Back to Login">
              Back to Login
            </router-link>
          </div>
        </form>
      </div>
      
      <!-- Right side -->
      <div class="w-1/2 bg-gradient-to-br from-blue-900 to-blue-400 p-8 flex flex-col justify-center items-center text-white">
        <div class="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
          RSAR
        </div>
        <h2 class="text-2xl mb-4 mt-6" data-lang data-ar="استعادة حسابك" data-en="Recover Your Account">Recover Your Account</h2>
        <p class="text-center" data-lang data-ar="سنساعدك في استعادة حسابك بأمان" data-en="We'll help you recover your account securely">
          We'll help you recover your account securely
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import LanguageButton from '../components/LanguageButton.vue'

const router = useRouter()
const email = ref('')
const error = ref('')
const currentLanguage = ref(localStorage.getItem('language') || 'ar')

const updateLanguage = (lang) => {
  currentLanguage.value = lang
  document.querySelectorAll('[data-lang]').forEach(el => {
    const arText = el.getAttribute('data-ar')
    const enText = el.getAttribute('data-en')
    if (lang === 'ar' && arText) {
      el.textContent = arText
    } else if (lang === 'en' && enText) {
      el.textContent = enText
    }
  })
}

const handleSubmit = async () => {
  try {
    await axios.post('/api/auth/forgot-password', { email: email.value })
    router.push('/login')
  } catch (err) {
    error.value = err.response?.data?.message || 'An error occurred'
  }
}
</script>
