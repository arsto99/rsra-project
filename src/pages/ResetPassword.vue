<template>
  <div class="min-h-screen bg-gradient-to-br from-black to-blue-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <LanguageButton @update:language="updateLanguage" />
    <div class="max-w-4xl w-full flex bg-black rounded-lg shadow-2xl overflow-hidden">
      <!-- Left side - Form -->
      <div class="w-1/2 p-8">
        <h1 class="text-3xl text-white mb-4" data-i18n="resetPassword.newTitle">Set New Password</h1>
        <p class="text-gray-400 mb-8" data-i18n="resetPassword.newSubtitle">Choose a strong password for your account</p>
        
        <form @submit.prevent="handleSubmit" class="space-y-6" autocomplete="off">
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
              :placeholder="translations[currentLanguage].resetPassword.newPassword"
            />
          </div>

          <div>
            <input
              type="password"
              v-model="confirmPassword"
              class="input-primary"
              required
              autocomplete="new-password"
              autocorrect="off"
              autocapitalize="off"
              spellcheck="false"
              :placeholder="translations[currentLanguage].resetPassword.confirmPassword"
            />
          </div>
          
          <div>
            <button type="submit" class="btn-primary w-full" data-i18n="resetPassword.resetButton">
              Reset Password
            </button>
          </div>
        </form>
      </div>
      
      <!-- Right side -->
      <div class="w-1/2 bg-gradient-to-br from-blue-900 to-blue-400 p-8 flex flex-col justify-center items-center text-white">
        <h2 class="text-2xl mb-4" data-i18n="resetPassword.rightTitle">Almost Done!</h2>
        <p class="text-center" data-i18n="resetPassword.rightText">Create a strong password to secure your account</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import LanguageButton from '../components/LanguageButton.vue'
import ar from '../locales/ar'
import en from '../locales/en'

const route = useRoute()
const router = useRouter()
const password = ref('')
const confirmPassword = ref('')
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
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n')
    if (key && texts[key]) {
      el.textContent = texts[key]
    }
  })
}

const handleSubmit = async () => {
  if (password.value !== confirmPassword.value) {
    error.value = translations[currentLanguage.value].resetPassword.passwordMismatch
    return
  }

  try {
    const token = route.query.token
    await axios.post('/api/auth/reset-password', {
      token,
      password: password.value
    })
    router.push('/login')
  } catch (err) {
    error.value = err.response?.data?.message || translations[currentLanguage.value].common.error
  }
}
</script>

<style scoped>
input::placeholder {
  color: #4a5568;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus {
  -webkit-text-fill-color: white;
  -webkit-box-shadow: 0 0 0px 1000px black inset;
  transition: background-color 5000s ease-in-out 0s;
}
</style>
