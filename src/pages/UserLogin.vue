<template>
  <div class="min-h-screen bg-gradient-to-br from-black to-blue-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <LanguageButton @update:language="updateLanguage" />
    <div class="max-w-4xl w-full flex bg-black rounded-lg shadow-2xl overflow-hidden">
      <!-- Left side - Login Form -->
      <div class="w-1/2 p-8">
        <h1 class="text-3xl text-white mb-8" data-lang data-ar="تسجيل الدخول" data-en="Sign in">Sign in</h1>
        
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
            <input
              type="password"
              v-model="password"
              class="input-primary"
              required
              autocomplete="new-password"
              autocorrect="off"
              autocapitalize="off"
              spellcheck="false"
              :placeholder="currentLanguage === 'ar' ? 'كلمة المرور' : 'Password'"
            />
          </div>
          
          <div>
            <button type="submit" class="btn-primary w-full" data-lang data-ar="دخول" data-en="SIGN IN">
              SIGN IN
            </button>
          </div>
          
          <div class="flex justify-center space-x-4 mt-6">
            <button
              @click="handleGoogleLogin"
              type="button"
              class="p-2 rounded-full hover:bg-gray-800 transition-all duration-300"
            >
              <svg class="w-8 h-8" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z"
                />
                <path
                  fill="#34A853"
                  d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z"
                />
                <path
                  fill="#4A90E2"
                  d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z"
                />
              </svg>
            </button>
            
            <button
              @click="handleFacebookLogin"
              type="button"
              class="p-2 rounded-full hover:bg-gray-800 transition-all duration-300"
            >
              <svg class="w-8 h-8" viewBox="0 0 24 24">
                <path
                  fill="#1877F2"
                  d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                />
              </svg>
            </button>
          </div>
          
          <div class="flex justify-between text-sm text-gray-400 mt-6">
            <router-link to="/register" class="hover:text-blue-400 transition-all duration-300" data-lang data-ar="إنشاء حساب جديد" data-en="Create new account">
              Create new account
            </router-link>
            <router-link to="/forgot-password" class="hover:text-blue-400 transition-all duration-300" data-lang data-ar="نسيت كلمة المرور؟" data-en="Forgot password?">
              Forgot password?
            </router-link>
          </div>
        </form>
      </div>
      
      <!-- Right side - Welcome Section -->
      <div class="w-1/2 bg-gradient-to-br from-blue-900 to-blue-400 p-8 flex flex-col justify-center items-center text-white">
        <h2 class="text-2xl mb-4">Welcome to RSAR</h2>
        <div class="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
          RSAR
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import LanguageButton from '../components/LanguageButton.vue'
import ar from '../locales/ar'
import en from '../locales/en'

const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref('')
const currentLanguage = ref(localStorage.getItem('language') || 'ar')

const translations = {
  ar,
  en
}

onMounted(() => {
  updateLanguage(currentLanguage.value)
})

const updateLanguage = (lang) => {
  currentLanguage.value = lang
  const texts = translations[lang]
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
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
      email: email.value,
      password: password.value
    })
    
    localStorage.setItem('token', response.data.token)
    router.push('/')
  } catch (err) {
    error.value = err.response?.data?.message || translations[currentLanguage.value].common.error
  }
}

const handleGoogleLogin = () => {
  window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`
}

const handleFacebookLogin = () => {
  window.location.href = `${import.meta.env.VITE_API_URL}/auth/facebook`
}
</script>

<style scoped>
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px black inset !important;
  -webkit-text-fill-color: white !important;
  transition: background-color 5000s ease-in-out 0s;
}
</style>
